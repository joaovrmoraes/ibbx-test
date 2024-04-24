import { api } from '../lib/axios'

export interface getSensorsRequest {
    assetId: string
}


export interface getSensorsResponse {
    id: string
    name: string
    assetId: string
}

export async function getSensors({ assetId }: getSensorsRequest) {
    const response = await api.get<getSensorsResponse[]>(`/assets/${assetId}/sensors`)

    return response.data
}