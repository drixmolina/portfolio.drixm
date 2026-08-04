import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Seo } from "../ui/Seo";

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found | Drix Molina"
        description="The requested page could not be found."
        path="/404"
        noIndex
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Page not found",
        }}
      />
      <main id="main-content" className="not-found-page">
        <div className="site-container">
          <p className="eyebrow">404 / Page not found</p>
          <h1>This route does not exist.</h1>
          <p>
            The page may have moved. Return to the portfolio to review selected
            projects and experience.
          </p>
          <Link className="button button-primary" to="/">
            <ArrowLeft aria-hidden="true" /> Back to portfolio
          </Link>
        </div>
      </main>
    </>
  );
}
