use sqlx::{FromRow, SqlitePool};
#[derive(Debug, FromRow)]
pub struct Company {
  pub id: String,
  pub name: String,
  pub website: Option<String>,
  pub location: Option<String>,
  pub industry_id: Option<String>,
  pub notes: Option<String>,
  pub is_default: bool,
  pub created_at: String,
  pub updated_at: String,
}

pub async fn get_all_companies(pool: &SqlitePool) -> Result<Vec<Company>, sqlx::Error> {
  sqlx::query_as::<_, Company>("SELECT * FROM companies")
    .fetch_all(pool)
    .await
}

pub async fn get_company_by_id(pool: &SqlitePool, id: &str) -> Result<Option<Company>, sqlx::Error> {
  sqlx::query_as::<_, Company>("SELECT * FROM companies WHERE id = ?")
    .bind(id)
    .fetch_optional(pool)
    .await
}