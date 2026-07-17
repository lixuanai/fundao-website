import { NextResponse } from 'next/server'
import { SITE_CONFIG } from '@/lib/constants'

export function GET() {
  const content = `# ${SITE_CONFIG.name}

> ${SITE_CONFIG.description}

## About

FunDAO is a decentralized digital asset platform built on BSC (BNB Smart Chain).
Our smart contract financial protocol enables secure, transparent, and sustainable asset growth.

## Key Features

- Decentralized finance protocol on BSC
- Smart contract-based asset management
- Transparent on-chain operations
- Community governance through DAO

## Pages

- [Home](${SITE_CONFIG.url}/zh) — Main landing page
- [About](${SITE_CONFIG.url}/zh/about) — About FunDAO
- [Products](${SITE_CONFIG.url}/zh/products) — Our products and services
- [News](${SITE_CONFIG.url}/zh/news) — Latest news and updates
- [Industry](${SITE_CONFIG.url}/zh/industry) — Industry insights
- [Contact](${SITE_CONFIG.url}/zh/contact) — Get in touch

## Technical

- Built with Next.js 14 (App Router)
- Content managed via Sanity CMS
- Bilingual: Chinese (zh) / English (en)
- Token: ${SITE_CONFIG.token.symbol} (${SITE_CONFIG.token.standard}) on ${SITE_CONFIG.token.chain}
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
