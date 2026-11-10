import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fieldsets: [
    {
      name: 'profile',
      title: 'Search & AI profile',
      description:
        'Not shown on the page. Describes you to search engines and AI tools (schema.org Person data on the home page, and /llms.txt).',
      options: { collapsible: true, collapsed: false },
    },
  ],
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
    defineField({
      name: 'jobTitle',
      title: 'Job title',
      type: 'string',
      fieldset: 'profile',
      description: 'How you describe your role, e.g. "Fractional AI Lead".',
    }),
    defineField({
      name: 'knowsAbout',
      title: 'Areas of expertise',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      fieldset: 'profile',
      description:
        'Short topics you want to be associated with, e.g. "AI agents", "LLM applications", "AI strategy".',
    }),
    defineField({
      name: 'sameAs',
      title: 'Other profiles',
      type: 'array',
      of: [defineArrayMember({ type: 'url' })],
      fieldset: 'profile',
      description:
        'Profile URLs beyond LinkedIn (which is included automatically), e.g. GitHub or X. Helps tools recognise these as the same person.',
    }),
  ],
})
