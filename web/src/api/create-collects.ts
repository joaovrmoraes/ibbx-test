import { api } from '../lib/axios'

export interface CreateCollectRequest {
  date: Date
  value: number
  sensorId: string
  assetId: string
}

export interface CreateCollectResponse {
  id: string
  date: Date
  value: number
  sensorId: string
}

export async function createCollect({ date, value, sensorId, assetId }: CreateCollectRequest) {
  const response = await api.post<CreateCollectResponse>(`/assets/${assetId}/sensors/${sensorId}`, { date, value })

  return response.data
}