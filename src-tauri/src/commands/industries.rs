use backend_data_apply_tracking::industries::{get_all_industries, get_industry_by_id};
use backend_data_apply_tracking::DbPool;
use serde::Serialize;

#[derive(Serialize)]
pub struct IndustryResponse {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
}

#[tauri::command]
pub async fn fetch_industries(pool: tauri::State<'_, DbPool>) -> Result<Vec<IndustryResponse>, String> {
    get_all_industries(&*pool)
        .await
        .map(|industries| industries.into_iter().map(|i| IndustryResponse {
            id: i.id,
            name: i.name,
            description: i.description,
        }).collect())
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn fetch_industry(pool: tauri::State<'_, DbPool>, id: String) -> Result<Option<IndustryResponse>, String> {
    get_industry_by_id(&*pool, &id)
        .await
        .map(|opt| opt.map(|i| IndustryResponse {
            id: i.id,
            name: i.name,
            description: i.description,
        }))
        .map_err(|e| e.to_string())
}
