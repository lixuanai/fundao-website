import { defineField, defineType } from 'sanity'

/**
 * 文章 Schema — 新闻 & 行业资讯共用
 * 中英双版本：titleZh/titleEn, excerptZh/excerptEn, contentZh/contentEn
 * 正文支持 Portable Text + 内嵌图片
 */
export const article = defineType({
  name: 'article',
  title: '文章管理',
  type: 'document',
  fields: [
    // ===== 基础信息 =====
    defineField({
      name: 'titleZh',
      title: '标题（中文）',
      type: 'string',
      validation: (Rule) => Rule.required().error('中文标题必填'),
    }),
    defineField({
      name: 'titleEn',
      title: '标题（English）',
      type: 'string',
      validation: (Rule) => Rule.required().error('English title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'titleZh', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '分类',
      type: 'string',
      options: {
        list: [
          { title: '新闻 / News', value: 'news' },
          { title: '行业资讯 / Industry', value: 'industry' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: '状态',
      type: 'string',
      options: {
        list: [
          { title: '草稿', value: 'draft' },
          { title: '已发布', value: 'published' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),

    // ===== 摘要（中英） =====
    defineField({
      name: 'excerptZh',
      title: '摘要（中文）',
      type: 'text',
      rows: 3,
      description: '文章列表页显示的中文摘要',
    }),
    defineField({
      name: 'excerptEn',
      title: '摘要（English）',
      type: 'text',
      rows: 3,
      description: 'Displayed on article list page',
    }),

    // ===== 正文（中英，支持插图） =====
    defineField({
      name: 'contentZh',
      title: '正文（中文）',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          title: '图片',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt 文本',
              type: 'string',
              description: '图片描述，用于无障碍访问',
            }),
            defineField({
              name: 'caption',
              title: '图片说明',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (English)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    // ===== 封面图 =====
    defineField({
      name: 'coverImage',
      title: '封面图',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt 文本',
          type: 'string',
          validation: (Rule) => Rule.required().error('封面图 Alt 文本必填'),
        }),
      ],
      // validation: (Rule) => Rule.required(), // 改为非必填
    }),

    // ===== 元数据 =====
    defineField({
      name: 'author',
      title: '作者',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: '标签',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'publishedAt',
      title: '发布时间',
      type: 'datetime',
    }),
  ],

  orderings: [
    {
      title: '发布时间（新→旧）',
      name: 'publishDateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: '创建时间（新→旧）',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'titleZh',
      media: 'coverImage',
      subtitle: 'category',
    },
    prepare({ title, media, subtitle }) {
      return {
        title: title || '未命名文章',
        media,
        subtitle: subtitle === 'news' ? '新闻' : '行业资讯',
      }
    },
  },
})
