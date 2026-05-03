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
    ];
  },
  async redirects() {
    return [
      {
        source: "/gapyear",
        destination: "/essay/gapyear",
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
