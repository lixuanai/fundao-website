import { sanityClient } from './client'

// ============================================
// 通用查询
// ============================================

export async function getPageBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug }
  )
}

// ============================================
// 新闻查询
// ============================================

export async function getAllNews() {
  return sanityClient.fetch(
    `*[_type == "news"] | order(publishDate desc) {
      _id, title, summary, coverImage, publishDate, slug
    }`
  )
}

// ============================================
// 行业资讯查询
// ============================================

export async function getAllIndustryNews() {
  return sanityClient.fetch(
    `*[_type == "industry"] | order(publishedAt desc) {
      _id, title, excerpt, content, mainImage, publishedAt,
      category, source, sourceUrl, tags, slug
    }`
  )
}

// ============================================
// 产品查询
// ============================================

export async function getAllProducts() {
  return sanityClient.fetch(
    `*[_type == "product"] | order(order asc) {
      _id, name, description, icon, features, link
    }`
  )
}

// ============================================
// 首页配置查询
// ============================================

export async function getHomePageConfig() {
  return sanityClient.fetch(`*[_type == "homePageConfig"][0]`)
}
