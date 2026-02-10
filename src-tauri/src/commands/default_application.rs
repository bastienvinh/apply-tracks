use std::process::Command;

fn open_browser(url: &str) -> std::io::Result<()> {
  // TODO: improve this code
  #[cfg(target_os = "linux")]
  Command::new("xdg-open").arg(url).spawn()?;

  #[cfg(target_os = "macos")]
  Command::new("open").arg(url).spawn()?;

  #[cfg(target_os = "windows")]
  Command::new("cmd").args(["/C", "start", url]).spawn()?;

  Ok(())
}

#[tauri::command]
pub async fn open_website(url: String) -> Result<(), String> {
  if url.is_empty() {
    return Err("URL is empty".to_string());
  }

  open_browser(&url).map_err(|e| format!("Failed to open URL: {}", e))?;

  Ok(())
}