import { getProject, getProjects } from "@/lib/getProjects";
import { notFound } from "next/navigation";
import ParallaxImage from "@/components/Projects/ParallaxImage";

export async function generateStaticParams() {
    const projects = getProjects();
    return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({ params }: { params: any | Promise<any> }) {
    const { slug } = await params;
    const project = getProject(slug as string);

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

                {/* PARALLAX IMAGE (client component) */}
                <ParallaxImage>
                    <div className="aspect-[16/8] rounded-3xl border bg-gradient-card flex items-center justify-center text-5xl text-muted-foreground/30">
                        {project.title}
                    </div>
                </ParallaxImage>

                {/* CHALLENGE / SOLUTION */}
                <div className="grid md:grid-cols-2 gap-8 my-16">
                    {[["Challenge", project.challenge], ["Solution", project.solution]].map(
                        ([title, content], i) => (
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

                {/* GALLERY */}
                {project.gallery && (
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {project.gallery.map((_, i) => (
                            <div
                                key={i}
                                className="aspect-video rounded-2xl border bg-gradient-card flex items-center justify-center text-muted-foreground/30"
                            >
                                Screen {i + 1}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}