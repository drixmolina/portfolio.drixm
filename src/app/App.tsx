import { useEffect, useState } from "react";
import { Navbar } from "../components/navigation/Navbar";
import type { Theme } from "../components/navigation/ThemeToggle";
import {
  AboutSection,
  ContactSection,
  CredentialsSection,
  ExperienceSection,
  FaciliteaseCaseStudy,
  Footer,
  HeroSection,
  SelectedWorkSection,
  SkillsSection,
} from "../components/sections/PortfolioSections";

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("portfolio-theme", theme);
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f3f1ed" : "#070707");
  }, [theme]);

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar
        theme={theme}
        onThemeToggle={() =>
          setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
        }
      />
      <main id="main-content">
        <HeroSection />
        <SelectedWorkSection />
        <FaciliteaseCaseStudy />
        <ExperienceSection />
        <AboutSection />
        <SkillsSection />
        <CredentialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
