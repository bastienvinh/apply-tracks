use sqlx::sqlite::{SqliteConnectOptions, SqliteJournalMode, SqliteSynchronous};
use sqlx::SqlitePool;
use tauri::Manager;
use std::{error::Error, fs, path::PathBuf};
// use tauri::path::BaseDirectory;

fn resolve_db_path(app: &tauri::AppHandle) -> Result<PathBuf, Box<dyn Error>> {
  // Tauri v2 API
  // let db_path = app
  //   .path()
  //   .resolve("apply-track.sqlite3", BaseDirectory::AppData)?;

  let db_path = app
    .path()
    .document_dir()?
    .join("ApplyTrack")
    .join("apply-track.sqlite3");

  if let Some(parent) = db_path.parent() {
    fs::create_dir_all(parent)?;
  }

  Ok(db_path)
}

pub async fn init_pool_and_migrate(app: &tauri::AppHandle) -> Result<SqlitePool, Box<dyn Error>> {
  let db_path = resolve_db_path(app)?;

  println!("{:?}", db_path);

  let options = SqliteConnectOptions::new()
    .filename(&db_path)
    .create_if_missing(true)
    .journal_mode(SqliteJournalMode::Wal)
    .synchronous(SqliteSynchronous::Normal)
    .pragma("foreign_keys", "ON");

  let pool = SqlitePool::connect_with(options).await?;

  sqlx::migrate!("./migrations").run(&pool).await?;

  Ok(pool)
}