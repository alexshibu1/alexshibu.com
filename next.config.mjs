import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
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
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
