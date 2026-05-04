"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider/ThemeProvider";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border"
          : "py-5"
      }`}
    >
      <nav className="container-tight flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="home">
          <div className="w-10 h-10 rounded-lg border-2 border-border flex items-center justify-center font-display font-bold text-foreground">
            mc
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className={`text-sm transition-colors relative py-1 ${
                isActive(l.href)
                  ? "text-foreground after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-primary after:rounded-full"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
          >
            <span className="relative w-4 h-4 inline-block">
              <Sun
                size={18}
                className={`absolute inset-0 transition-all duration-300 ${
                  theme === "dark"
                    ? "rotate-0 opacity-100"
                    : "rotate-90 opacity-0"
                }`}
              />
              <Moon
                size={18}
                className={`absolute inset-0 transition-all duration-300 ${
                  theme === "light"
                    ? "rotate-0 opacity-100"
                    : "-rotate-90 opacity-0"
                }`}
              />
            </span>
          </button>

          <Button asChild size="sm" className="rounded-full font-medium">
            <Link href="/contact">Book a free call</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-0 bg-background/98 backdrop-blur-xl transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="container-tight pt-24 pb-12 flex flex-col gap-6 h-full overflow-y-auto">
          {links.map((l, i) => (
            <Link
              key={l.name}
              href={l.href}
              className={`text-3xl font-display font-semibold transition-colors ${
                isActive(l.href) ? "text-primary" : "text-foreground"
              }`}
              style={{ animation: `float-up 0.4s ${i * 0.05}s backwards` }}
            >
              {l.name}
            </Link>
          ))}

          <div className="pt-6 border-t border-border flex flex-wrap gap-2">
            {["Python", "Java", "C#", "JS", "React"].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full border border-border bg-card text-xs font-mono text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
            Available for freelance work
          </div>

          <div className="flex gap-3 items-center">
            <Button asChild className="rounded-full flex-1">
              <Link href="/contact">Book a free call</Link>
            </Button>

            <Button
              onClick={toggle}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>

          <div className="flex gap-4 text-muted-foreground pt-4">
            <Link href="#" aria-label="GitHub">
              <FaGithub size={20} />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
