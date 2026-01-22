use backend_data_apply_tracking::companies::{get_all_companies, get_company_by_id, get_companies_paginated };
use backend_data_apply_tracking::DbPool;
use serde::Serialize;

#[derive(Serialize)]
pub struct CompanyResponse {
    pub id: String,
    pub name: String,
    pub website: Option<String>,
    pub location: Option<String>,
    pub notes: Option<String>,
}

#[derive(Serialize)]
pub struct PaginatedCompaniesResult {
    pub data: Vec<CompanyResponse>,
    pub count: i64,
    pub current_page: i64,
    pub per_page: i64,
    pub total_pages: i64,
    pub has_next: bool,
    pub has_previous: bool,
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
            notes: c.notes,
        }))
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn fetch_companies_paginated(
    pool: tauri::State<'_, DbPool>,
    page: i64,
    per_page: i64,
) -> Result<PaginatedCompaniesResult, String> {
    match backend_data_apply_tracking::companies::get_companies_paginated(&*pool, page, per_page).await {
        Ok(result) => {
            let data: Vec<CompanyResponse> = result.data
                .into_iter()
                .map(|c| CompanyResponse {
                    id: c.id,
                    name: c.name,
                    website: c.website,
                    location: c.location,
                    notes: c.notes,
                })
                .collect();

            Ok(PaginatedCompaniesResult {
                data,
                count: result.count,
                current_page: result.current_page,
                per_page: result.per_page,
                total_pages: result.total_pages,
                has_next: result.has_next,
                has_previous: result.has_previous,
            })
        }
        Err(e) => {
            println!("{}", e.to_string());
            Err(e.to_string())
        },
    }
}