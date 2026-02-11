import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SEO_CONFIG } from '../../config/seo.config';

/**
 * SEO Component
 * 
 * A reusable component for managing all SEO-related meta tags.
 * Uses react-helmet-async for SSR-compatible meta tag management.
 * Supports internationalization.
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (optional, defaults to config)
 * @param {string} props.description - Page description (optional, defaults to config)
 * @param {string} props.keywords - Comma-separated keywords (optional, defaults to config)
 * @param {string} props.image - OG image URL (optional, defaults to config)
 * @param {string} props.url - Canonical URL (optional, defaults to config)
 * @param {string} props.type - Content type (website, article, etc.)
 * @param {Object} props.structuredData - JSON-LD structured data object
 */
const SEO = ({ 
  title,
  description,
  keywords,
  image = SEO_CONFIG.defaultImage,
  url = SEO_CONFIG.siteUrl,
  type = "website",
  structuredData = null,
  noindex = false
}) => {
  const { t, i18n } = useTranslation('seo');
  const currentLang = i18n.language?.split('-')[0] || 'es';
  
  // Get locale based on current language
  const locale = currentLang === 'en' ? 'en_US' : 'es_ES';
  
  // Use translated values or fallbacks
  const pageTitle = title || t('default.title');
  const pageDescription = description || t('default.description');
  const pageKeywords = keywords || t('default.keywords');
  
  // Format title with template
  const formattedTitle = pageTitle === SEO_CONFIG.defaultTitle 
    ? pageTitle 
    : SEO_CONFIG.titleTemplate.replace('%s', pageTitle);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="title" content={formattedTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      
      {/* Language */}
      <html lang={currentLang} />
      <meta name="language" content={currentLang === 'en' ? 'English' : 'Spanish'} />
      
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
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Voicetudu" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Voicetudu" />
      
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
