// ✅ הגדרת טיפוס קטגוריה נפרד (נדרש ל-GraphQL)
export const category = {
  name: 'category',
  title: 'Category',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
  ],
};

export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'siteId',
      title: 'Site ID',
      type: 'string',
      description: 'Identifier for the site (e.g. infostreamhub, smartcents)',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary for article cards',
      validation: Rule => Rule.max(200)
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility'
        },
        { name: 'caption', title: 'Caption', type: 'string' }
      ]
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
      description: 'Raw text content'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    // ✅ משתמש בטיפוס החדש במקום object אנונימי
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'category' }]
    },
    {
      name: 'vertical',
      title: 'Vertical',
      type: 'string',
      options: {
        list: [
          { title: 'Finance', value: 'finance' },
          { title: 'Health', value: 'health' },
          { title: 'Home', value: 'home' }
        ]
      }
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'lang',
      title: 'Language',
      type: 'string',
      initialValue: 'en'
    },
    {
      name: 'isMainHeadline',
      title: 'Main Headline',
      type: 'boolean',
      description: 'Display as main headline on homepage',
      initialValue: false
    },
    {
      name: 'isSubHeadline',
      title: 'Sub Headline',
      type: 'boolean',
      description: 'Display as sub headline on homepage',
      initialValue: false
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime'
    },
    {
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      description: 'e.g. "5 min read"'
    }
  ]
};
