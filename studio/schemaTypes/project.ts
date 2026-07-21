import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().unique(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required().min(10).max(300),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          {title: 'Technology', value: 'technology'},
          {title: 'Healthcare', value: 'healthcare'},
          {title: 'Finance', value: 'finance'},
          {title: 'E-commerce', value: 'ecommerce'},
          {title: 'Education', value: 'education'},
          {title: 'Media', value: 'media'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g., 2024',
    }),
    defineField({
      name: 'duration',
      title: 'Project Duration',
      type: 'string',
      description: 'e.g., "3 months"',
    }),
    defineField({
      name: 'role',
      title: 'Your Role',
      type: 'string',
      description: 'e.g., "Lead Developer", "UI/UX Designer"',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'Web Development', value: 'web-development'},
          {title: 'Mobile App', value: 'mobile-app'},
          {title: 'Design', value: 'design'},
          {title: 'Full Stack', value: 'full-stack'},
          {title: 'Backend', value: 'backend'},
          {title: 'Frontend', value: 'frontend'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'tech',
      title: 'Technologies Used',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'results',
      title: 'Key Results',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'e.g., "40% increase in conversion", "Reduced load time by 50%"',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      description: 'What was the main problem or challenge?',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      description: 'How did you solve it?',
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
          validation: (rule) => rule.max(500),
        }),
        defineField({
          name: 'name',
          title: 'Client Name',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Client Title/Role',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'related',
      title: 'Related Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'project'},
        },
      ],
      description: 'Link to similar or related projects',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show this project on the homepage',
    }),
    defineField({
      name: 'body',
      title: 'Project Details',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'cover',
    },
  },
})
