import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
	access: {
	  read: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
	  update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
	  delete: ({ req }) => req.user?.role === 'admin',
	},
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
