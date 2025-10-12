// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs::File;
use std::io::Read;
use std::io::Write;
use std::io::BufWriter;
use std::io::BufReader;
use std::sync::Mutex;
use rfd::FileDialog;
use thiserror::Error;
use crate::AppState;

// TODO: Create custom errors to handle the IO Errors
#[derive(Debug, Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error("File not found")]
    NotFound,
    #[error("Could not save file")]
    SaveFail,
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

fn set_state(state: tauri::State<Mutex<AppState>>, path: &std::path::PathBuf) {
    let mut state = state.lock().unwrap();
    state.file_path = Some(path.to_owned());
    state.file_name = path
        .file_name()
        .and_then(|os_str| os_str.to_str())
        .unwrap_or_else(|| "")
        .to_owned();
}

#[tauri::command]
pub fn get_file_name(state: tauri::State<Mutex<AppState>>) -> String {
    let state = state.lock().unwrap();
    state.file_name.to_owned()
}

#[tauri::command]
pub fn save_as(state: tauri::State<Mutex<AppState>>, content: String) -> Result<(), Error> {
    // Open File Explorer and get PathBuf
    let mut path_buf = FileDialog::new()
        .save_file()
        .ok_or(Error::SaveFail)?;
    path_buf.set_extension("txt");
    // Create new file and write to it
    let file = File::create_new(&path_buf)?;
    let mut buf_writer = BufWriter::new(file);
    buf_writer.write(content.as_bytes())?;
    // Add file path and name to app State
    set_state(state, &path_buf);
    Ok(())
}

#[tauri::command]
pub fn save(state: tauri::State<Mutex<AppState>>, content: String) -> Result<(), Error> {
    let state = state.lock().unwrap();
    let path_buf = state.file_path.to_owned().ok_or(Error::NotFound)?;
    let file = File::create(path_buf)?;
    let mut buf_writer = BufWriter::new(file);
    buf_writer.write(content.as_bytes())?;
    Ok(())
}

#[tauri::command]
pub fn open(state: tauri::State<'_, Mutex<AppState>>) -> Result<String, Error> {
    // Open File Explorer and get file path
    let path_buf = FileDialog::new()
        .add_filter("text", &["txt"])
        .set_directory("/")
        .pick_file()
        .ok_or(Error::NotFound)?;
    // Set the states file_path and file_name fields
    set_state(state, &path_buf);
    // Open file and create buffered reader
    let file = File::open(path_buf)?;
    let mut buf_reader = BufReader::new(file);
    // Create new string and read into it
    let mut content = String::new();
    buf_reader.read_to_string(&mut content)?;
    // Return content string
    Ok(content)
}

#[tauri::command]
pub fn new_file(state: tauri::State<Mutex<AppState>>) {
    // Clear the state
    let mut state = state.lock().unwrap();
    state.file_name = String::default();
    state.file_path = Some(std::path::PathBuf::default());
}