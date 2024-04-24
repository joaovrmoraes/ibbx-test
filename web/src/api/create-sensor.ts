import { api } from '../lib/axios'

export interface CreateSensor {
  name: string
  assetId: string
}

export async function createSensor({ name, assetId }: CreateSensor) {
  const response = await api.post(`/assets/${assetId}/sensors`, { name })

  return response.data
}