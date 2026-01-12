import { invoke } from "@tauri-apps/api/core"

export interface Company {
  id: string;
  name: string;
  website: string | null;
  location: string | null;
  industry_id: string | null;
  notes: string | null;
}

export interface Industry {
  id: string;
  name: string;
  description: string | null;
}

export class CompaniesService {
  public static getAll = async (): Promise<Company[]> => await invoke("fetch_companies");
  public static getById = async (id: string): Promise<Company | null> => await invoke("fetch_company", { id });
}

export class IndustriesService {
  public static getAll = async (): Promise<Industry[]> => await invoke("fetch_industries");
  public static getById = async (id: string): Promise<Industry | null> => await invoke("fetch_industry", { id });
}
