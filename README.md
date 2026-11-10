# benlattimore.com — Sanity Studio

Content studio for [benlattimore.com](https://www.benlattimore.com). Project `9cci858w`, dataset `production`. The site itself is the companion `ben-lattimore-frontend` repo.

## Development

```bash
npm install
npm run dev          # Studio at http://localhost:3333
npm run build
npm run lint
npm run deploy       # deploy the Studio to Sanity hosting
```

## Schemas (`schemaTypes/`)

- `home`: the single home-page document (intro text, LinkedIn, email)
- `project`: portfolio entries. A project with a `body` gets its own page at `/projects/[slug]`
- `article`: long-form writing at `/writing/[slug]`
- `richText.ts`: the block set shared by project and article bodies

When you change a schema, update the matching query in the frontend's `src/lib/queries.ts` and its types in `src/types`.
