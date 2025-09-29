// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs::File;
use std::io::Write;
use std::io::BufWriter;
use rfd::FileDialog;

#[tauri::command]
fn save_as(content: String) {
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![save_as])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
