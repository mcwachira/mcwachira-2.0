import { sanityClient } from "./client";

export type SanityImage = {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
};

export type PortableTextBlock = Record<string, unknown>;

export type BlogPost = {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: SanityImage;
    content?: PortableTextBlock[];
    categories?: { _id: string; title: string; slug: string; color?: string }[];
    tags?: string[];
    publishedAt?: string;
    readingTime?: number;
    isFeatured?: boolean;
    status?: "draft" | "published";
    seo?: { metaTitle?: string; metaDescription?: string };
};

export type Project = {
    _id: string;
    title: string;
    slug: string;
    summary?: string;
    category: string;
    coverImage?: SanityImage;
    gallery?: SanityImage[];
    techStack?: string[];
    challenge?: PortableTextBlock[];
    solution?: PortableTextBlock[];
    result?: PortableTextBlock[];
    metrics?: string[];
    featured?: boolean;
    links?: { liveUrl?: string; githubUrl?: string };
    client?: string;
    industry?: string;
    year?: string;
    duration?: string;
    role?: string;
    status?: "draft" | "published";
    createdAt?: string;
    seo?: { metaTitle?: string; metaDescription?: string };
};

export type Category = {
    _id: string;
    title: string;
    slug: string;
    color?: string;
    description?: string;
};

const postProjection = `{
  _id, title, "slug": slug.current, excerpt, coverImage, content,
  "categories": categories[]->{ _id, title, "slug": slug.current, color },
  tags, publishedAt, readingTime, isFeatured, status, seo
}`;

const projectProjection = `{
  _id, title, "slug": slug.current, summary, category, coverImage, gallery,
  techStack, challenge, solution, result, metrics, featured, links,
  client, industry, year, duration, role, status, createdAt, seo
}`;

export async function getAllPosts(): Promise<BlogPost[]> {
    return sanityClient.fetch(
        `*[_type == "blogPost" && status == "published"] | order(publishedAt desc) ${postProjection}`,
    );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    return sanityClient.fetch(
        `*[_type == "blogPost" && slug.current == $slug && status == "published"][0] ${postProjection}`,
        { slug },
    );
}

export async function getAllProjects(): Promise<Project[]> {
    return sanityClient.fetch(
        `*[_type == "project" && status == "published"] | order(coalesce(year, createdAt) desc) ${projectProjection}`,
    );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    return sanityClient.fetch(
        `*[_type == "project" && slug.current == $slug && status == "published"][0] ${projectProjection}`,
        { slug },
    );
}

export async function getAllCategories(): Promise<Category[]> {
    return sanityClient.fetch(
        `*[_type == "category"] | order(title asc) { _id, title, "slug": slug.current, color, description }`,
    );
}
