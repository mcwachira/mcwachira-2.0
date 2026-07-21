import { sanityClient } from "./client";

export type SanityImage = {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
};

export type PortableTextBlock = Record<string, unknown>;

// Legacy BlogPost type (from old "blogPost" schema)
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

// New Blog type (from "blog" schema)
export type Blog = {
    _id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    date: string;
    readingTime?: string;
    cover?: SanityImage;
    tags?: string[];
    featured?: boolean;
    body?: PortableTextBlock[];
};

export type Project = {
    _id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    cover?: SanityImage;
    client?: string;
    industry?: string;
    year?: string;
    duration?: string;
    role?: string;
    tech?: string[];
    results?: string[];
    challenge?: string;
    solution?: string;
    gallery?: SanityImage[];
    testimonial?: {
        quote?: string;
        name?: string;
        title?: string;
    };
    related?: { _key: string; _ref: string }[];
    featured?: boolean;
    body?: PortableTextBlock[];
};

export type Category = {
    _id: string;
    title: string;
    slug: string;
    color?: string;
    description?: string;
};

// LEGACY QUERIES (for old "blogPost" schema if needed)
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

// LEGACY FUNCTIONS
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

export async function getAllCategories(): Promise<Category[]> {
    return sanityClient.fetch(
        `*[_type == "category"] | order(title asc) { _id, title, "slug": slug.current, color, description }`,
    );
}

// NEW BLOG QUERIES (for "blog" schema)
export async function getAllBlogs(): Promise<Blog[]> {
    return sanityClient.fetch(
        `*[_type == "blog"] | order(date desc) {
            _id,
            title,
            "slug": slug.current,
            description,
            category,
            date,
            readingTime,
            cover,
            tags,
            featured
        }`,
    );
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    return sanityClient.fetch(
        `*[_type == "blog" && slug.current == $slug][0] {
            _id,
            title,
            "slug": slug.current,
            description,
            category,
            date,
            readingTime,
            cover,
            tags,
            featured,
            body
        }`,
        { slug },
    );
}

// NEW PROJECT QUERIES (for "project" schema)
export async function getAllProjectsFromSanity(): Promise<Project[]> {
    return sanityClient.fetch(
        `*[_type == "project"] | order(year desc) {
            _id,
            title,
            "slug": slug.current,
            description,
            category,
            cover,
            client,
            industry,
            year,
            duration,
            role,
            tech,
            results,
            featured
        }`,
    );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    return sanityClient.fetch(
        `*[_type == "project" && slug.current == $slug][0] {
            _id,
            title,
            "slug": slug.current,
            description,
            category,
            cover,
            client,
            industry,
            year,
            duration,
            role,
            tech,
            results,
            challenge,
            solution,
            gallery,
            testimonial,
            related,
            featured,
            body
        }`,
        { slug },
    );
}
