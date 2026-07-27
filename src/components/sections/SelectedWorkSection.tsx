import { useState } from "react";
import { ArrowUpRight, Github, Images } from "lucide-react";
import { projects, type PortfolioProject } from "../../data/portfolioData";
import { ModalShell } from "../ui/ModalShell";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

function ProjectActions({ project }: { project: PortfolioProject }) {
  return (
    <div className="project-actions" aria-label={`${project.title} links`}>
      {project.caseStudyUrl && (
        <a href={project.caseStudyUrl}>
          View Case Study <ArrowUpRight aria-hidden="true" />
        </a>
      )}
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
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

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
                  <button
                    type="button"
                    className="project-image-button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`View ${project.title} screenshots`}
                  >
                    <img
                      src={project.image.url}
                      width={project.image.width}
                      height={project.image.height}
                      alt={project.image.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <span>
                      <Images aria-hidden="true" /> View screenshots
                    </span>
                  </button>
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
                      <dt>Contribution</dt>
                      <dd>
                        <ul>
                          {project.contributions.map((contribution) => (
                            <li key={contribution}>{contribution}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    {project.result && (
                      <div>
                        <dt>Result</dt>
                        <dd>{project.result}</dd>
                      </div>
                    )}
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

      <ModalShell
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={`${selectedProject?.title ?? "Project"} screenshots`}
      >
        <div className="gallery">
          {selectedProject?.screenshots.map((image) => (
            <figure
              key={image.url}
              className={image.height > image.width ? "gallery-portrait" : undefined}
            >
              <img
                src={image.url}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                alt={image.alt}
              />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </ModalShell>
    </section>
  );
}
