use std::sync::Mutex;
use tauri::Manager;

mod commands;

// File path state
#[derive(Default)]
pub struct AppState {
    file_path: std::path::PathBuf,
    file_name: String
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            app.manage(Mutex::new(AppState::default()));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![commands::save_as, commands::open])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
