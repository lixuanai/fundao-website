import { createClient } from '@sanity/client'

// 写操作专用客户端（需要 token）
export const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4wq2d1xx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

// 读操作客户端（公开）
export const sanityReadClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4wq2d1xx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
