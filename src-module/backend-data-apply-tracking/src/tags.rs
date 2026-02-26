use sqlx::{FromRow, SqlitePool};
use uuid::Uuid;
use crate::app_types::PaginatedResult;

#[derive(Debug, FromRow)]
pub struct Tag {
  pub id: String,
  pub name: String,
  pub description: Option<String>,
  pub created_at: String,
  pub updated_at: String,
  pub deleted_at: Option<String>,
}

pub async fn get_all_tags(pool: &SqlitePool) -> Result<Vec<Tag>, sqlx::Error> {
  sqlx::query_as::<_, Tag>("SELECT * FROM tags WHERE deleted_at IS NULL")
    .fetch_all(pool)
    .await
}

pub async fn get_tags_paginated(
  pool: &SqlitePool,
  page: i64,
  per_page: i64,
) -> Result<PaginatedResult<Tag>, sqlx::Error> {
  // Get total count
  let count: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM tags WHERE deleted_at IS NULL")
    .fetch_one(pool)
    .await?;

  let count = count.0;

  // Calculate offset
  let offset = (page - 1) * per_page;

  // Fetch paginated data
  let data = sqlx::query_as::<_, Tag>(
    "SELECT * FROM tags WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT ? OFFSET ?"
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

pub async fn get_tag_by_id(pool: &SqlitePool, id: &str) -> Result<Option<Tag>, sqlx::Error> {
  sqlx::query_as::<_, Tag>("SELECT * FROM tags WHERE id = ?")
    .bind(id)
    .fetch_optional(pool)
    .await
}

pub async fn delete_tag(pool: &SqlitePool, id: &str) -> Result<bool, sqlx::Error> {
  let result = sqlx::query(
    "UPDATE tags SET deleted_at = datetime('now') WHERE id = ? AND deleted_at IS NULL"
  )
    .bind(id)
    .execute(pool)
    .await?;

  Ok(result.rows_affected() > 0)
}

pub async fn create_tag(
  pool: &SqlitePool,
  id: Option<&str>,
  name: &str,
  description: Option<&str>,
) -> Result<Tag, sqlx::Error> {
  let tag_id = match id {
    Some(val) => val.to_string(),
    None => Uuid::new_v4().to_string(),
  };

  sqlx::query(
    "INSERT INTO tags (id, name, description, created_at, updated_at) 
     VALUES (?, ?, ?, datetime('now'), datetime('now'))"
  )
    .bind(&tag_id)
    .bind(name)
    .bind(description)
    .execute(pool)
    .await?;

  // Fetch and return the created tag
  get_tag_by_id(pool, &tag_id)
    .await?
    .ok_or_else(|| sqlx::Error::RowNotFound)
}

pub async fn update_tag(
  pool: &SqlitePool,
  id: &str,
  name: &str,
  description: Option<&str>,
) -> Result<Option<Tag>, sqlx::Error> {
  let result = sqlx::query(
    "UPDATE tags 
     SET name = ?, description = ?, updated_at = datetime('now') 
     WHERE id = ? AND deleted_at IS NULL"
  )
    .bind(name)
    .bind(description)
    .bind(id)
    .execute(pool)
    .await?;

  if result.rows_affected() > 0 {
    get_tag_by_id(pool, id).await
  } else {
    Ok(None)
  }
}