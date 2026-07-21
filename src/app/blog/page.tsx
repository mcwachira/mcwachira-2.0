import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getAllPosts, type BlogPost } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { categoryColor } from "@/lib/lang";
import { Suspense } from "react";
import BlogClient from "@/components/blog/BlogClient";


export const revalidate = 60; // ISR

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <Suspense fallback={<div className="pt-32 text-muted-foreground">Loading articles…</div>}>
            <BlogClient posts={posts} />
        </Suspense>
    );
}