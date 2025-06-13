// collections/Users.ts
import { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    forgotPassword: {
      generateEmailHTML: ({ req, token, user } = {}) => {
        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `https://misessource.netlify.app/reset-password?token=${token}`

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Setze das Passwort zurück:</h1>
              <p>Hello, ${user.email}!</p>
              <p>Klicke unten auf den Link, um das Passwort zu resetten.</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
            </body>
          </html>
        `
      },
    },
  },
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
	  access: {
	    update: ({ req }) => req.user?.role === 'admin',
	  },
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