import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Global Profile',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ 
      name: 'headline', 
      title: 'Professional Headline', 
      type: 'string',
      description: 'e.g. Android Developer or Firmware Engineer' 
    }),
    defineField({ name: 'bio', type: 'text' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'skills',
      title: 'Skills & Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add skills relevant to the current role you are targeting.'
    }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      fields: [
        { name: 'twitter', type: 'url' },
        { name: 'instagram', type: 'url' },
        { name: 'linkedin', type: 'url' },
        { name: 'github', type: 'url' },
      ]
    }),
  ],
})