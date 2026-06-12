import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    localPatterns: [{ pathname: "/projects/**" }, { pathname: "/images/**" }],
  },
  async headers() {
    return [
      {
        source: "/projects/placeholders/:path*",
        headers: [
          {
            key: "Cache-Control",
            // Balance speed + update safety for frequently tweaked preview assets.
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        source: "/(images|projects)/:path*",
        headers: [
          {
            key: "Cache-Control",
            // Reuse the same profile for static media outside placeholders.
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
      {
        source: "/:path*.woff2",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
      {
        source: "/gapyear",
        destination: "/writing",
        permanent: true,
      },
      {
        source: "/essay/gapyear",
        destination: "/writing",
        permanent: true,
      },
      {
        source: "/essay/gap-year",
        destination: "/writing",
        permanent: true,
      },
      {
        source: "/read",
        destination: "/books",
        permanent: true,
      },
      {
        source: "/resume",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/content",
        destination: "/writing",
        permanent: true,
      },
      {
        source: "/ethereum",
        destination: "/essay/ethereum",
        permanent: true,
      },
      {
        source: "/profs",
        destination: "/essay/profs",
        permanent: true,
      },
      {
        source: "/nft",
        destination: "/essay/nft",
        permanent: true,
      },
      {
        source: "/reject",
        destination: "/rejected",
        permanent: true,
      },
      {
        source: "/smym",
        destination: "https://smym.substack.com/",
        permanent: true,
      },
      {
        source: "/aifilms",
        destination:
          "https://docs.google.com/presentation/d/1y6aeqlCFMKFFEhaa4p_Cwgv3zj_8TyVIIhbSX87auPo/edit?usp=sharing",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
