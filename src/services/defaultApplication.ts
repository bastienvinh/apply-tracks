import { invoke } from "@tauri-apps/api/core"

export class DefaultApplicationService {
  static async openWebsite(url: string) {
    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }
    await invoke("open_website", { url });
  }
}