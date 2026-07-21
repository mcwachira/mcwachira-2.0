import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogs } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60; // ISR

export async function generateStaticParams() {
    const blogs = await getAllBlogs();
    return blogs.map((blog) => ({ slug: blog.slug }));
}

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return { title: "Blog post not found" };
    }

    return {
        title: blog.title,
        description: blog.description,
        openGraph: {
            title: blog.title,
            description: blog.description,
            images: blog.cover
                ? [{ url: urlFor(blog.cover).width(1200).height(630).url() }]
                : [],
        },
    };
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <article className="pt-32 pb-20 px-4">
            <div className="container-tight max-w-3xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition"
                >
                    <ArrowLeft size={16} />
                    Back to all articles
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <p className="text-sm text-primary mb-4">{blog.category}</p>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {blog.title}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-6">
                        {blog.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <time dateTime={blog.date}>
                            {formatDate(blog.date)}
                        </time>
                        {blog.readingTime && (
                            <>
                                <span>•</span>
                                <span>{blog.readingTime}</span>
                            </>
                        )}
                        {blog.tags && blog.tags.length > 0 && (
                            <>
                                <span>•</span>
                                <div className="flex gap-2">
                                    {blog.tags.map((tag) => (
                                        <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </header>

                {/* Cover Image */}
                {blog.cover && (
                    <div className="mb-12 rounded-2xl overflow-hidden border">
                        <Image
                            src={urlFor(blog.cover)
                                .width(800)
                                .auto("format")
                                .url()}
                            alt={blog.cover.alt || blog.title}
                            width={800}
                            height={400}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                )}

                {/* Body Content */}
                {blog.body && (
                    <div className="prose prose-invert max-w-none">
                        {/* 
                          TODO: Implement Portable Text renderer for rich content
                          For now, this is a placeholder for rich text body
                        */}
                        <div className="text-muted-foreground">
                            Rich content body would be rendered here using a Portable Text renderer
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
