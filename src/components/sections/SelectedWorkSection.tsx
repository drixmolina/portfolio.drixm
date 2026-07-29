import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router";
import { projects, type PortfolioProject } from "../../data/portfolioData";
import { Reveal } from "../ui/Reveal";
import { ResponsiveImage } from "../ui/ResponsiveImage";
import { SectionHeader } from "../ui/SectionHeader";

function ProjectActions({ project }: { project: PortfolioProject }) {
  return (
    <div className="project-actions" aria-label={`${project.title} links`}>
      <Link to={`/work/${project.slug}`}>
        View Case Study <ArrowUpRight aria-hidden="true" />
      </Link>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          Live Website <ArrowUpRight aria-hidden="true" />
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noreferrer">
          <Github aria-hidden="true" /> GitHub
        </a>
      )}
    </div>
  );
}

export function SelectedWorkSection() {
  return (
    <section
      id="projects"
      className="page-section work-section"
      aria-labelledby="projects-heading"
    >
      <div className="site-container">
        <SectionHeader
          eyebrow="Selected work"
          title="Projects built around real workflows."
          description="A focused selection of systems that demonstrate practical problem-solving, interface design, and project ownership."
          headingId="projects-heading"
        />

        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.id}>
              <article
                className={`project-feature ${index % 2 ? "project-feature-reverse" : ""}`}
              >
                <div className="project-media">
                  <Link
                    className="project-image-link"
                    to={`/work/${project.slug}`}
                    aria-label={`Read case study: ${project.title}`}
                  >
                    <ResponsiveImage
                      image={project.image}
                      sizes="(max-width: 900px) 100vw, 62vw"
                    />
                    <span>
                      Read case study <ArrowUpRight aria-hidden="true" />
                    </span>
                  </Link>
                </div>

                <div className="project-copy">
                  <p className="project-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="project-context">{project.context}</p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.shortDescription}</p>

                  <dl className="project-facts">
                    <div>
                      <dt>My role</dt>
                      <dd>{project.role}</dd>
                    </div>
                    <div>
                      <dt>Evidence</dt>
                      <dd>{project.evidence.slice(0, 2).map((item) => `${item.value} ${item.label.toLowerCase()}`).join(" · ")}</dd>
                    </div>
                  </dl>

                  <p className="technology-line">
                    <span>Built with</span> {project.technologies.join(" · ")}
                  </p>
                  <ProjectActions project={project} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
