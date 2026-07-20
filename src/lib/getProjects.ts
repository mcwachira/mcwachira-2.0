import projectsData from "@/content/projects.json";

export interface Project {
    slug: string;
    title: string;
    category: string;
    description: string;
    challenge?: string;
    solution?: string;
    results: string[];
    tech: string[];
    year?: string;
    duration?: string;
    role?: string;
    client?: string;
    industry?: string;
    gallery?: string[];
    testimonial?: { quote: string; name?: string; title?: string };
    related?: string[];
}

const projects: Project[] = projectsData as Project[];

export const getProjects = (): Project[] => projects;

export const getProject = (slug: string): Project | undefined =>
    projects.find((p) => p.slug === slug);
