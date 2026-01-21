import { invoke } from "@tauri-apps/api/core"

export interface IndustryCreatePayload {
  name: string
  description?: string | null
}

export interface IndustryUpdatePayload extends IndustryCreatePayload {
  id: string
}

export class IndustriesService {
  public static getAll = async (): Promise<PaginatedIndustries> => await invoke("fetch_industries")
  public static getById = async (id: string): Promise<Industry | null> => await invoke("fetch_industry", { id })
  public static getPaginated = async (page: number, pageSize: number): Promise<PaginatedIndustries> => await invoke("fetch_industries_paginated", { page, perPage: pageSize })
  public static removeById = async (id: string): Promise<boolean> => await invoke("remove_industry", { id })
  public static create = async (payload: IndustryCreatePayload): Promise<Industry> => await invoke("add_industry", { name: payload.name, description: payload.description })
  public static update = async (payload: IndustryUpdatePayload): Promise<Industry> => await invoke("update_industry", { id: payload.id, name: payload.name, description: payload.description })
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