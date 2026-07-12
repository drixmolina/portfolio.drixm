import { Moon, Sun } from "lucide-react";

export type Theme = "dark" | "light";
interface ThemeToggleProps { theme: Theme; onToggle: () => void }

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const next = theme === "dark" ? "light" : "dark";
  return <button type="button" className="icon-button theme-toggle" onClick={onToggle} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>
    <span className="theme-icon" aria-hidden="true">{theme === "dark" ? <Sun /> : <Moon />}</span>
  </button>;
}
