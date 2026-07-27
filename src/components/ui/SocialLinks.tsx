import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "../../data/portfolioData";

const icons = { github: Github, linkedin: Linkedin, email: Mail };

interface SocialLinksProps {
  variant?: "icons" | "text";
}

export function SocialLinks({ variant = "icons" }: SocialLinksProps) {
  return (
    <div className={`social-links social-links-${variant}`} aria-label="Social links">
      {socialLinks.map((link) => {
        const Icon = icons[link.kind];
        return (
          <a
            key={link.kind}
            href={link.href}
            target={link.kind === "email" ? undefined : "_blank"}
            rel={link.kind === "email" ? undefined : "noreferrer"}
            aria-label={link.accessibleLabel}
          >
            <Icon aria-hidden="true" />
            {variant === "text" && <span>{link.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
