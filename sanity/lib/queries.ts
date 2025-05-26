
import { defineQuery, groq } from "next-sanity";
import { client } from "../lib/client";
import { useQuery } from "react-query";


export const STARTUPS_QUERY = groq`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id,
  title,
  slug, 
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image
}`;

export async function GET_STARTUPS() {
  return await client.fetch(STARTUPS_QUERY);
}


export const STARTUP_BY_ID_QUERY = defineQuery(`*[_type == "startup" && _id == $id ][0] {
  _id,
  title,
  slug, 
  _createdAt,
  author -> {
    _id, name, username, image, bio
  },
  views,
  description,
  category,
  image,
  pitch
}`);

export const STARTUP_VIEWS_QUERY = defineQuery(`*[_type == "startup" && _id == $id ][0] {
  _id, views
  }
  `
);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`*[_type == "author" && id == $id][0] {
  _id,
  id,
  name,
  username,
  email,
  image,
  bio,
  }`);

  export const AUTHOR_BY_ID_QUERY = defineQuery(`*[_type == "author" && _id == $id][0] {
  _id,
  id,
  name,
  username,
  email,
  image,
  bio,
  }`);

  export const STARTUPS_BY_AUTHOR = groq`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
  _id,
  title,
  slug, 
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image
}`;