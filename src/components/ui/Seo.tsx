import { useEffect } from "react";
import { profile } from "../../data/portfolioData";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  structuredData: Record<string, unknown>;
}

const siteUrl = profile.websiteUrl.replace(/\/$/, "");
const socialImage = `${siteUrl}/og-image.png`;

function setMeta(selector: string, attribute: "name" | "property", value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, selector.match(/["'](.+)["']/)?.[1] ?? "");
    document.head.appendChild(element);
  }

  element.setAttribute("content", value);
}

export function Seo({
  title,
  description,
  path = "/",
  type = "website",
  noIndex = false,
  structuredData,
}: SeoProps) {
  const structuredDataJson = JSON.stringify(structuredData);

  useEffect(() => {
    const canonicalUrl = `${siteUrl}${path === "/" ? "/" : path}`;
    document.title = title;

    setMeta('meta[name="description"]', "name", description);
    setMeta(
      'meta[name="robots"]',
      "name",
      noIndex ? "noindex, nofollow" : "index, follow",
    );
    setMeta('meta[property="og:type"]', "property", type);
    setMeta('meta[property="og:url"]', "property", canonicalUrl);
    setMeta('meta[property="og:title"]', "property", title);
    setMeta('meta[property="og:description"]', "property", description);
    setMeta('meta[property="og:image"]', "property", socialImage);
    setMeta('meta[name="twitter:title"]', "name", title);
    setMeta('meta[name="twitter:description"]', "name", description);
    setMeta('meta[name="twitter:image"]', "name", socialImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let script = document.head.querySelector<HTMLScriptElement>("#structured-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = structuredDataJson;
  }, [description, noIndex, path, structuredDataJson, title, type]);

  return null;
}
