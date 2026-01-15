import { invoke } from "@tauri-apps/api/core"

export class IndustriesService {
  public static getAll = async (): Promise<PaginatedIndustries> => await invoke("fetch_industries")
  public static getById = async (id: string): Promise<Industry | null> => await invoke("fetch_industry", { id })
  public static getPaginated = async (page: number, pageSize: number): Promise<PaginatedIndustries> => await invoke("fetch_industries_paginated", { page, perPage: pageSize })
}

export interface Industry {
  id: string
  name: string
  description: string | null
}

export interface ResponseIndustries {
  data: Industry[]
  count: number
}

export interface PaginatedIndustries extends ResponseIndustries {
  page?: number
  per_page?: number
  has_next?: boolean
  has_previous?: boolean
  total_pages?: number
}