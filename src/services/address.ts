// The API is based on https://www.data.gouv.fr/dataservices/api-adresse-base-adresse-nationale-ban

const BASE_URL = "https://data.geopf.fr/geocodage"

export interface Feature {
  geometry: {
    coordinates: number[]
    type: string
  }
  properties: {
    _type: string
    banid?: string
    id?: string
    city?: string
    citycode?: string
    context?: string
    housenumber?: string
    label?: string
    name?: string
    oldcity?: string
    oldcitycode?: string
    postcode?: string
    score?: number
    street?: string
    type?: string
    importance?: number
    x?: number
    y?: number
    X?: number
    Y?: number
    [key: string]: any
  }
}

export type Address = {
  features: Feature[]
}

export class AddressService {
  public static async getAddressSuggestions(query: string): Promise<Feature[]> {

    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`)
    if (response.ok) {
      const data: Address = await response.json()
      return data.features
    }

    return []
  }
}