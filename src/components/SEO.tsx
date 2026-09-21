const SITE_NAME = 'UrbanThreads'
const SITE_URL = 'https://urbanthreads.example.com'
const DEFAULT_DESCRIPTION =
  'Streetwear para quienes marcan su propio camino. Ediciones limitadas, diseño brutal, cero filtros.'
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  path?: string
  type?: 'website' | 'product' | 'article'
  noIndex?: boolean
}

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  path = '',
  type = 'website',
  noIndex = false,
}: SEOProps) {
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — Streetwear sin filtros`
  const fullUrl = `${SITE_URL}${path}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}