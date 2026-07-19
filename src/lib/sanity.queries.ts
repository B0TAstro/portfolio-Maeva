import { defineQuery } from "groq";
import { sanityClient } from "./sanity.client";
import type { HomePage } from "../types/sanity";

const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "home"][0]{
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
      _id,
      title,
      "slug": slug.current,
      category,
      description,
      coverImage{
        asset->{_id, url},
        alt,
        crop,
        hotspot
      },
      url
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
