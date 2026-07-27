import { ArrowDownRight, Download } from "lucide-react";
import { profile } from "../../data/portfolioData";
import { SocialLinks } from "../ui/SocialLinks";

export function HeroSection() {
  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-heading">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="availability-label">
            <span aria-hidden="true" />
            {profile.availability}
          </p>
          <p className="hero-name">
            {profile.name} <span aria-hidden="true">/</span> {profile.role}
          </p>
          <h1 id="hero-heading">
            Full-stack developer building{" "}
            <span>reliable web and mobile experiences.</span>
          </h1>
          <p className="hero-introduction">{profile.introduction}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View Projects <ArrowDownRight aria-hidden="true" />
            </a>
            <a className="button button-secondary" href={profile.resumeUrl} download>
              Download Résumé <Download aria-hidden="true" />
            </a>
          </div>
          <SocialLinks variant="text" />
        </div>

        <figure className="hero-portrait">
          <span className="portrait-detail" aria-hidden="true" />
          <img
            src={profile.portrait}
            width="1024"
            height="1536"
            alt="Portrait of Drix Paulo Molina"
            decoding="async"
            loading="eager"
          />
        </figure>
      </div>
      <a className="hero-scroll-cue" href="#projects">
        Selected work <ArrowDownRight aria-hidden="true" />
      </a>
    </section>
  );
}
