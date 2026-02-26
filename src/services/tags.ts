import { invoke } from "@tauri-apps/api/core"

export type Tag = {
  id: string
  name: string
  description: string | null
}

export class TagsService {
  public static getAll = async (): Promise<Tag[]> => await invoke("fetch_tags")
}