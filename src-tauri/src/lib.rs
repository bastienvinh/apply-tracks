use std::{error::Error, fs, path::PathBuf};
use tauri::Manager;
mod systeminfo;
use backend_data_apply_tracking::{db::init_pool_and_migrate, seed};
mod commands;

fn resolve_db_path(app: &tauri::AppHandle) -> Result<PathBuf, Box<dyn Error>> {
  // Tauri v2 API
  // let db_path = app
  //   .path()
  //   .resolve("apply-track.sqlite3", BaseDirectory::AppData)?;

  let db_path = app
    .path()
    .app_data_dir()?
    .join("apply-track.sqlite3");

  if let Some(parent) = db_path.parent() {
    fs::create_dir_all(parent)?;
  }

  Ok(db_path)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            // let handle = app.handle();
            tauri::async_runtime::block_on(async move {
                let app_handle = app.handle();
                let db_path = resolve_db_path(&app_handle)?;
                println!("Database path: {:?}", db_path);
                let pool = init_pool_and_migrate(db_path.to_string_lossy().to_string()).await?;
                
                // Seed the database if it's empty
                seed::seed_database(&pool).await?;
                
                // If you want to use the pool later, store it in managed state:
                // handle.manage(pool);
                app.manage(pool);
                Ok::<(), Box<dyn std::error::Error>>(())
            })?;
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            systeminfo::get_system_info,
            commands::companies::fetch_companies,
            commands::companies::fetch_company,
            commands::industries::fetch_industries,
            commands::industries::fetch_industry,
            commands::industries::fetch_industries_paginated,
            commands::industries::remove_industry,
            commands::industries::add_industry
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
