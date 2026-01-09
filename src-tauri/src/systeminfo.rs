use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct SystemInfo {
  screen_width: u32,
  screen_height: u32,
  scale_factor: f64,
  architecture: String,
  platform: String,
}

#[tauri::command]
pub async fn get_system_info(window: tauri::Window) -> Result<SystemInfo, String> {
  let monitor = window
    .current_monitor()
    .map_err(|e| e.to_string())?
    .ok_or("No monitor detected")?;

  let size = monitor.size();
  let scale = monitor.scale_factor();

  Ok(SystemInfo {
    screen_width: size.width,
    screen_height: size.height,
    scale_factor: scale,
    architecture: std::env::consts::ARCH.to_string(),
    platform: std::env::consts::OS.to_string(),
  })
}
