// Con `images: { unoptimized: true }` el loader de next/image devuelve el src
// tal cual y NO le aplica basePath — a diferencia de Link, que sí lo hace. En
// GitHub Pages (sitio servido en /<repo>/) eso deja las imágenes en 404.
// Todo src de /public tiene que pasar por acá.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function asset(path: string) {
  return `${BASE}${path}`
}
