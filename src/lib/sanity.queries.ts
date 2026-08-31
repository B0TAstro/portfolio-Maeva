import { defineQuery } from "groq";
import { sanityClient } from "sanity:client";
import type { HomePage, Project } from "../types/sanity";

const PROJECT_CARD_FIELDS = defineQuery(`
  _id,
  title,
  "slug": slug.current,
  category,
  year,
  subtitle,
  description,
  coverImage{
    asset->{_id, url},
    alt,
    crop,
    hotspot
  },
  url
`);

const PROJECT_DETAIL_FIELDS = defineQuery(`
  ${PROJECT_CARD_FIELDS},
  paragraph,
  gallery[]{
    asset->{_id, url},
    alt,
    caption,
    crop,
    hotspot
  }
`);

const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    title,
    heroTitle,
    heroSubtitle,
    heroImage{
      asset->{_id, url},
      alt,
      crop,
      hotspot
    },
    aboutTitle,
    aboutText,
    selectedProjects[]->{
      ${PROJECT_CARD_FIELDS}
    },
    contactTitle,
    contactEmail,
    socialLinks[]{
      _key,
      label,
      url
    }
  }
`);

export async function getHomePage() {
  return sanityClient.fetch<HomePage | null>(HOME_PAGE_QUERY);
}

const PROJECTS_QUERY = defineQuery(`
  *[_type == "projectPage" && defined(slug.current)] | order(_createdAt desc){
    ${PROJECT_CARD_FIELDS}
  }
`);

const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "projectPage" && defined(slug.current)]{
    "slug": slug.current
  }
`);

const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "projectPage" && slug.current == $slug][0]{
    ${PROJECT_DETAIL_FIELDS}
  }
`);

export async function getProjects() {
  return sanityClient.fetch<Project[]>(PROJECTS_QUERY);
}

export async function getProjectSlugs() {
  return sanityClient.fetch<Array<{ slug: string }>>(PROJECT_SLUGS_QUERY);
}

export async function getProjectBySlug(slug: string) {
  return sanityClient.fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug });
}
