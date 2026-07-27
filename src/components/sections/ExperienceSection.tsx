import { experience } from "../../data/portfolioData";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="page-section experience-section"
      aria-labelledby="experience-heading"
    >
      <div className="site-container">
        <SectionHeader
          eyebrow="Experience"
          title="Practical work, collaborative learning."
          description="Experience applying development skills in an internship environment and a student developer organization."
          headingId="experience-heading"
        />

        <ol className="experience-list">
          {experience.map((item) => (
            <li key={item.id}>
              <Reveal className="experience-entry">
                <p className="experience-period">{item.period}</p>
                <span className="experience-marker" aria-hidden="true" />
                <article>
                  <p className="experience-organization">{item.organization}</p>
                  <h3>{item.role}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
