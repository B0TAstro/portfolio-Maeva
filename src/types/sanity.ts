import type { SanityImageSource } from "@sanity/image-url";

export type SanityImage = SanityImageSource & {
  alt?: string | null;
};

export type Project = {
  _id: string;
  title: string;
  slug?: string;
  category?: string;
  description?: string;
  coverImage?: SanityImage;
  url?: string;
};

export type SocialLink = {
  _key: string;
  label: string;
  url: string;
};

export type HomePage = {
  _id: string;
  title?: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  aboutTitle: string;
  aboutText: string;
  selectedProjects?: Project[];
  contactTitle?: string;
  contactEmail?: string;
  socialLinks?: SocialLink[];
};
