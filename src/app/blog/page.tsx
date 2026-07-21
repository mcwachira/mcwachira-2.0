import { Suspense } from "react";
import BlogClient from "@/components/blog/BlogClient";
import { getAllBlogs } from "@/lib/sanity/queries";

export const revalidate = 60; // ISR

export default async function BlogPage() {
    const blogs = await getAllBlogs();

    return (
        <Suspense fallback={<div className="pt-32 text-muted-foreground">Loading articles…</div>}>
            <BlogClient blogs={blogs} />
        </Suspense>
    );
}