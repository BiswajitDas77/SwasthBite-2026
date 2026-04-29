const CACHE_NAME = 'swasthbite-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A simple pass-through to ensure the browser considers this a valid service worker for PWA installation.
  // In a real app, you would add offline caching strategies here.
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response("Offline mode not fully configured yet.", {
        status: 503,
        statusText: "Service Unavailable"
      });
    })
  );
});
