use backend_data_apply_tracking::companies::{delete_company, get_all_companies, get_companies_paginated, get_company_by_id, add_company, NewCompany};
use backend_data_apply_tracking::DbPool;
use serde::{Serialize, Deserialize};

#[derive(Serialize)]
pub struct CompanyResponse {
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

#[derive(Debug, Serialize)]
#[serde(tag = "type", content = "data")]
#[allow(dead_code)]
pub enum CompanyError {
    NotFound { id: String },
    DatabaseError { message: String },
    EmptyTable,
}

#[tauri::command]
pub async fn fetch_companies(pool: tauri::State<'_, DbPool>) -> Result<Vec<CompanyResponse>, String> {
    get_all_companies(&*pool)
        .await
        .map(|companies| companies.into_iter().map(|c| CompanyResponse {
            id: c.id,
            name: c.name,
            website: c.website,
            address_line1: c.address_line1,
            address_line2: c.address_line2,
            postal_code: c.postal_code,
            city: c.city,
            state_province: c.state_province,
            country: c.country,
            company_size: c.company_size,
            glassdoor_url: c.glassdoor_url,
            linkedin_url: c.linkedin_url,
            twitter_url: c.twitter_url,
            siret: c.siret,
            notes: c.notes,
            is_default: c.is_default,
            created_at: c.created_at.to_string(),
            updated_at: c.updated_at.to_string(),
            deleted_at: c.deleted_at.map(|d| d.to_string()),
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
            address_line1: c.address_line1,
            address_line2: c.address_line2,
            postal_code: c.postal_code,
            city: c.city,
            state_province: c.state_province,
            country: c.country,
            company_size: c.company_size,
            glassdoor_url: c.glassdoor_url,
            linkedin_url: c.linkedin_url,
            twitter_url: c.twitter_url,
            siret: c.siret,
            notes: c.notes,
            is_default: c.is_default,
            created_at: c.created_at.to_string(),
            updated_at: c.updated_at.to_string(),
            deleted_at: c.deleted_at.map(|d| d.to_string()),
        }))
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn fetch_companies_paginated(
    pool: tauri::State<'_, DbPool>,
    page: i64,
    per_page: i64,
) -> Result<PaginatedCompaniesResult, String> {
    match get_companies_paginated(&*pool, page, per_page).await {
        Ok(result) => {
            let data: Vec<CompanyResponse> = result.data
                .into_iter()
                .map(|c| CompanyResponse {
                    id: c.id,
                    name: c.name,
                    website: c.website,
                    address_line1: c.address_line1,
                    address_line2: c.address_line2,
                    postal_code: c.postal_code,
                    city: c.city,
                    state_province: c.state_province,
                    country: c.country,
                    company_size: c.company_size,
                    glassdoor_url: c.glassdoor_url,
                    linkedin_url: c.linkedin_url,
                    twitter_url: c.twitter_url,
                    siret: c.siret,
                    notes: c.notes,
                    is_default: c.is_default,
                    created_at: c.created_at.to_string(),
                    updated_at: c.updated_at.to_string(),
                    deleted_at: c.deleted_at.map(|d| d.to_string()),
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


#[tauri::command]
pub async fn remove_company(
    pool: tauri::State<'_, DbPool>,
    id: String,
) -> Result<bool, CompanyError> {
    match delete_company(&*pool, &id).await {
        Ok(true) => Ok(true),
        Ok(false) => Err(CompanyError::NotFound { id }),
        Err(e) => Err(CompanyError::DatabaseError { message: e.to_string() }),
    }
}

#[derive(Deserialize)]
pub struct CreateCompanyRequest {
    pub name: String,
    pub website: Option<String>,
    pub address_line1: Option<String>,
    pub address_line2: Option<String>,
    pub postal_code: Option<String>,
    pub city: Option<String>,
    pub state_province: Option<String>,
    pub country: Option<String>,
    pub company_size: Option<String>,
    pub glassdoor_url: Option<String>,
    pub linkedin_url: Option<String>,
    pub twitter_url: Option<String>,
    pub siret: Option<String>,
    pub notes: Option<String>,
}

#[tauri::command]
pub async fn create_company(
    pool: tauri::State<'_, DbPool>,
    input: CreateCompanyRequest,
) -> Result<CompanyResponse, CompanyError> {

    let new = NewCompany {
        name: input.name,
        website: input.website,
        address_line1: input.address_line1,
        address_line2: input.address_line2,
        postal_code: input.postal_code,
        city: input.city,
        state_province: input.state_province,
        country: input.country,
        company_size: input.company_size,
        glassdoor_url: input.glassdoor_url,
        linkedin_url: input.linkedin_url,
        twitter_url: input.twitter_url,
        siret: input.siret,
        notes: input.notes
    };

    println!("Creating company: {:?}", new);

    match add_company(&*pool, new).await {
        Ok(c) => Ok(CompanyResponse {
            id: c.id,
            name: c.name,
            website: c.website,
            address_line1: c.address_line1,
            address_line2: c.address_line2,
            postal_code: c.postal_code,
            city: c.city,
            state_province: c.state_province,
            country: c.country,
            company_size: c.company_size,
            glassdoor_url: c.glassdoor_url,
            linkedin_url: c.linkedin_url,
            twitter_url: c.twitter_url,
            siret: c.siret,
            notes: c.notes,
            is_default: false,
            created_at: c.created_at.to_string(),
            updated_at: c.updated_at.to_string(),
            deleted_at: c.deleted_at.map(|d| d.to_string()),
        }),
        Err(e) => Err(CompanyError::DatabaseError { message: e.to_string() }),
    }
}

