use backend_data_apply_tracking::tags::{get_all_tags, get_tags_paginated};
use backend_data_apply_tracking::DbPool;
use serde::Serialize;

// #[tauri::command]
// pub async fn fetch_industries_paginated(
// 	pool: tauri::State<'_, DbPool>,
// 	page: i64,
// 	per_page: i64,
// ) -> Result<PaginatedIndustriesResult, TagError> {
// 	match get_industries_paginated(&*pool, page, per_page).await {
// 		Ok(result) => {
// 			let data: Vec<IndustryResponse> = result.data
// 				.into_iter()
// 				.map(|i| IndustryResponse {
// 					id: i.id,
// 					name: i.name,
// 					description: i.description,
// 				})
// 				.collect();

// 			Ok(PaginatedIndustriesResult {
// 				data,
// 				count: result.count,
// 				current_page: result.current_page,
// 				per_page: result.per_page,
// 				total_pages: result.total_pages,
// 				has_next: result.has_next,
// 				has_previous: result.has_previous,
// 			})
// 		}
// 		Err(e) => Err(TagError::DatabaseError { message: e.to_string() }),
// 	}
// }

#[derive(Debug, Serialize)]
pub struct TagResponse {
	pub id: String,
	pub name: String,
	pub description: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct PaginatedTagsResult {
	pub data: Vec<TagResponse>,
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
pub enum TagError {
	NotFound { id: String },
	DatabaseError { message: String },
	EmptyTable,
}

impl std::fmt::Display for TagError {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			TagError::NotFound { id } => write!(f, "Tag with id '{}' not found", id),
			TagError::DatabaseError { message } => write!(f, "Database error: {}", message),
			TagError::EmptyTable => write!(f, "No tags found in the database"),
		}
	}
}

#[tauri::command]
pub async fn fetch_tags(pool: tauri::State<'_, DbPool>,
 	page: i64,
 	per_page: i64
) -> Result<PaginatedTagsResult, TagError> {
  match get_tags_paginated(&*pool, page, per_page).await {
    Ok(result) => {
      let data: Vec<TagResponse> = result.data
        .into_iter()
        .map(|t| TagResponse {
          id: t.id,
          name: t.name,
          description: t.description,
        })
        .collect();

      Ok(PaginatedTagsResult {
        data,
        count: result.count,
        current_page: result.current_page,
        per_page: result.per_page,
        total_pages: result.total_pages,
        has_next: result.has_next,
        has_previous: result.has_previous,
      })
    }
    Err(e) => Err(TagError::DatabaseError { message: e.to_string() }),
  }
}