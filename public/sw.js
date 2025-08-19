// Service Worker for caching and performance optimization
const CACHE_NAME = 'navarasu-portfolio-v1';
const urlsToCache = [
  '/',
  '/navarasu/img/navarasu_desktop.avif',
  '/navarasu/img/navarasu_tab.avif',
  '/navarasu/img/navarasu_mob.avif',
  '/navarasu/img/navarasu.webp',
  '/loader/img1.png',
  '/loader/img2.png',
  '/loader/img3.png',
  '/loader/img4.png',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 