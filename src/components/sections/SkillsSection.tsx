import { skillGroups } from "../../data/portfolioData";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function SkillsSection() {
  const populatedGroups = skillGroups.filter((group) => group.skills.length > 0);

  return (
    <section
      id="skills"
      className="page-section skills-section"
      aria-labelledby="skills-heading"
    >
      <div className="site-container">
        <SectionHeader
          eyebrow="Skills & tools"
          title="A focused, evidence-backed toolkit."
          description="Technologies represented in my current work, public source, capstone system, testing, and project documentation."
          headingId="skills-heading"
        />

        <div className="skills-grid">
          {populatedGroups.map((group, index) => (
            <Reveal key={group.category} className="skill-group">
              <p className="skill-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3>{group.category}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
