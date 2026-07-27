interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  headingId: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  headingId,
}: SectionHeaderProps) {
  return (
    <header className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId}>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}
