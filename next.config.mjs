/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    // Old resume URLs keep working after the rename.
    return [
      { source: "/aryan_resume.pdf", destination: "/Aryan_Rastogi_Resume.pdf", permanent: true },
      { source: "/Aryan_Rastogi_resume.pdf", destination: "/Aryan_Rastogi_Resume.pdf", permanent: true },
    ]
  },
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
