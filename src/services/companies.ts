import { invoke } from "@tauri-apps/api/core"

export type CompanySize = 'startup' | 'small' | 'medium' | 'large' | 'enterprise'

export interface Company {
  id: string
  name: string
  website: string | null
  address_line1: string | null
  address_line2: string | null
  postal_code: string | null
  city: string | null
  state_province: string | null
  country: string | null
  company_size: CompanySize
  glassdoor_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  siret: string | null
  notes: string | null
  is_default: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
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
  public static deleteById = async (id: string): Promise<boolean> => await invoke("remove_company", { id })
  public static create = async (company: Partial<Company>): Promise<Company> => await invoke("create_company", { input: company })
  public static update = async (id: string, company: Partial<Company>): Promise<Company> => await invoke("update_company", { id, input: company })
}


