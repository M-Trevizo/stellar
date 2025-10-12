use std::sync::Mutex;
use tauri::Manager;

mod commands;

// App State
#[derive(Default)]
pub struct AppState {
    file_path: Option<std::path::PathBuf>,
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
        .invoke_handler(tauri::generate_handler![
            commands::get_file_name,
            commands::save, 
            commands::save_as, 
            commands::open,
            commands::new_file
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
