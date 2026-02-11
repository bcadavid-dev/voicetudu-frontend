/**
 * Voicetudu Service Worker
 * 
 * Provides offline functionality and caching for the Voicetudu application.
 * Implements a cache-first strategy for static assets and network-first for API calls.
 */

const CACHE_NAME = 'voicetudu-v1';
const STATIC_CACHE = 'voicetudu-static-v1';
const API_CACHE = 'voicetudu-api-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/voicetudu-logo.svg',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/apple-touch-icon.png',
  '/site.webmanifest'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name.startsWith('voicetudu-') && 
                     name !== STATIC_CACHE && 
                     name !== API_CACHE;
            })
            .map((name) => {
              console.log('[Service Worker] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle requests with appropriate strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // API requests - network first, cache fallback
  if (url.pathname.startsWith('/api/') || url.hostname.includes('api.')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // Static assets - cache first, network fallback
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // HTML pages - stale while revalidate
  if (request.mode === 'navigate' || request.headers.get('accept').includes('text/html')) {
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }
  
  // Default - network first
  event.respondWith(networkFirstStrategy(request));
});

/**
 * Cache First Strategy
 * Try cache first, fall back to network
 */
async function cacheFirstStrategy(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

/**
 * Network First Strategy
 * Try network first, fall back to cache
 */
async function networkFirstStrategy(request) {
  const cache = await caches.open(API_CACHE);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache');
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

/**
 * Stale While Revalidate Strategy
 * Return cached version immediately, update cache in background
 */
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch((error) => {
      console.log('[Service Worker] Background fetch failed:', error);
    });
  
  return cached || fetchPromise;
}

/**
 * Check if request is for a static asset
 */
function isStaticAsset(request) {
  const staticExtensions = [
    '.js', '.css', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico',
    '.woff', '.woff2', '.ttf', '.eot', '.json'
  ];
  
  const url = new URL(request.url);
  return staticExtensions.some(ext => url.pathname.endsWith(ext));
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Background sync for offline uploads (if needed in future)
self.addEventListener('sync', (event) => {
  if (event.tag === 'upload-audio') {
    event.waitUntil(handleBackgroundUpload());
  }
});

async function handleBackgroundUpload() {
  // Implementation for background upload sync
  console.log('[Service Worker] Background sync triggered');
}
