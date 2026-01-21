use sqlx::{FromRow, SqlitePool};

#[derive(Debug, FromRow)]
pub struct Industry {
  pub id: String,
  pub name: String,
  pub description: Option<String>,
  pub is_default: bool,
  pub created_at: String,
  pub updated_at: String,
  pub deleted_at: Option<String>,
}

#[derive(Debug)]
pub struct PaginatedResult<T> {
  pub data: Vec<T>,
  pub count: i64,
  pub current_page: i64,
  pub per_page: i64,
  pub total_pages: i64,
  pub has_next: bool,
  pub has_previous: bool,
}

pub async fn get_all_industries(pool: &SqlitePool) -> Result<Vec<Industry>, sqlx::Error> {
  sqlx::query_as::<_, Industry>("SELECT * FROM industries WHERE deleted_at IS NULL")
    .fetch_all(pool)
    .await
}

pub async fn get_industries_paginated(
  pool: &SqlitePool,
  page: i64,
  per_page: i64,
) -> Result<PaginatedResult<Industry>, sqlx::Error> {
  // Get total count
  let count: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM industries WHERE deleted_at IS NULL")
    .fetch_one(pool)
    .await?;

  let count = count.0;

  // Calculate offset
  let offset = (page - 1) * per_page;

  // Fetch paginated data
  let data = sqlx::query_as::<_, Industry>(
    "SELECT * FROM industries WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT ? OFFSET ?"
  )
    .bind(per_page)
    .bind(offset)
    .fetch_all(pool)
    .await?;

  // Calculate pagination metadata
  let total_pages = (count as f64 / per_page as f64).ceil() as i64;
  let has_next = page < total_pages;
  let has_previous = page > 1;

  Ok(PaginatedResult {
    data,
    count,
    current_page: page,
    per_page,
    total_pages,
    has_next,
    has_previous,
  })
}

pub async fn get_industry_by_id(pool: &SqlitePool, id: &str) -> Result<Option<Industry>, sqlx::Error> {
  sqlx::query_as::<_, Industry>("SELECT * FROM industries WHERE id = ?")
    .bind(id)
    .fetch_optional(pool)
    .await
}

pub async fn delete_industry(pool: &SqlitePool, id: &str) -> Result<bool, sqlx::Error> {
  let result = sqlx::query(
    "UPDATE industries SET deleted_at = datetime('now') WHERE id = ? AND deleted_at IS NULL"
  )
    .bind(id)
    .execute(pool)
    .await?;

  Ok(result.rows_affected() > 0)
}