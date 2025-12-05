import createMDX from "@next/mdx";
/** @type {import('next').NextConfig} */

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

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
    ];
  },
};
module.exports = nextConfig;

export default withMDX(nextConfig);
