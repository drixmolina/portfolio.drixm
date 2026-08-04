import { profile } from "../../data/portfolioData";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function AboutSection() {
  return (
    <section
      id="about"
      className="page-section about-section"
      aria-labelledby="about-heading"
    >
      <div className="site-container">
        <SectionHeader
          eyebrow="About"
          title="A developer grounded in practical problem-solving."
          headingId="about-heading"
        />

        <Reveal className="about-grid">
          <div className="about-copy">
            <p>
              I’m {profile.professionalName}, a full-stack developer and IT graduate
              who enjoys turning complex workflows into clear, responsive digital
              experiences.
            </p>
            <p>
              My work spans frontend development, backend fundamentals, system
              testing, documentation, IT support, and web/mobile application
              development. I value accessible interfaces, maintainable code, and
              solutions that make everyday work easier.
            </p>
          </div>

          <dl className="profile-facts">
            <div>
              <dt>Education</dt>
              <dd>
                BS Information Technology
                <span>Web and Mobile Application Development · FEU Diliman</span>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>{profile.availability}</dd>
            </div>
            <div>
              <dt>Current focus</dt>
              <dd>Full-stack systems, accessible interfaces, and practical automation</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
