/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    // Old resume URL keeps working. Next.js matches redirect sources case-insensitively,
    // so never add a source that differs from the real file only by letter case (it loops).
    return [
      { source: "/aryan_resume.pdf", destination: "/Aryan_Rastogi_Resume.pdf", permanent: true },
    ]
  },
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
