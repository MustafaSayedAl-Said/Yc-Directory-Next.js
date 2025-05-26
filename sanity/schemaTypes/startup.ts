import { Quote, UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const startup = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: 'title'
            }
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "author" }],
        }),
        defineField({
            name: "views",
            title: "Views",
            type: "number",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            validation: (Rule) => Rule.min(3).max(20).required().error("Category is required"),
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "url",
            validation: (Rule) => Rule.uri({
                allowRelative: false,
                scheme: ['http', 'https']
            }).error("Image URL is required"),
        }),
        defineField({
            name: "pitch",
            title: "Pitch",
            type: "markdown",
        }),
    ],

})