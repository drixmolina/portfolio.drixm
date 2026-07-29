import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { profile } from "../../data/portfolioData";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { SocialLinks } from "../ui/SocialLinks";

type FormFields = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type FormStatus = "idle" | "sending" | "success" | "error";

const emptyFields: FormFields = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export function ContactSection() {
  const [fields, setFields] = useState(emptyFields);
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validate = () => {
    const nextErrors: Partial<FormFields> = {};
    if (fields.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (fields.message.trim().length < 10) {
      nextErrors.message = "Please enter at least 10 characters.";
    }
    setErrors(nextErrors);
    return nextErrors;
  };

  const update = (key: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status !== "sending") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const validationErrors = validate();
    const firstInvalidField = (["name", "email", "message"] as const).find(
      (field) => validationErrors[field],
    );

    if (firstInvalidField) {
      document.getElementById(`contact-${firstInvalidField}`)?.focus();
      return;
    }

    setStatus("sending");
    setStatusMessage("Sending your message…");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Your message could not be sent.");
      }

      setFields(emptyFields);
      setErrors({});
      setStatus("success");
      setStatusMessage("Message sent successfully. Thank you for reaching out.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="page-section contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="site-container">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s build something useful."
          description="If you’re hiring for a junior full-stack role in the Philippines or on a remote team, I’d be glad to discuss how I can contribute."
          headingId="contact-heading"
        />

        <div className="contact-grid">
          <Reveal className="contact-details">
            <div>
              <p className="contact-label">Direct contact</p>
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email} <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <address>
              <p>
                <MapPin aria-hidden="true" />
                {profile.location}
              </p>
              <p>
                <Mail aria-hidden="true" />
                {profile.availability}
              </p>
            </address>
            <SocialLinks variant="text" />
          </Reveal>

          <Reveal>
            <form className="contact-form" onSubmit={submit} noValidate>
              <div className="honeypot" hidden aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={fields.website}
                  onChange={(event) => update("website", event.target.value)}
                />
              </div>

              <label htmlFor="contact-name">
                Name
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                  maxLength={100}
                  value={fields.name}
                  onChange={(event) => update("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && (
                  <span className="field-error" id="contact-name-error">
                    {errors.name}
                  </span>
                )}
              </label>

              <label htmlFor="contact-email">
                Email
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                  value={fields.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && (
                  <span className="field-error" id="contact-email-error">
                    {errors.email}
                  </span>
                )}
              </label>

              <label htmlFor="contact-message">
                Message
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about the opportunity or project."
                  required
                  maxLength={5000}
                  value={fields.message}
                  onChange={(event) => update("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                />
                {errors.message && (
                  <span className="field-error" id="contact-message-error">
                    {errors.message}
                  </span>
                )}
              </label>

              <button
                className="button button-primary submit-button"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
                <Send aria-hidden="true" />
              </button>

              <p
                className={`form-status form-status-${status}`}
                role={status === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {statusMessage}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
