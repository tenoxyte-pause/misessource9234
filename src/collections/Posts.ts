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

const Posts: CollectionConfig = {
  slug: "posts",
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
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
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
      required: true,
    },
  ],
};

export default Posts;