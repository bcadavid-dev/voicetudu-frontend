/**
 * SEO Configuration
 * 
 * Centralized SEO configuration for the Voicetudu application.
 * All SEO-related constants and page-specific configurations are defined here.
 */

export const SEO_CONFIG = {
  // Default values
  defaultTitle: "Voicetudu - Transcripción de Audio con IA",
  titleTemplate: "%s | Voicetudu",
  defaultDescription: "Transcribe audio a texto al instante con IA. Genera resúmenes, extrae tareas y crea emails profesionales desde tus archivos de audio.",
  siteUrl: "https://voicetudu.com",
  defaultImage: "https://voicetudu.com/og-image.png",
  twitterHandle: "@voicetudu",
  
  // Common keywords
  commonKeywords: [
    "transcripción de audio",
    "audio a texto",
    "speech to text",
    "transcribir audio",
    "IA transcripción",
    "convertir audio texto",
    "transcripción automática",
    "transcripción online",
    "notas de voz a texto",
    "transcribir reuniones"
  ],
  
  // Page-specific configurations
  pages: {
    home: {
      title: "Voicetudu - Transcripción de Audio con IA",
      description: "Transcribe audio a texto al instante con IA. Genera resúmenes, extrae tareas y crea emails profesionales desde tus archivos de audio. Gratis y sin registro.",
      keywords: ["transcripción de audio", "audio a texto", "speech to text español", "transcribir audio online"]
    },
    features: {
      title: "Funcionalidades - Transcripción y Análisis de Audio",
      description: "Descubre todas las funcionalidades de Voicetudu: transcripción automática con Whisper, resúmenes con GPT-4o, extracción de tareas y generación de emails profesionales.",
      keywords: ["funcionalidades transcripción", "herramientas IA audio", "OpenAI Whisper", "GPT-4o transcripción"]
    },
    about: {
      title: "Sobre Voicetudu - Plataforma de Transcripción con IA",
      description: "Conoce Voicetudu, la plataforma de transcripción de audio impulsada por inteligencia artificial más fácil de usar. Nuestra misión es ayudarte a ser más productivo.",
      keywords: ["sobre voicetudu", "plataforma transcripción", "IA productividad", "equipo voicetudu"]
    },
    pricing: {
      title: "Precios - Transcripción de Audio con IA",
      description: "Planes y precios de Voicetudu. Transcripción gratuita y planes premium con características avanzadas para profesionales y equipos.",
      keywords: ["precios transcripción audio", "planes voicetudu", "transcripción gratuita", "API transcripción"]
    },
    blog: {
      title: "Blog - Tips de Transcripción y Productividad",
      description: "Aprende a sacar el máximo provecho de la transcripción de audio con IA. Tips, tutoriales y mejores prácticas para productividad.",
      keywords: ["blog transcripción", "tips audio a texto", "productividad IA", "tutoriales transcripción"]
    }
  },
  
  // Structured data templates
  structuredData: {
    organization: {
      "@type": "Organization",
      "name": "Voicetudu",
      "url": "https://voicetudu.com",
      "logo": "https://voicetudu.com/logo.png",
      "sameAs": [
        "https://twitter.com/voicetudu",
        "https://linkedin.com/company/voicetudu"
      ]
    },
    
    webApplication: {
      "@type": "WebApplication",
      "name": "Voicetudu",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    
    faqPage: {
      "@type": "FAQPage",
      "mainEntity": []
    }
  }
};

/**
 * Helper function to generate page SEO config
 * @param {string} pageName - Name of the page (key in pages config)
 * @param {Object} overrides - Optional overrides for specific values
 * @returns {Object} Complete SEO config for the page
 */
export const getPageSEO = (pageName, overrides = {}) => {
  const pageConfig = SEO_CONFIG.pages[pageName] || SEO_CONFIG.pages.home;
  
  return {
    title: overrides.title || pageConfig.title,
    description: overrides.description || pageConfig.description,
    keywords: overrides.keywords || pageConfig.keywords.join(", "),
    url: overrides.url || SEO_CONFIG.siteUrl,
    image: overrides.image || SEO_CONFIG.defaultImage,
    ...overrides
  };
};

/**
 * Helper function to generate structured data
 * @param {string} type - Type of structured data
 * @param {Object} data - Additional data to merge
 * @returns {Object} Complete structured data object
 */
export const getStructuredData = (type, data = {}) => {
  const template = SEO_CONFIG.structuredData[type];
  if (!template) return null;
  
  return {
    "@context": "https://schema.org",
    ...template,
    ...data
  };
};

export default SEO_CONFIG;
