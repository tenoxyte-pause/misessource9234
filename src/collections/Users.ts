// collections/Users.ts
import { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  access: {
    create: () => true, // Jeder darf sich registrieren
    read: ({ req, id }) =>
      req.user?.role === 'admin' || req.user?.id === id,

    update: ({ req, id }) =>
      req.user?.role === 'admin' || req.user?.id === id,

    delete: ({ req, id }) =>
      req.user?.role === 'admin' || req.user?.id === id,
  },

  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: false,
    },
    {
      name: 'monthly',
      admin: {
        isClearable: true,
      },
      type: 'select',
      options: ['1', '2', '3'],
    },
    {
      name: 'role',
      type: 'select',
      options: ['user', 'admin'],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          if (!data.role) {
            data.role = 'user';
          }
        }
        return data;
      },
    ],
  },
}

export default Users