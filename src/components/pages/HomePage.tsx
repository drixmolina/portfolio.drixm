import {
  ContactSection,
  CredentialsSection,
  ExperienceSection,
  HeroSection,
  SelectedWorkSection,
  SkillsSection,
} from "../sections/PortfolioSections";
import { profile, projects } from "../../data/portfolioData";
import { Seo } from "../ui/Seo";

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${profile.websiteUrl}#person`,
      name: profile.name,
      alternateName: profile.professionalName,
      jobTitle: profile.currentEmployment.role,
      url: profile.websiteUrl,
      image: `${profile.websiteUrl}profile/drix-portrait-new.png`,
      email: `mailto:${profile.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Caloocan",
        addressRegion: "Metro Manila",
        addressCountry: "PH",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: profile.education.school,
      },
      worksFor: {
        "@type": "Organization",
        name: profile.currentEmployment.organization,
      },
      sameAs: [profile.githubUrl, profile.linkedinUrl],
      knowsAbout: [
        "React",
        "TypeScript",
        "PHP",
        "MySQL",
        "Web accessibility",
        "Responsive web design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${profile.websiteUrl}#website`,
      name: "Drix Molina Portfolio",
      url: profile.websiteUrl,
      author: { "@id": `${profile.websiteUrl}#person` },
      hasPart: projects.map((project) => ({
        "@type": "CreativeWork",
        name: project.title,
        url: `${profile.websiteUrl}work/${project.slug}`,
      })),
    },
  ],
};

export function HomePage() {
  return (
    <>
      <Seo
        title="Drix Molina - Full-Stack Developer"
        description="Portfolio of Drix Molina, a full-stack developer in the Philippines building accessible React interfaces and dependable PHP/MySQL workflows."
        structuredData={homeStructuredData}
      />
      <main id="main-content">
        <HeroSection />
        <SelectedWorkSection />
        <ExperienceSection />
        <SkillsSection />
        <CredentialsSection />
        <ContactSection />
      </main>
    </>
  );
}
