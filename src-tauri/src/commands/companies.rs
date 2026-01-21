use backend_data_apply_tracking::companies::{get_all_companies, get_company_by_id };
use backend_data_apply_tracking::DbPool;
use serde::Serialize;

#[derive(Serialize)]
pub struct CompanyResponse {
    pub id: String,
    pub name: String,
    pub website: Option<String>,
    pub location: Option<String>,
    pub industry_id: Option<String>,
    pub notes: Option<String>,
}

#[tauri::command]
pub async fn fetch_companies(pool: tauri::State<'_, DbPool>) -> Result<Vec<CompanyResponse>, String> {
    get_all_companies(&*pool)
        .await
        .map(|companies| companies.into_iter().map(|c| CompanyResponse {
            id: c.id,
            name: c.name,
            website: c.website,
            location: c.location,
            industry_id: c.industry_id,
            notes: c.notes,
        }).collect())
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn fetch_company(pool: tauri::State<'_, DbPool>, id: String) -> Result<Option<CompanyResponse>, String> {
    get_company_by_id(&*pool, &id)
        .await
        .map(|opt| opt.map(|c| CompanyResponse {
            id: c.id,
            name: c.name,
            website: c.website,
            location: c.location,
            industry_id: c.industry_id,
            notes: c.notes,
        }))
        .map_err(|e| e.to_string())
}