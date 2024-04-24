import { api } from '../lib/axios'

export interface getAssetsResponse {
    id: string
    name: string
}


export async function getAssets() {
    const response = await api.get<getAssetsResponse[]>('/assets')

    return response.data
}