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
})
