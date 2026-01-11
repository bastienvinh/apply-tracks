use sqlx::sqlite::{SqliteConnectOptions, SqliteJournalMode, SqliteSynchronous};
use sqlx::SqlitePool;
use std::{error::Error, path::PathBuf};


pub async fn init_pool_and_migrate(path: String) -> Result<SqlitePool, Box<dyn Error>> {
  let db_path = PathBuf::from(path);

  println!("{:?}", db_path);

  let options = SqliteConnectOptions::new()
    .filename(&db_path)
    .create_if_missing(true)
    .journal_mode(SqliteJournalMode::Wal)
    .synchronous(SqliteSynchronous::Normal)
    .pragma("foreign_keys", "ON");

  let pool = SqlitePool::connect_with(options).await?;

  sqlx::migrate!("./src/migrations").run(&pool).await?;

  Ok(pool)
}