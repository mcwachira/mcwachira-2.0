import { Suspense } from "react";
import { getAllProjectsFromSanity } from "@/lib/sanity/queries";
import WorkClient from "@/components/Projects/WorkClient";

export const revalidate = 60;

export default async function WorkPage() {
    const projects = await getAllProjectsFromSanity();
    console.log("projects", projects)
    return (
        <Suspense fallback={<div className="pt-32 text-muted-foreground">Loading projects…</div>}>
            <WorkClient projects={projects} />
        </Suspense>
    );
}
