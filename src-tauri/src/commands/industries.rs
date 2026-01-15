use backend_data_apply_tracking::industries::{get_all_industries, get_industry_by_id};
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
