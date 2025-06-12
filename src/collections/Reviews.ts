import type { HTMLConvertersFunction } from '@payloadcms/richtext-lexical/html'
import { CollectionConfig } from "payload";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  lexicalHTMLField,
} from '@payloadcms/richtext-lexical'

const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "title",
  },
	access: {
	  read: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
	  update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
	  delete: ({ req }) => req.user?.role === 'admin',
	},

  fields: [
		{
		  type: 'row',
		  fields: [
	    {
	      name: "title",
	      type: "text",
	      required: false,
	    },
	    {
	      name: "description",
	      type: "text",
	      required: false,
	    },
		  ],
		},
		{
		  type: 'row',
		  fields: [
		    {
		      name: "banner",
		      type: "text",
		      required: false,
		    },
		    {
		      name: "bannerfallback",
		      type: "text",
		      required: false,
		    },
		  ],
		},
    {
      type: 'tabs',
      tabs: [
        {
		label: 'Images',
		  fields: [
    {
      name: 'images', // required
      type: 'array', // required
      label: 'Light',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Light',
        plural: 'Lights',
      },
      fields: [
        // required
        {
          name: 'mobile',
          type: 'text',
        },
        {
          name: 'desktop',
          type: 'text',
        },
        {
          name: 'alt',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
		  ],
        },
        {
		label: 'Content',
		  fields: [
			{
			  name: 'content',
			  label: false,
			  required: true,
			  type: 'richText',
			  editor: lexicalEditor({
				features: ({ rootFeatures }) => {
				  return [
					...rootFeatures,
					HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
					FixedToolbarFeature(),
					InlineToolbarFeature(),
					HorizontalRuleFeature(),
				  ]
				},
			  }),
			},
			lexicalHTMLField({
			  htmlFieldName: 'content_html',
			  lexicalFieldName: 'content',
			}),
		  ],
        },
      ],
    },
    {
      name: "slug",
      type: "text",
      required: false,
    },
  ],
};

export default Reviews;