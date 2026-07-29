import { ArrowLeft, ArrowUpRight, FileText, Github } from "lucide-react";
import { Link, useParams } from "react-router";
import { projectBySlug, projects, profile } from "../../data/portfolioData";
import { ResponsiveImage } from "../ui/ResponsiveImage";
import { Seo } from "../ui/Seo";
import { NotFoundPage } from "./NotFoundPage";

export function ProjectCaseStudyPage() {
  const { slug } = useParams();
  const project = slug ? projectBySlug.get(slug) : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  const nextProject =
    projects[(projects.findIndex((item) => item.id === project.id) + 1) % projects.length];
  const projectPath = `/work/${project.slug}`;
  const siteUrl = profile.websiteUrl.replace(/\/$/, "");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: `${siteUrl}${projectPath}`,
    image: `${siteUrl}${project.image.url}`,
    creator: {
      "@type": "Person",
      name: profile.name,
      url: profile.websiteUrl,
    },
    keywords: project.technologies.join(", "),
  };

  return (
    <>
      <Seo
        title={project.seo.title}
        description={project.seo.description}
        path={projectPath}
        type="article"
        structuredData={structuredData}
      />
      <main id="main-content" className="project-page">
        <header className="project-page-hero">
          <div className="site-container">
            <Link className="back-link" to="/#projects">
              <ArrowLeft aria-hidden="true" /> Back to selected work
            </Link>
            <p className="project-context">{project.context}</p>
            <h1>{project.title}</h1>
            <p className="project-page-summary">{project.shortDescription}</p>

            <div className="project-page-actions">
              {project.githubUrl ? (
                <a
                  className="button button-primary"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github aria-hidden="true" /> Review source
                </a>
              ) : null}
              {project.paperUrl ? (
                <a
                  className="button button-secondary"
                  href={project.paperUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText aria-hidden="true" /> Read research
                </a>
              ) : null}
            </div>

            <dl className="project-evidence" aria-label="Project evidence">
              {project.evidence.map((item) => (
                <div key={item.label}>
                  <dt>{item.value}</dt>
                  <dd>{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <section
          className="project-page-section project-page-visual"
          aria-label="Project overview"
        >
          <div className="site-container">
            <figure>
              <ResponsiveImage
                image={project.image}
                loading="eager"
                sizes="(max-width: 1280px) 100vw, 1240px"
              />
              <figcaption>{project.image.caption}</figcaption>
            </figure>
          </div>
        </section>

        <section
          className="project-page-section"
          aria-labelledby={`${project.id}-challenge`}
        >
          <div className="site-container project-story-grid">
            <div>
              <p className="eyebrow">01 / Context</p>
              <h2 id={`${project.id}-challenge`}>The challenge</h2>
              <p>{project.challenge}</p>
            </div>
            <dl className="project-role-card">
              <div>
                <dt>My role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Primary users</dt>
                <dd>{project.users.join(", ")}</dd>
              </div>
              <div>
                <dt>Technology</dt>
                <dd>{project.technologies.join(" / ")}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          className="project-page-section project-page-surface"
          aria-labelledby={`${project.id}-system`}
        >
          <div className="site-container">
            <div className="project-page-heading">
              <p className="eyebrow">02 / System</p>
              <h2 id={`${project.id}-system`}>How the workflow fits together.</h2>
            </div>
            <div className="project-system-grid">
              <article>
                <h3>Architecture</h3>
                <ul>
                  {project.architecture.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Key workflows</h3>
                <ol>
                  {project.workflows.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </article>
            </div>
          </div>
        </section>

        <section
          className="project-page-section"
          aria-labelledby={`${project.id}-contribution`}
        >
          <div className="site-container project-contribution-grid">
            <div className="project-page-heading">
              <p className="eyebrow">03 / Contribution</p>
              <h2 id={`${project.id}-contribution`}>What I contributed.</h2>
            </div>
            <ul className="contribution-list">
              {project.contributions.map((item, index) => (
                <li key={item}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="project-page-section project-page-surface"
          aria-labelledby={`${project.id}-screens`}
        >
          <div className="site-container">
            <div className="project-page-heading">
              <p className="eyebrow">04 / Interface evidence</p>
              <h2 id={`${project.id}-screens`}>Screens from the working system.</h2>
              <p>
                {project.id === "highly-succeed"
                  ? "The gallery focuses on real workflow states. Company demonstration identities and credentials are obscured for privacy."
                  : project.id === "deadkids"
                    ? "The gallery divides the supplied full-page website capture into exact storefront sections for easier review."
                    : "The gallery presents verified workflow states from the web and mobile applications."}
              </p>
            </div>
            <div className="project-page-gallery">
              {project.screenshots.map((image) => (
                <figure
                  key={image.url}
                  className={image.height > image.width ? "gallery-portrait" : undefined}
                >
                  <ResponsiveImage image={image} />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          className="project-page-section project-outcome"
          aria-labelledby={`${project.id}-outcome`}
        >
          <div className="site-container">
            <p className="eyebrow">05 / Outcome</p>
            <h2 id={`${project.id}-outcome`}>{project.result}</h2>
            <Link className="next-project-link" to={`/work/${nextProject.slug}`}>
              Next case study: {nextProject.title}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
