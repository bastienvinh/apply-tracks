#[derive(Debug)]
pub struct PaginatedResult<T> {
  pub data: Vec<T>,
  pub count: i64,
  pub current_page: i64,
  pub per_page: i64,
  pub total_pages: i64,
  pub has_next: bool,
  pub has_previous: bool,
}