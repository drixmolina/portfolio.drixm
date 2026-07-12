import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "../../data/portfolioData";

const icons = { github: Github, linkedin: Linkedin, email: Mail };
export function SocialLinks() {
  return <div className="social-links" aria-label="Social links">{socialLinks.map((link) => {
    const Icon = icons[link.kind];
    return <a key={link.kind} href={link.href} target={link.kind === "email" ? undefined : "_blank"} rel="noreferrer" aria-label={link.label}><Icon aria-hidden="true" /></a>;
  })}</div>;
}
