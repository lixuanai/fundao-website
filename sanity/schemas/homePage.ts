import { defineField, defineType } from 'sanity'

/**
 * 首页配置 — 单例文档（Singleton）
 * 中英双版本，去掉图标（lucide-react 写死代码）和奖励模型（不进 CMS）
 */
export const homePage = defineType({
  name: 'homePage',
  title: '首页配置',
  type: 'document',
  fields: [
    // ===== Hero 区域（中英） =====
    defineField({
      name: 'hero',
      title: 'Hero 区域',
      type: 'object',
      fields: [
        defineField({ name: 'badgeZh', title: '标签（中文）', type: 'string' }),
        defineField({ name: 'badgeEn', title: 'Badge (English)', type: 'string' }),
        defineField({ name: 'title1Zh', title: '标题第一行（中文）', type: 'string' }),
        defineField({ name: 'title1En', title: 'Title Line 1 (English)', type: 'string' }),
        defineField({ name: 'titleHighlightZh', title: '高亮词（中文）', type: 'string' }),
        defineField({ name: 'titleHighlightEn', title: 'Highlight (English)', type: 'string' }),
        defineField({ name: 'title2Zh', title: '标题第三行（中文）', type: 'string' }),
        defineField({ name: 'title2En', title: 'Title Line 3 (English)', type: 'string' }),
        defineField({ name: 'subtitleZh', title: '副标题（中文）', type: 'text', rows: 3 }),
        defineField({ name: 'subtitleEn', title: 'Subtitle (English)', type: 'text', rows: 3 }),
        defineField({ name: 'ctaTextZh', title: '主按钮文字（中文）', type: 'string' }),
        defineField({ name: 'ctaTextEn', title: 'Primary CTA (English)', type: 'string' }),
        defineField({ name: 'ctaLink', title: '主按钮链接', type: 'string' }),
        defineField({ name: 'ctaSecondaryTextZh', title: '副按钮文字（中文）', type: 'string' }),
        defineField({ name: 'ctaSecondaryTextEn', title: 'Secondary CTA (English)', type: 'string' }),
        defineField({ name: 'ctaSecondaryLink', title: '副按钮链接', type: 'string' }),
      ],
    }),

    // ===== 数据统计（中英） =====
    defineField({
      name: 'stats',
      title: '数据统计',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: '数值', type: 'string' }),
            defineField({ name: 'labelZh', title: '标签（中文）', type: 'string' }),
            defineField({ name: 'labelEn', title: 'Label (English)', type: 'string' }),
            defineField({ name: 'suffix', title: '后缀（如 %）', type: 'string' }),
          ],
        },
      ],
    }),

    // ===== 核心特性（中英，无图标） =====
    defineField({
      name: 'features',
      title: '核心特性',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'titleZh', title: '标题（中文）', type: 'string' }),
            defineField({ name: 'titleEn', title: 'Title (English)', type: 'string' }),
            defineField({ name: 'descZh', title: '描述（中文）', type: 'text', rows: 3 }),
            defineField({ name: 'descEn', title: 'Description (English)', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),

    // ===== CTA 区域（中英） =====
    defineField({
      name: 'cta',
      title: 'CTA 区域',
      type: 'object',
      fields: [
        defineField({ name: 'titleZh', title: '标题（中文）', type: 'string' }),
        defineField({ name: 'titleEn', title: 'Title (English)', type: 'string' }),
        defineField({ name: 'subtitleZh', title: '副标题（中文）', type: 'text', rows: 2 }),
        defineField({ name: 'subtitleEn', title: 'Subtitle (English)', type: 'text', rows: 2 }),
        defineField({ name: 'buttonTextZh', title: '按钮文字（中文）', type: 'string' }),
        defineField({ name: 'buttonTextEn', title: 'Button (English)', type: 'string' }),
        defineField({ name: 'buttonLink', title: '按钮链接', type: 'string' }),
      ],
    }),
  ],

  preview: {
    select: { title: 'hero.title1Zh' },
    prepare({ title }) {
      return { title: title || '首页配置' }
    },
  },
})
