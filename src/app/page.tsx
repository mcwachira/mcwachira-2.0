import type { Metadata } from "next";
import HomeClient from "@/components/Home/HomeClient";
import Hero from "@/components/Home/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import ZohoCRM from "@/components/ZohoCRM";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

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
