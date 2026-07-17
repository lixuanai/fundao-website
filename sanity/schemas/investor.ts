import { defineField, defineType } from 'sanity'

/**
 * 投资人/合作伙伴 Logo — 首页信任背书区域
 */
export const investor = defineType({
  name: 'investor',
  title: '投资人/合作伙伴',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: '名称', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'logo', title: 'Logo 图片', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'website', title: '官网链接', type: 'url' }),
    defineField({ name: 'order', title: '排序', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: '排序', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
