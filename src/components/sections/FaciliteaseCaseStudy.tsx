import { ArrowUpRight, FileText } from "lucide-react";
import { faciliteaseCaseStudy } from "../../data/portfolioData";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function FaciliteaseCaseStudy() {
  const study = faciliteaseCaseStudy;

  return (
    <section
      id="facilitease-case-study"
      className="page-section case-study-section"
      aria-labelledby="facilitease-heading"
    >
      <div className="site-container">
        <SectionHeader
          eyebrow="Capstone case study"
          title={study.title}
          description={study.context}
          headingId="facilitease-heading"
        />

        <Reveal className="case-study-intro">
          <figure className="case-study-photo">
            <img
              src={study.photograph.url}
              width={study.photograph.width}
              height={study.photograph.height}
              alt={study.photograph.alt}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{study.photograph.caption}</figcaption>
          </figure>

          <div className="case-study-overview">
            <p className="case-study-kicker">Research translated into a working system</p>
            <h3>One coordinated workflow for facilities operations.</h3>
            <dl className="case-study-meta">
              <div>
                <dt>Role</dt>
                <dd>{study.role}</dd>
              </div>
              <div>
                <dt>Project type</dt>
                <dd>{study.projectType}</dd>
              </div>
              <div>
                <dt>Technology</dt>
                <dd>{study.technologies.join(" · ")}</dd>
              </div>
            </dl>
            <a
              className="text-action"
              href={study.paperUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FileText aria-hidden="true" /> Read the research paper
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <div className="case-study-narrative">
          <Reveal>
            <article>
              <p className="narrative-index">01</p>
              <h3>The challenge</h3>
              <p>{study.challenge}</p>
            </article>
          </Reveal>
          <Reveal>
            <article>
              <p className="narrative-index">02</p>
              <h3>The users</h3>
              <ul className="case-study-users">
                {study.users.map((user) => (
                  <li key={user}>{user}</li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal>
            <article>
              <p className="narrative-index">03</p>
              <h3>The solution</h3>
              <p>{study.solution}</p>
            </article>
          </Reveal>
        </div>

        <Reveal className="case-study-modules">
          <div>
            <p className="eyebrow">Connected modules</p>
            <h3>A system designed around the full request lifecycle.</h3>
          </div>
          <ul>
            {study.modules.map((module, index) => (
              <li key={module}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {module}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="case-study-process">
          <Reveal>
            <figure className="case-study-interface">
              <img
                src={study.interfaceImage.url}
                width={study.interfaceImage.width}
                height={study.interfaceImage.height}
                alt={study.interfaceImage.alt}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{study.interfaceImage.caption}</figcaption>
            </figure>
          </Reveal>

          <div className="case-study-process-copy">
            <Reveal>
              <article>
                <p className="eyebrow">Process & responsibilities</p>
                <ul className="responsibility-list">
                  {study.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
            <Reveal>
              <article>
                <p className="eyebrow">Testing & validation</p>
                <p>{study.validation}</p>
              </article>
            </Reveal>
            <Reveal>
              <article className="case-study-outcome">
                <p className="eyebrow">Outcome</p>
                <p>{study.outcome}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
