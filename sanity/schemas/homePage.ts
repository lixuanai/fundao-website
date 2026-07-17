import { defineField, defineType } from 'sanity'

/**
 * 首页配置 — 单例文档（Singleton）
 * 所有首页可变数据集中管理，轩爱在 CMS 后台直接编辑
 */
export const homePage = defineType({
  name: 'homePage',
  title: '首页配置',
  type: 'document',
  fields: [
    // ===== Hero 区域 =====
    defineField({
      name: 'hero',
      title: 'Hero 区域',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: '标签文字', type: 'string' }),
        defineField({ name: 'title1', title: '标题第一行', type: 'string' }),
        defineField({ name: 'titleHighlight', title: '标题高亮词', type: 'string' }),
        defineField({ name: 'title2', title: '标题第三行', type: 'string' }),
        defineField({ name: 'subtitle', title: '副标题', type: 'text', rows: 3 }),
        defineField({ name: 'ctaText', title: '主按钮文字', type: 'string' }),
        defineField({ name: 'ctaLink', title: '主按钮链接', type: 'string' }),
        defineField({ name: 'ctaSecondaryText', title: '副按钮文字', type: 'string' }),
        defineField({ name: 'ctaSecondaryLink', title: '副按钮链接', type: 'string' }),
      ],
    }),

    // ===== 数据统计 =====
    defineField({
      name: 'stats',
      title: '数据统计',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: '数值', type: 'string' }),
            defineField({ name: 'label', title: '标签', type: 'string' }),
            defineField({ name: 'suffix', title: '后缀（如 %）', type: 'string' }),
          ],
        },
      ],
    }),

    // ===== 核心特性 =====
    defineField({
      name: 'features',
      title: '核心特性',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: '图标名称', type: 'string', description: 'lucide-react 图标名' }),
            defineField({ name: 'title', title: '标题', type: 'string' }),
            defineField({ name: 'description', title: '描述', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),

    // ===== 奖励模型 =====
    defineField({
      name: 'rewards',
      title: '奖励模型',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: '区块标题', type: 'string' }),
        defineField({ name: 'subtitle', title: '区块副标题', type: 'string' }),
        defineField({
          name: 'tiers',
          title: '奖励层级',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'percentage', title: '百分比', type: 'number' }),
                defineField({ name: 'label', title: '标签', type: 'string' }),
                defineField({ name: 'description', title: '描述', type: 'text', rows: 2 }),
                defineField({ name: 'color', title: '颜色', type: 'string', description: '如 cyan, purple, pink' }),
              ],
            },
          ],
        }),
      ],
    }),

    // ===== CTA 区域 =====
    defineField({
      name: 'cta',
      title: 'CTA 区域',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: '标题', type: 'string' }),
        defineField({ name: 'subtitle', title: '副标题', type: 'text', rows: 2 }),
        defineField({ name: 'buttonText', title: '按钮文字', type: 'string' }),
        defineField({ name: 'buttonLink', title: '按钮链接', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'hero.title1' },
    prepare({ title }) {
      return { title: title || '首页配置' }
    },
  },
})
