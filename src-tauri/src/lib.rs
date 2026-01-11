mod db;
mod seed;
mod systeminfo;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            tauri::async_runtime::block_on(async move {
                let pool = db::init_pool_and_migrate(&handle).await?;
                
                // Seed the database if it's empty
                seed::seed_database(&pool).await?;
                
                // If you want to use the pool later, store it in managed state:
                // handle.manage(pool);
                Ok::<(), Box<dyn std::error::Error>>(())
            })?;
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![systeminfo::get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
