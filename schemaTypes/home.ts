import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'main_text',
      title: 'Main Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) =>
            Rule.regex(
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              {
                name: 'email',
                invert: false,
              }
            ).error('Invalid email address'),
        },
      ],
    }),
  ],
})
