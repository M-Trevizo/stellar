// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs::File;
use std::io::Read;
use std::io::Write;
use std::io::BufWriter;
use std::io::BufReader;
use rfd::FileDialog;

// TODO: Create custom errors to handle the IO Errors

#[tauri::command]
pub fn save_as(content: String) {
    // Open File Explorer and get PathBuf
    let path_buf = FileDialog::new().save_file();
    // Check that path_buf is some value otherwise return
    if path_buf.is_none() { return };
    
    // Unwrap Option and create a new file
    // Then write to file and handle errors
    let mut path = path_buf.unwrap();
    path.set_extension("txt");
    match File::create_new(path) {
        Ok(file) => { 
            let mut buf_writer = BufWriter::new(file);
            buf_writer.write(content.as_bytes()).unwrap();
        }
        Err(error) => println!("Error: {}", error),
    };
}

// #[tauri::command]
// pub fn save(content: String) {

// }

#[tauri::command]
pub fn open() -> Result<String, String> {
    // Open File Explorer and get file path
    let path_buf = FileDialog::new()
        .add_filter("text", &["txt"])
        .set_directory("/")
        .pick_file()
        .ok_or("File not found")?;

    // Open file and create buffered reader
    let file = File::open(path_buf).map_err(|err| err.to_string())?;
    let mut buf_reader = BufReader::new(file);
    // Create new string and read into it
    let mut content = String::new();
    buf_reader.read_to_string(&mut content).map_err(|err| err.to_string())?;
    // Return content string
    Ok(content)
}