import { CollectionConfig } from 'payload';

const Shop: CollectionConfig = {
  slug: 'shop',
  admin: {
    // Verstecke Collection für Nicht-Admins im Admin Panel
    hidden: ({ user }) => user?.role !== 'admin',
  },
  fields: [
    {
      name: 'produktId',
      type: 'text',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        readOnly: true,
      },
    },
		{
		  name: 'status',
		  type: 'select',
		  options: ['open', 'ordered', 'paid', 'delivered', 'cancelled'],
		  defaultValue: 'open',
		  required: true,
		},
		{
		  name: 'downloadLink',
		  type: 'text',
		  required: false,
				  access: {
				    read: () => true, // ← GANZ WICHTIG: öffentlich lesbar
				  },
		  admin: {
		    condition: (data) => data.status === 'paid' || data.status === 'delivered',
		  }
		},
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Nur bei Erstellung prüfen
        if (req.user && operation === 'create') {
          const result = await req.payload.find({
            collection: 'shop', // kein TypeScript-Typing nötig hier
            where: {
              user: { equals: req.user.id },
              status: { equals: 'open' },
            },
            limit: 0, // zählt alle passenden Einträge
          });

          if (result.totalDocs >= 13) {
            throw new Error('Du hast bereits die maximale Anzahl an offenen Bestellungen erreicht (100).');
          }

          // Setze User- & E-Mail-Feld automatisch
          data.user = req.user.id;
          data.email = req.user.email;
        }

        return data;
      },
    ],
  },
};

export default Shop;
