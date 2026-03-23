import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Projects & Blogs',
  type: 'document',
  fields: [
    // Basic Information
    defineField({
      name: 'title',
      type: 'string',
      title: 'Project Title',
      validation: (Rule) => Rule.required(),
      description: 'The main title that will be displayed in your portfolio'
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      description: 'Brief overview (2-3 sentences) for cards and previews',
      validation: (Rule) => Rule.max(300)
    }),

    // Project Type & Status
    defineField({
      name: 'projectType',
      type: 'string',
      title: 'Project Type',
      options: {
        list: [
          { title: 'Personal Project', value: 'personal' },
          { title: 'Client Project', value: 'client' },
          { title: 'Open Source', value: 'open-source' },
          { title: 'Freelance', value: 'freelance' },
          { title: 'Academic', value: 'academic' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Project Status',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Planned', value: 'planned' },
          { title: 'On Hold', value: 'on-hold' }
        ]
      },
      initialValue: 'completed'
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured Project',
      description: 'Show this project prominently on your homepage',
      initialValue: false
    }),

    // Media
    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main project screenshot or preview image'
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional screenshots and images'
    }),

    // Technologies & Skills
    defineField({
      name: 'techStack',
      title: 'Technologies Used',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Technology Name' },
          { name: 'icon', type: 'string', title: 'Icon Name (e.g., bxl-react)', description: 'BoxIcon name for styling' },
          { name: 'category', type: 'string', title: 'Category', options: {
            list: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other']
          }}
        ]
      }],
      description: 'List all technologies, frameworks, and tools used'
    }),
    defineField({
      name: 'categories',
      title: 'Project Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Web Development', 'Mobile App', 'Desktop App', 'API', 'E-commerce',
          'CMS', 'Dashboard', 'Portfolio', 'Blog', 'Landing Page', 'SaaS',
          'Educational', 'Entertainment', 'Productivity', 'Social', 'Other'
        ]
      }
    }),

    // Links & URLs
    defineField({
      name: 'projectLinks',
      title: 'Project Links',
      type: 'object',
      fields: [
        { name: 'live', title: 'Live Demo URL', type: 'url', description: 'Link to the deployed project' },
        { name: 'github', title: 'GitHub Repository', type: 'url', description: 'Source code repository' },
        { name: 'figma', title: 'Design Files (Figma)', type: 'url' },
        { name: 'caseStudy', title: 'Case Study/Write-up', type: 'url' }
      ]
    }),

    // Project Details
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Project Start Date'
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      title: 'Project End Date',
      description: 'Leave empty if still in progress'
    }),
    defineField({
      name: 'duration',
      type: 'string',
      title: 'Project Duration',
      description: 'e.g., "3 months", "6 weeks", "Ongoing"'
    }),
    defineField({
      name: 'teamSize',
      type: 'number',
      title: 'Team Size',
      description: 'Number of people who worked on this project'
    }),
    defineField({
      name: 'myRole',
      type: 'string',
      title: 'My Role',
      description: 'Your specific role or contribution to the project'
    }),

    // Client Information (for client/freelance projects)
    defineField({
      name: 'client',
      type: 'object',
      title: 'Client Information',
      fields: [
        { name: 'name', type: 'string', title: 'Client Name' },
        { name: 'website', type: 'url', title: 'Client Website' },
        { name: 'industry', type: 'string', title: 'Industry' }
      ],
      hidden: ({ document }) => document?.projectType !== 'client' && document?.projectType !== 'freelance'
    }),

    // Content
    defineField({
      name: 'body',
      title: 'Project Details',
      type: 'blockContent',
      description: 'Detailed description, challenges, solutions, and learnings'
    }),

    // SEO & Publishing
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Title',
      description: 'Custom title for search engines (optional)'
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      title: 'SEO Description',
      description: 'Meta description for search engines',
      validation: (Rule) => Rule.max(160)
    })
  ],

  // Preview configuration for better UX in Sanity Studio
  preview: {
    select: {
      title: 'title',
      subtitle: 'projectType',
      media: 'mainImage',
      status: 'status'
    },
    prepare(selection) {
      const { title, subtitle, media, status } = selection
      return {
        title,
        subtitle: `${subtitle} • ${status}`,
        media
      }
    }
  }
})