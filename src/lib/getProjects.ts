import projects from "@/content/projects.json";

export const getProjects = () => projects;

export const getProject = (slug: string) =>
    projects.find((p) => p.slug === slug);