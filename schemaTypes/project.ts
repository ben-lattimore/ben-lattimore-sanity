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
      name: 'projectImages',
      title: 'Carousel of Project Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ],
})
