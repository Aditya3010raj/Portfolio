import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Projects & Blogs',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'techStack',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Next.js, Gemini AI, Firebase',
    }),
    defineField({
      name: 'projectLinks',
      title: 'Project Links',
      type: 'object',
      fields: [
        { name: 'live', title: 'Live Demo URL', type: 'url' },
        { name: 'github', title: 'GitHub Repository', type: 'url' },
      ],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'blockContent', // This references your blockContent.ts
    }),
  ],
})