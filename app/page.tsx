import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Skills } from "@/sections/skills";
import { Projects } from "@/sections/projects";
import { Experience } from "@/sections/experience";
import { Education } from "@/sections/education";
import { Contact } from "@/sections/contact";
import { Footer } from "@/sections/footer";
import {
  getSkills,
  getProjects,
  getExperience,
  getEducation,
} from "@/lib/data";
import { profile } from "@/data/content";
import Script from "next/script";

export const revalidate = 3600;

export default async function Home() {
  const [skills, projects, experience, education] = await Promise.all([
    getSkills(),
    getProjects(),
    getExperience(),
    getEducation(),
  ]);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.titles[0],
    description: profile.bio,
    email: `mailto:${profile.email}`,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    sameAs: [
      "https://github.com/hzahra55",
      "https://www.linkedin.com/in/hudazahraa/",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
  };

  return (
    <>
      <Script
        id="ld-person"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <About />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Education education={education} />
      <Contact />
      <Footer />
    </>
  );
}
