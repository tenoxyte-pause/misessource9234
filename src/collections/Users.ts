import { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    forgotPassword: {
      generateEmailHTML: async ({ token, user } = {}) => {
        return `
          <h4>Misessource // Passwort zurücksetzen</h4>
          <p>Sehr geehrter ${user.email},</p>
          <p>klicke auf diesen Link, um dein Passwort zurückzusetzen:</p>
          <a href="https://misessource.netlify.app/reset-password?token=${token}">
            Passwort zurücksetzen
          </a>
        `;
      },
      generateEmailSubject: () => 'Passwort zurücksetzen',
    },
  },
  admin: { useAsTitle: 'email' },

  access: {
    create: () => true,
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
    },
    {
      name: 'monthly',
      type: 'select',
      admin: { isClearable: true },
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
        if (operation === 'create' && !data.role) {
          data.role = 'user';
        }
        return data;
      },
    ],
  },
};

export default Users;
