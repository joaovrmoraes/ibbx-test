import { api } from '../lib/axios'

export interface getCollectsRequest {
  assetId: string
  sensorId: string
}

export interface getCollectsResponse {
  id: string
  date: string
  value: number
  sensorId: string
}

export async function getCollects({ assetId, sensorId }: getCollectsRequest) {
  const response = await api.get<getCollectsResponse[]>(`/assets/${assetId}/sensors/${sensorId}`)

  return response.data
}