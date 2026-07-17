import { defineField, defineType } from 'sanity'

/**
 * 产品 — CMS 管理的产品卡片
 * 数据源：Sanity CMS（可变数据）
 */
export const product = defineType({
  name: 'product',
  title: '产品',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '产品名称', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'URL 标识', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: '副标题', type: 'string' }),
    defineField({ name: 'description', title: '描述', type: 'text', rows: 4 }),
    defineField({ name: 'icon', title: '图标名称', type: 'string', description: 'lucide-react 图标名' }),
    defineField({ name: 'image', title: '产品图片', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'features',
      title: '功能列表',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'order', title: '排序', type: 'number', initialValue: 0 }),
    defineField({
      name: 'status',
      title: '状态',
      type: 'string',
      options: { list: ['draft', 'published'] },
      initialValue: 'draft',
    }),
  ],
  orderings: [
    { title: '排序', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
