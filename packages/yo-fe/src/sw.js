/* eslint-disable no-restricted-globals  */
const staticCacheName = 'cache-tmdb';

const domainHelper = (requestedUrl, referrer) => requestedUrl.startsWith(referrer);
const requestWithoutCache = async request => fetch(request);

const addToCache = async (request) => {
  const response = await fetch(request);
  const cache = await caches.open(staticCacheName);
  cache.put(request.url, response.clone());

  return response;
};

const fetchWithCache = async (request) => {
  const cacheResponse = await caches.match(request);

  return cacheResponse || addToCache(request);
};

// webfirst for site
// all for API
self.addEventListener('activate', (event) => {
  console.log('Activating new service worker...');
  const cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(
        cacheName => cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
      )
    ))
  );
});

self.addEventListener('fetch', async (event) => {
  try {
    event.respondWith(
      !domainHelper(event.request.url, event.request.referrer)
        ? fetchWithCache(event.request) : requestWithoutCache(event.request)
    );
  } catch (e) {
    console.log('cache respondWith', e);
  }
});
