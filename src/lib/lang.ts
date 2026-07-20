// Map a tech name to explicit Tailwind classes for color-coded pill badges.
// Classes are static strings so Tailwind JIT can detect them.
const map: Record<string, string> = {
    python: "bg-lang-python/10 text-lang-python border-lang-python/30",
    java: "bg-lang-java/10 text-lang-java border-lang-java/30",
    "spring boot": "bg-lang-java/10 text-lang-java border-lang-java/30",
    "c#": "bg-lang-csharp/10 text-lang-csharp border-lang-csharp/30",
    ".net": "bg-lang-csharp/10 text-lang-csharp border-lang-csharp/30",
    "asp.net": "bg-lang-csharp/10 text-lang-csharp border-lang-csharp/30",
    javascript: "bg-lang-js/10 text-lang-js border-lang-js/30",
    js: "bg-lang-js/10 text-lang-js border-lang-js/30",
    typescript: "bg-lang-ts/10 text-lang-ts border-lang-ts/30",
    ts: "bg-lang-ts/10 text-lang-ts border-lang-ts/30",
    go: "bg-lang-go/10 text-lang-go border-lang-go/30",
};

export function langClass(tech: string) {
    return map[tech.toLowerCase()] || "bg-secondary text-secondary-foreground border-border";
}

export const categoryColor: Record<string, string> = {
    Python: "bg-lang-python",
    "Java & JVM": "bg-lang-java",
    "C# & .NET": "bg-lang-csharp",
    JavaScript: "bg-lang-js",
    "Web Dev": "bg-primary",
    "Software Engineering": "bg-primary-glow",
    Business: "bg-success",
    "Content Creation": "bg-lang-csharp",
};