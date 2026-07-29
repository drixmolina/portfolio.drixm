import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import { RecruiterAssistant } from "../components/ai/RecruiterAssistant";
import { Navbar } from "../components/navigation/Navbar";
import type { Theme } from "../components/navigation/ThemeToggle";
import { HomePage } from "../components/pages/HomePage";
import { NotFoundPage } from "../components/pages/NotFoundPage";
import { ProjectCaseStudyPage } from "../components/pages/ProjectCaseStudyPage";
import { Footer } from "../components/sections/Footer";

function RouteFocusManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.scrollIntoView();
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0 });
    });

    return () => cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
}

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
      <RouteFocusManager />
      <Navbar
        theme={theme}
        onThemeToggle={() =>
          setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
        }
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<ProjectCaseStudyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <RecruiterAssistant />
    </div>
  );
}
