import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '../../config/seo.config';

/**
 * SEO Component
 * 
 * A reusable component for managing all SEO-related meta tags.
 * Uses react-helmet-async for SSR-compatible meta tag management.
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (optional, defaults to config)
 * @param {string} props.description - Page description (optional, defaults to config)
 * @param {string} props.keywords - Comma-separated keywords (optional, defaults to config)
 * @param {string} props.image - OG image URL (optional, defaults to config)
 * @param {string} props.url - Canonical URL (optional, defaults to config)
 * @param {string} props.type - Content type (website, article, etc.)
 * @param {string} props.locale - Locale code (default: es_ES)
 * @param {Object} props.structuredData - JSON-LD structured data object
 */
const SEO = ({ 
  title = SEO_CONFIG.defaultTitle,
  description = SEO_CONFIG.defaultDescription,
  keywords = "transcripción de audio, audio a texto, speech to text, transcribir audio, IA transcripción",
  image = SEO_CONFIG.defaultImage,
  url = SEO_CONFIG.siteUrl,
  type = "website",
  locale = "es_ES",
  structuredData = null,
  noindex = false
}) => {
  // Format title with template
  const formattedTitle = title === SEO_CONFIG.defaultTitle 
    ? title 
    : SEO_CONFIG.titleTemplate.replace('%s', title);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="title" content={formattedTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Voicetudu" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Voicetudu" />
      <meta name="language" content="Spanish" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
