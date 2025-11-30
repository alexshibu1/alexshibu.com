import type { MDXComponents } from "mdx/types";
import { EssayHeader } from "./app/components/essay-header"; // Import it

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Make it available as a short tag
    EssayHeader,

    wrapper: ({ children }) => (
      <main className="page-content" style={{ maxWidth: "650px" }}>
        {children}
      </main>
    ),
    ...components,
  };
}
