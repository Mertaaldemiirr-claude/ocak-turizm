import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

// Server-only: SANITY_TOKEN ile yazma yetkili istemci (form kayıtları için)
export function createWriteClient() {
  const token = process.env.SANITY_TOKEN
  if (!token) return null
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })
}
