use sqlx::{FromRow, SqlitePool};

use crate::app_types::PaginatedResult;
#[derive(Debug, FromRow)]
pub struct Company {
  pub id: String,
  pub name: String,
  pub website: Option<String>,
  pub location: Option<String>,
  pub notes: Option<String>,
  pub is_default: bool,
  pub created_at: String,
  pub updated_at: String,
}

pub async fn get_all_companies(pool: &SqlitePool) -> Result<Vec<Company>, sqlx::Error> {
  sqlx::query_as::<_, Company>("SELECT * FROM companies WHERE deleted_at IS NULL")
    .fetch_all(pool)
    .await
}

pub async fn get_companies_paginated(
    pool: &SqlitePool,
    page: i64,
    per_page: i64,
) -> Result<PaginatedResult<Company>, sqlx::Error> {
    // Get total count
    let count: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM companies WHERE deleted_at IS NULL")
        .fetch_one(pool)
        .await?;

    let count = count.0;
    let offset = (page - 1) * per_page;

    // Fetch paginated data
    let data = sqlx::query_as::<_, Company>(
        "SELECT * FROM companies WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT ? OFFSET ?"
    )
        .bind(per_page)
        .bind(offset)
        .fetch_all(pool)
        .await?;

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

pub async fn get_company_by_id(pool: &SqlitePool, id: &str) -> Result<Option<Company>, sqlx::Error> {
  sqlx::query_as::<_, Company>("SELECT * FROM companies WHERE id = ?")
    .bind(id)
    .fetch_optional(pool)
    .await
}