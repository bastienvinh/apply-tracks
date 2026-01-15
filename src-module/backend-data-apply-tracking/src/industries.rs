use sqlx::{FromRow, SqlitePool}; 

#[derive(Debug, FromRow)]
pub struct Industry {
  pub id: String,
  pub name: String,
  pub description: Option<String>,
  pub is_default: bool,
  pub created_at: String,
  pub updated_at: String,
}

pub async fn get_all_industries(pool: &SqlitePool) -> Result<Vec<Industry>, sqlx::Error> {
  sqlx::query_as::<_, Industry>("SELECT * FROM industries")
    .fetch_all(pool)
    .await
}

pub async fn get_industry_by_id(pool: &SqlitePool, id: &str) -> Result<Option<Industry>, sqlx::Error> {
  sqlx::query_as::<_, Industry>("SELECT * FROM industries WHERE id = ?")
    .bind(id)
    .fetch_optional(pool)
    .await
}