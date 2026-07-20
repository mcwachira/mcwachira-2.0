import type { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Services from "@/components/Home/Services";
import ZohoCRM from "@/components/Home/ZohoCRM";
import Testimonials from "@/components/Home/Testimonials";
import Blog from "@/components/Home/Blog";
import Contact from "@/components/Home/Contact";

export const metadata: Metadata = {
  title: "Fullstack Developer — Python, Java, React",
  description:
    "Senior fullstack developer based in Nairobi. I build scalable, production-ready web apps and APIs.",
  keywords: [
    "fullstack developer kenya",
    "python developer nairobi",
    "react developer kenya",
    "java developer kenya",
  ],

  openGraph: {
    title: "Fullstack Developer | Mcwachira",
    description:
      "Building production-grade software systems for modern businesses.",
    url: "https://mcwachira.com",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero/>
      <About/>
      <Services/>
      <ZohoCRM/>
      <Testimonials/>
      <Blog/>
        <Contact/>

      {/*<Hero />*/}
    </>
  );
}
