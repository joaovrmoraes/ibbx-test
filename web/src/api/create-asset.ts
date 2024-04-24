import { api } from '../lib/axios'

export interface CreateAsset {
    name: string
}

export async function createAsset({ name }: CreateAsset) {
    const response = await api.post('/assets', { name })

    return response.data
}