/** @type {import('next').NextConfig} */
const repoName = 'todo-frontend';
const nextConfig = {
  output: 'export',
  basePath: `/${repoName}`,     // เพิ่ม Base Path
  assetPrefix: `/${repoName}/`,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  generateBuildId: async () => 'v2-' + Date.now(), // 👈 เพิ่มบรรทัดนี้

};

module.exports = nextConfig;
