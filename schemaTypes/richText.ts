import {defineArrayMember} from 'sanity'

// Rich-text block set shared by article and project bodies.
// The frontend renders these in two places, so a new block type here also needs
// adding to frontend/src/components/portableTextComponents.tsx (page rendering)
// and frontend/src/lib/portableTextToMarkdown.ts (Markdown download).
export const richTextBlocks = [
  defineArrayMember({
    type: 'block',
    styles: [
      {title: 'Normal', value: 'normal'},
      {title: 'H2', value: 'h2'},
      {title: 'H3', value: 'h3'},
      {title: 'Quote', value: 'blockquote'},
    ],
    lists: [
      {title: 'Bullet', value: 'bullet'},
      {title: 'Numbered', value: 'number'},
    ],
    marks: {
      decorators: [
        {title: 'Strong', value: 'strong'},
        {title: 'Emphasis', value: 'em'},
        {title: 'Code', value: 'code'},
      ],
      annotations: [
        {
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [{name: 'href', type: 'url', title: 'URL'}],
        },
      ],
    },
  }),
  defineArrayMember({
    type: 'image',
    options: {hotspot: true},
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alt text',
        description: 'Describe the image for screen readers and SEO.',
      },
      {name: 'caption', type: 'string', title: 'Caption'},
    ],
  }),
  defineArrayMember({
    type: 'object',
    name: 'divider',
    title: 'Divider',
    fields: [{name: 'variant', type: 'string', hidden: true, initialValue: 'line'}],
    preview: {
      prepare: () => ({title: '— — — — — —', subtitle: 'Section divider'}),
    },
  }),
]
