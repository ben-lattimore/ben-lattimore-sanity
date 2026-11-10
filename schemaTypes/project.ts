import {defineField, defineType} from 'sanity'
import {richTextBlocks} from './richText'

const hasBody = (document?: Record<string, unknown>) =>
  Array.isArray(document?.body) && document.body.length > 0

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
      description: 'Only needed if the project has a body write-up (it becomes /projects/[slug]).',
      options: {
        source: 'clientName',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.custom((slug, context) =>
          hasBody(context.document) && !slug?.current
            ? 'A slug is required when the project has a body write-up.'
            : true,
        ),
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
        Rule.custom((url, context) =>
          !url && !hasBody(context.document)
            ? 'A project must have either a live URL or a body write-up (or both).'
            : true,
        ),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description:
        'Optional 100–400 word write-up. If present, the project card links to a detail page at /projects/[slug].',
      of: richTextBlocks,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Colour',
      type: 'string',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex code'),
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
          {title: 'AI', value: 'AI'},
          {title: 'Web Development', value: 'Web Development'},
        ],
        layout: 'radio',
      },
      initialValue: 'AI',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Client (A–Z)',
      name: 'clientAsc',
      by: [{field: 'clientName', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'category',
    },
  },
})
