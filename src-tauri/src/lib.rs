mod db;
mod systeminfo;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            tauri::async_runtime::block_on(async move {
                let _pool = db::init_pool_and_migrate(&handle).await?;
                // If you want to use the pool later, store it in managed state:
                // handle.manage(_pool);
                Ok::<(), Box<dyn std::error::Error>>(())
            })?;
            Ok(())
        })
        .setup(|_app| {
            // Code to manipulate the main window size
						
						// let window = app.get_webview_window("main").unwrap();
						// let _ = window.set_title("Application Apply Tracking");

            // Get primary monitor
            // if let Some(monitor) = window.primary_monitor()? {
            //     let size = monitor.size();
            //     let scale = monitor.scale_factor();

            //     // Calculate 90% of screen size
            //     let width = (size.width as f64 / scale * 0.9) as u32;
            //     let height = (size.height as f64 / scale * 0.9) as u32;

            //     // Set window size
            //     let _ =
            //         window.set_size(tauri::Size::Physical(tauri::PhysicalSize { width, height }));

            //     // Center the window
            //     let _ = window.center();
            // }

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        // .invoke_handler(tauri::generate_handler![greet])
				.invoke_handler(tauri::generate_handler![systeminfo::get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
