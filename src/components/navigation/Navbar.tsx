import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "../../data/portfolioData";
import { ThemeToggle, type Theme } from "./ThemeToggle";

interface NavbarProps {
  theme: Theme;
  onThemeToggle: () => void;
}

export function Navbar({ theme, onThemeToggle }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    let previousScroll = window.scrollY;
    const onScroll = () => {
      const currentScroll = window.scrollY;
      const focusInsideHeader = headerRef.current?.contains(document.activeElement);
      setScrolled(currentScroll > 24);
      setVisible(
        open ||
          Boolean(focusInsideHeader) ||
          currentScroll < 96 ||
          currentScroll < previousScroll,
      );
      previousScroll = currentScroll;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) setActive(visibleEntry.target.id);
      },
      { rootMargin: "-28% 0px -62%" },
    );

    navigation.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setVisible(true);
    requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
    );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
      ];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeMenu, open]);

  const desktopLinks = navigation.filter(({ id }) => id !== "contact");

  return (
    <header
      ref={headerRef}
      className={`site-header ${visible ? "header-visible" : "header-hidden"} ${scrolled ? "header-scrolled" : ""}`}
      onFocusCapture={() => setVisible(true)}
    >
      <nav aria-label="Main navigation" className="nav-container">
        <a href="#hero" className="brand" aria-label="Drix Molina portfolio home">
          Drix Molina<span aria-hidden="true">.</span>
        </a>

        <div className="desktop-nav">
          {desktopLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <a
            className="nav-contact"
            href="#contact"
            aria-current={active === "contact" ? "location" : undefined}
          >
            Contact
          </a>
          <button
            ref={triggerRef}
            type="button"
            className="icon-button menu-button"
            onClick={() => (open ? closeMenu() : setOpen(true))}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="mobile-nav-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeMenu();
          }}
        >
          <div
            ref={panelRef}
            id="mobile-navigation"
            className="mobile-nav-panel"
            aria-label="Mobile navigation"
          >
            <p className="mobile-nav-label">Navigate</p>
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => closeMenu()}
                aria-current={active === item.id ? "location" : undefined}
              >
                <span>{item.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
