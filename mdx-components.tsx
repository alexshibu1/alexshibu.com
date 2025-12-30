import type { MDXComponents } from "mdx/types";
import { EssayHeader } from "./app/components/essay-header"; // Import it
import { EssayTheme } from "./app/components/essay-theme";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Make it available as a short tag
    EssayHeader,
    EssayTheme,

    wrapper: ({ children }) => (
      <main
        className="page-content"
        style={{ maxWidth: "650px", display: "block" }}
      >
        {children}
      </main>
    ),
    a: ({ children, className, ...props }) => {
      const text =
        typeof children === "string"
          ? children
          : Array.isArray(children) &&
              children.length === 1 &&
              typeof children[0] === "string"
            ? children[0]
            : "";
      const isCitation = typeof text === "string" && /^\d+$/.test(text.trim());
      const mergedClassName = [className, isCitation ? "citation-link" : null]
        .filter(Boolean)
        .join(" ");

      return (
        <a {...props} className={mergedClassName || undefined}>
          {children}
        </a>
      );
    },
    ...components,
  };
}
