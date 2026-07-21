import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectsFromSanity } from "@/lib/sanity/queries";
import ParallaxImage from "@/components/Projects/ParallaxImage";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";

export const revalidate = 60;

export async function generateStaticParams() {
    const projects = await getAllProjectsFromSanity();
    return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) return notFound();

    return (
        <article className="pt-32 pb-20 px-4">
            <div className="container-tight">

                {/* HERO */}
                <div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        {project.title}
                    </h1>

                    <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
                        {project.description}
                    </p>

                    {/* META */}
                    <div className="flex flex-wrap gap-2 mb-6 text-xs">
                        {[project.client, project.year, project.role]
                            .filter(Boolean)
                            .map((m) => (
                                <span
                                    key={m}
                                    className="px-3 py-1 rounded-full border bg-card text-muted-foreground"
                                >
                  {m}
                </span>
                            ))}
                    </div>
                </div>

                {/* COVER IMAGE */}
                {project.cover && (
                    <ParallaxImage>
                        <div className="aspect-[16/8] rounded-3xl border overflow-hidden">
                            <Image
                                src={urlFor(project.cover).width(1200).auto("format").url()}
                                alt={project.cover.alt || project.title}
                                width={1200}
                                height={600}
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                    </ParallaxImage>
                )}

                {/* CHALLENGE / SOLUTION */}
                <div className="grid md:grid-cols-2 gap-8 my-16">
                    {[["Challenge", project.challenge], ["Solution", project.solution]].map(
                        ([title, content]) => (
                            <div
                                key={title}
                                className="p-8 border rounded-2xl bg-card hover:shadow-lg transition"
                            >
                                <h2 className="text-2xl font-bold mb-3">{title}</h2>
                                <p className="text-muted-foreground">{content}</p>
                            </div>
                        )
                    )}
                </div>

                {/* RESULTS BAR */}
                {project.results && project.results.length > 0 && (
                    <div className="bg-primary text-primary-foreground rounded-2xl p-10 mb-16">
                        <h2 className="text-2xl font-bold mb-6">
                            The numbers that matter.
                        </h2>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {project.results.map((r: string) => (
                                <div
                                    key={r}
                                    className="bg-white/10 p-6 rounded-xl font-bold"
                                >
                                    {r}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* GALLERY */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {project.gallery.map((img, _i) => (
                            <div
                                key={_i}
                                className="aspect-video rounded-2xl border overflow-hidden"
                            >
                                <Image
                                    src={urlFor(img).width(800).auto("format").url()}
                                    alt={img.alt || `${project.title} screenshot ${_i + 1}`}
                                    width={800}
                                    height={450}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}
