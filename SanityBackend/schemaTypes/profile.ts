import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Global Profile',
  type: 'document',
  fields: [
    // Basic Information
    defineField({ 
      name: 'name', 
      type: 'string',
      title: 'Full Name',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'headline', 
      title: 'Main Headline', 
      type: 'string',
      description: 'e.g. "Full-Stack Developer & Designer"',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'subheadline', 
      type: 'text',
      title: 'Subheadline',
      description: 'Brief tagline or subtitle'
    }),
    defineField({ 
      name: 'bio', 
      type: 'text',
      title: 'Biography',
      description: 'Detailed bio/about section for your portfolio',
      validation: Rule => Rule.required()
    }),
    
    // Profile Image
    defineField({ 
      name: 'profileImage', 
      type: 'image', 
      title: 'Profile Photo',
      options: { hotspot: true }
    }),
    
    // Contact Information
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      validation: Rule => Rule.email()
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone Number',
      description: 'Your contact phone number'
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      description: 'City and Country'
    }),
    
    // Skills & Tech Stack
    defineField({
      name: 'skills',
      title: 'Skills & Tech Stack',
      type: 'array',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'skillName', type: 'string', title: 'Skill Name' },
          { name: 'iconName', title: 'BoxIcon Name (e.g. bxl-react)', type: 'string' },
          { name: 'percentage', type: 'number', title: 'Proficiency %', validation: Rule => Rule.min(0).max(100) }
        ]
      }]
    }),
    
    // Social Links
    defineField({
      name: 'socialLinks',
      type: 'object',
      title: 'Social Links',
      fields: [
        { name: 'twitter', type: 'url', title: 'Twitter URL' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
        { name: 'github', type: 'url', title: 'GitHub URL' },
        { name: 'instagram', type: 'url', title: 'Instagram URL' }
      ]
    }),

    // Professional Details
    defineField({
      name: 'experience',
      type: 'text',
      title: 'Professional Experience',
      description: 'Summary of professional background and career highlights'
    }),
    defineField({
      name: 'yearsOfExperience',
      type: 'number',
      title: 'Years of Experience'
    }),
    defineField({
      name: 'currentRole',
      type: 'string',
      title: 'Current Role'
    }),

    // Education
    defineField({
      name: 'education',
      type: 'array',
      title: 'Education',
      description: 'Your educational background',
      of: [{
        type: 'object',
        fields: [
          { name: 'degree', type: 'string', title: 'Degree/Program' },
          { name: 'institution', type: 'string', title: 'Institution' },
          { name: 'year', type: 'string', title: 'Year/Graduation' },
          { name: 'description', type: 'text', title: 'Description (optional)' }
        ]
      }]
    }),
    defineField({
      name: 'availability',
      type: 'string',
      title: 'Availability Status',
      options: {
        list: [
          { title: 'Available for work', value: 'available' },
          { title: 'Open to opportunities', value: 'open' },
          { title: 'Not available', value: 'unavailable' }
        ]
      }
    }),

    // Resume & Downloads
    defineField({
      name: 'resume',
      type: 'file',
      title: 'Resume/CV',
      description: 'Upload your resume or CV file'
    }),
    defineField({
      name: 'resumeUrl',
      type: 'url',
      title: 'Resume URL',
      description: 'Link to your resume if hosted externally'
    }),

    // Languages & Certifications
    defineField({
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'language', type: 'string', title: 'Language' },
          { name: 'proficiency', type: 'string', title: 'Proficiency', options: {
            list: ['Native', 'Fluent', 'Conversational', 'Basic']
          }}
        ]
      }]
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Certification Name' },
          { name: 'issuer', type: 'string', title: 'Issuing Organization' },
          { name: 'date', type: 'date', title: 'Date Obtained' },
          { name: 'url', type: 'url', title: 'Certificate URL' }
        ]
      }]
    }),

    // Featured Projects (Reference to projects)
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
      description: 'Select your top 3-6 projects to showcase on the homepage'
    }),

    // Contact Preferences
    defineField({
      name: 'contactPreferences',
      type: 'object',
      title: 'Contact Preferences',
      fields: [
        { name: 'preferredMethod', type: 'string', title: 'Preferred Contact Method', options: {
          list: ['Email', 'LinkedIn', 'Twitter', 'Phone']
        }},
        { name: 'responseTime', type: 'string', title: 'Typical Response Time', options: {
          list: ['Within 24 hours', 'Within 48 hours', 'Within a week']
        }}
      ]
    })
  ]
})