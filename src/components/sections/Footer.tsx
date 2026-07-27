import { ArrowUp } from "lucide-react";
import { profile } from "../../data/portfolioData";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <p>
          <strong>{profile.name}</strong>
          <span>{profile.role}</span>
        </p>
        <p>© {new Date().getFullYear()}</p>
        <nav aria-label="Footer links">
          <a href={profile.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="#hero">
            Back to top <ArrowUp aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
