use sqlx::{FromRow, SqlitePool};
use uuid::Uuid;

use crate::app_types::PaginatedResult;
#[derive(Debug, FromRow)]
pub struct Company {
  pub id: String,
  pub name: String,
  pub website: Option<String>,
  // Structured postal address
  pub address_line1: Option<String>,
  pub address_line2: Option<String>,
  pub postal_code: Option<String>,
  pub city: Option<String>,
  pub state_province: Option<String>,
  pub country: Option<String>,
  // company_size stored as text in DB: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
  pub company_size: Option<String>,
  pub glassdoor_url: Option<String>,
  pub linkedin_url: Option<String>,
  pub twitter_url: Option<String>,
  pub siret: Option<String>,
  pub notes: Option<String>,
  pub is_default: bool,
  pub created_at: String,
  pub updated_at: String,
  pub deleted_at: Option<String>,
}

#[derive(Debug)]
pub struct NewCompanyRow {
  pub name: String,
  pub website: Option<String>,
  // Structured postal address
  pub address_line1: Option<String>,
  pub address_line2: Option<String>,
  pub postal_code: Option<String>,
  pub city: Option<String>,
  pub state_province: Option<String>,
  pub country: Option<String>,
  // company_size stored as text in DB: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
  pub company_size: Option<String>,
  pub glassdoor_url: Option<String>,
  pub linkedin_url: Option<String>,
  pub twitter_url: Option<String>,
  pub siret: Option<String>,
  pub notes: Option<String>,
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

pub async fn delete_company(pool: &SqlitePool, id: &str) -> Result<bool, sqlx::Error> {
  let result = sqlx::query(
    "UPDATE companies SET deleted_at = datetime('now') WHERE id = ? AND deleted_at IS NULL"
  )
    .bind(id)
    .execute(pool)
    .await?;

  Ok(result.rows_affected() > 0)
}

pub async fn add_company(pool: &SqlitePool, new: NewCompanyRow) -> Result<Company, sqlx::Error> {
  let id = Uuid::new_v4().to_string();

  let inserted: Company = sqlx::query_as::<_, Company>(
    "INSERT INTO companies (
      id, name, website, address_line1, address_line2, postal_code, city, state_province, country,
      company_size, glassdoor_url, linkedin_url, twitter_url, siret, notes, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')) RETURNING *"
  )
    .bind(id)
    .bind(new.name)
    .bind(new.website)
    .bind(new.address_line1)
    .bind(new.address_line2)
    .bind(new.postal_code)
    .bind(new.city)
    .bind(new.state_province)
    .bind(new.country)
    .bind(new.company_size)
    .bind(new.glassdoor_url)
    .bind(new.linkedin_url)
    .bind(new.twitter_url)
    .bind(new.siret)
    .bind(new.notes)
    .fetch_one(pool)
    .await?;

  Ok(inserted)
}

pub async fn up_company(pool: &SqlitePool, id: &str, updated: NewCompanyRow) -> Result<Company, sqlx::Error> {
  let updated_company: Company = sqlx::query_as::<_, Company>(
    "UPDATE companies SET
      name = ?, website = ?, address_line1 = ?, address_line2 = ?, postal_code = ?, city = ?, state_province = ?, country = ?,
      company_size = ?, glassdoor_url = ?, linkedin_url = ?, twitter_url = ?, siret = ?, notes = ?, updated_at = datetime('now')
     WHERE id = ? AND deleted_at IS NULL RETURNING *"
  )
    .bind(updated.name)
    .bind(updated.website)
    .bind(updated.address_line1)
    .bind(updated.address_line2)
    .bind(updated.postal_code)
    .bind(updated.city)
    .bind(updated.state_province)
    .bind(updated.country)
    .bind(updated.company_size)
    .bind(updated.glassdoor_url)
    .bind(updated.linkedin_url)
    .bind(updated.twitter_url)
    .bind(updated.siret)
    .bind(updated.notes)
    .bind(id)
    .fetch_one(pool)
    .await?;

  Ok(updated_company)
}