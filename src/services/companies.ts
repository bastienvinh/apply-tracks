import { invoke } from "@tauri-apps/api/core"

export interface Company {
  id: string
  name: string
  website: string | null
  location: string | null
  notes: string | null
}

export interface ResponseCompanies {
  data: Company[]
  count: number
}

export interface PaginatedCompanies extends ResponseCompanies {
  page?: number
  per_page?: number
  has_next?: boolean
  has_previous?: boolean
  total_pages?: number
}

export class CompaniesService {
  public static getAll = async (): Promise<PaginatedCompanies> => await invoke("fetch_companies_paginated", { page: 1, perPage: Number.MAX_SAFE_INTEGER })
  public static getAllPaginated = async (page: number, perPage: number): Promise<PaginatedCompanies> =>
    await invoke("fetch_companies_paginated", { page, perPage })
  public static getById = async (id: string): Promise<Company | null> => await invoke("fetch_company", { id })
}


