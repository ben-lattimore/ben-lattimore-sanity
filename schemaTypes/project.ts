import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'clientName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional second line shown under the client name on the detail page.',
    }),
    defineField({
      name: 'technologyUsed',
      title: 'Technology Used',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Live link to the project. Optional if a body write-up is provided.',
      validation: (Rule) =>
        Rule.custom((url, context) => {
          const body = (context.document?.body as unknown[]) ?? [];
          if (!url && body.length === 0) {
            return 'A project must have either a live URL or a body write-up (or both).';
          }
          return true;
        }),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'Optional 100–400 word write-up. If present, the project card links to a detail page at /projects/[slug].',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Describe the image for screen readers and SEO.',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'object',
          name: 'divider',
          title: 'Divider',
          fields: [
            {
              name: 'variant',
              type: 'string',
              hidden: true,
              initialValue: 'line',
            },
          ],
          preview: {
            prepare: () => ({ title: '— — — — — —', subtitle: 'Section divider' }),
          },
        },
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Colour',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex code'),
    }),
    defineField({
      name: 'reverseTextColor',
      title: 'Reverse Colour of Text',
      type: 'boolean',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI', value: 'AI' },
          { title: 'Web Development', value: 'Web Development' }
        ],
        layout: 'radio'
      },
      initialValue: 'AI',
      validation: (Rule) => Rule.required()
    }),
  ],
  orderings: [
    {
      title: 'Client (A–Z)',
      name: 'clientAsc',
      by: [{ field: 'clientName', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'category',
    },
  },
})
