// FunDAO — 真正不变的元数据
// 会变的数据（收益模型、代币详情、投资人等）由 CMS 管理

export const SITE_CONFIG = {
  name: 'FunDAO',
  description: 'FunDAO — 去中心化数字资产平台，基于 BSC 的智能合约金融协议',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fundao.fun',
  token: {
    symbol: 'FUN',
    standard: 'BEP-20',
    chain: 'BSC',
  },
} as const
