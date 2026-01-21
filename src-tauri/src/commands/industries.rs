use backend_data_apply_tracking::industries::{create_industry, delete_industry, get_all_industries, get_industries_paginated, get_industry_by_id};
use backend_data_apply_tracking::DbPool;
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct IndustryResponse {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct IndustriesResult {
    pub data: Vec<IndustryResponse>,
    pub is_empty: bool,
    pub count: usize,
}

#[derive(Debug, Serialize)]
pub struct PaginatedIndustriesResult {
    pub data: Vec<IndustryResponse>,
    pub count: i64,
    pub current_page: i64,
    pub per_page: i64,
    pub total_pages: i64,
    pub has_next: bool,
    pub has_previous: bool,
}

#[derive(Debug, Serialize)]
#[serde(tag = "type", content = "data")]
#[allow(dead_code)]
pub enum IndustryError {
    NotFound { id: String },
    DatabaseError { message: String },
    EmptyTable,
}

impl std::fmt::Display for IndustryError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            IndustryError::NotFound { id } => write!(f, "Industry with id '{}' not found", id),
            IndustryError::DatabaseError { message } => write!(f, "Database error: {}", message),
            IndustryError::EmptyTable => write!(f, "No industries found in the database"),
        }
    }
}

#[tauri::command]
pub async fn fetch_industries(pool: tauri::State<'_, DbPool>) -> Result<IndustriesResult, IndustryError> {
    match get_all_industries(&*pool).await {
        Ok(industries) => {
            let is_empty = industries.is_empty();
            let count = industries.len();
            let data: Vec<IndustryResponse> = industries
                .into_iter()
                .map(|i| IndustryResponse {
                    id: i.id,
                    name: i.name,
                    description: i.description,
                })
                .collect();
            
            Ok(IndustriesResult { data, is_empty, count })
        }
        Err(e) => Err(IndustryError::DatabaseError { message: e.to_string() }),
    }
}

#[tauri::command]
pub async fn fetch_industry(pool: tauri::State<'_, DbPool>, id: String) -> Result<IndustryResponse, IndustryError> {
    match get_industry_by_id(&*pool, &id).await {
        Ok(Some(industry)) => Ok(IndustryResponse {
            id: industry.id,
            name: industry.name,
            description: industry.description,
        }),
        Ok(None) => Err(IndustryError::NotFound { id }),
        Err(e) => Err(IndustryError::DatabaseError { message: e.to_string() }),
    }
}

#[tauri::command]
pub async fn fetch_industries_paginated(
    pool: tauri::State<'_, DbPool>,
    page: i64,
    per_page: i64,
) -> Result<PaginatedIndustriesResult, IndustryError> {
    match get_industries_paginated(&*pool, page, per_page).await {
        Ok(result) => {
            let data: Vec<IndustryResponse> = result.data
                .into_iter()
                .map(|i| IndustryResponse {
                    id: i.id,
                    name: i.name,
                    description: i.description,
                })
                .collect();

            Ok(PaginatedIndustriesResult {
                data,
                count: result.count,
                current_page: result.current_page,
                per_page: result.per_page,
                total_pages: result.total_pages,
                has_next: result.has_next,
                has_previous: result.has_previous,
            })
        }
        Err(e) => Err(IndustryError::DatabaseError { message: e.to_string() }),
    }
}

#[tauri::command]
pub async fn remove_industry(
    pool: tauri::State<'_, DbPool>,
    id: String,
) -> Result<bool, IndustryError> {
    match delete_industry(&*pool, &id).await {
        Ok(true) => Ok(true),
        Ok(false) => Err(IndustryError::NotFound { id }),
        Err(e) => Err(IndustryError::DatabaseError { message: e.to_string() }),
    }
}

#[tauri::command]
pub async fn add_industry(
    pool: tauri::State<'_, DbPool>,
    name: String,
    description: Option<String>,
) -> Result<IndustryResponse, IndustryError> {
    // Implementation for adding an industry goes here
    // This is a placeholder and should be replaced with actual logic
    match create_industry(&*pool, None, name.as_str(), description.as_deref()).await {
        Ok(industry) => Ok(IndustryResponse {
            id: industry.id,
            name: industry.name,
            description: industry.description,
        }),
        Err(e) => Err(IndustryError::DatabaseError { message: e.to_string() }),
        
    }
}
