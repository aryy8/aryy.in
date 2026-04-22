const fs = require("fs")
const path = require("path")
const sharp = require("sharp")

const PUBLIC_DIR = path.join(__dirname, "public")

const SKIP_FILES = new Set([
  "favicon.png",
  "robots.txt",
  "sitemap.xml",
  ".DS_Store",
])

async function main() {
  const entries = await fs.promises.readdir(PUBLIC_DIR)

  const images = entries
    .filter((f) => !SKIP_FILES.has(f))
    .filter((f) => /\.(png|jpe?g)$/i.test(f))

  if (images.length === 0) {
    console.log("No PNG/JPG/JPEG images found in public/ to convert.")
    return
  }

  console.log(`Found ${images.length} images to convert to WebP...`)

  for (const fileName of images) {
    const inputPath = path.join(PUBLIC_DIR, fileName)
    const outputName = fileName.replace(/\.(png|jpe?g)$/i, ".webp")
    const outputPath = path.join(PUBLIC_DIR, outputName)

    if (fs.existsSync(outputPath)) {
      console.log(`Skipping (already exists): ${outputName}`)
      continue
    }

    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath)

      console.log(`Converted: ${fileName} -> ${outputName}`)
    } catch (err) {
      console.error(`Failed converting ${fileName}:`, err)
    }
  }

  console.log("Done.")
  console.log(
    "Next: update image references in code from .png/.jpg/.jpeg to .webp (I can do this after you run the script)."
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
