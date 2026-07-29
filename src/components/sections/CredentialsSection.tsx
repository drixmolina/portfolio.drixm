import { useState } from "react";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { credentials, profile } from "../../data/portfolioData";
import { ModalShell } from "../ui/ModalShell";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function CredentialsSection() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section
      id="credentials"
      className="page-section credentials-section"
      aria-labelledby="credentials-heading"
    >
      <div className="site-container">
        <SectionHeader
          eyebrow="Credentials"
          title="Education backed by technical certification."
          description={`${profile.education.degree}, ${profile.education.school} (${profile.education.graduationYear}), supported by verified technical certifications.`}
          headingId="credentials-heading"
        />

        <div className="credential-grid">
          {credentials.map((credential) => (
            <Reveal key={credential.id}>
              <article className="credential-item">
                <FileText aria-hidden="true" />
                <p>{credential.issuer}</p>
                <h3>{credential.title}</h3>
                <span>{credential.issueDate}</span>
                {credential.credentialUrl && (
                  <a
                    href={credential.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View credential <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="resume-panel">
          <div>
            <p className="eyebrow">Résumé</p>
            <h3>{profile.professionalName} · {profile.role}</h3>
            <p>
              Review my current role, selected projects, demonstrated technical
              skills, and education in one concise document.
            </p>
          </div>
          <div className="resume-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setResumeOpen(true)}
            >
              Preview Résumé
            </button>
            <a className="button button-primary" href={profile.resumeUrl} download>
              Download <Download aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>

      <ModalShell
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        title="Drix Molina résumé"
      >
        <iframe
          className="pdf-preview"
          loading="lazy"
          src={profile.resumeUrl}
          title="Drix Molina résumé PDF preview"
        />
      </ModalShell>
    </section>
  );
}
