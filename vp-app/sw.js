const VERSION = "0.1.3";
const CACHE_NAME = `vp-lookup-${VERSION}`;

const ROOT = "/vp-app/";
const APP_STATIC_RESOURCES = [
  ROOT,
  "/vp-app/index.html",
  "/vp-app/main.mjs",
  "/vp-app/vp-parser.mjs",
  "/vp-app/pwa-sw.js",
  "/assets/style.css",
  "/assets/icons/vp-icon-512.png"
];

// On install, cache the static resources
self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })(),
  );
});

// On activate, delete old cache stores
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
          return undefined;
        }),
      );
      await clients.claim();
    })(),
  );
});

// On fetch, serve from cache only (even if online)
self.addEventListener("fetch", (event) => {
  // when seeking an HTML page
  if (event.request.mode === "navigate") {
    // Return to the index.html page
    event.respondWith(caches.match(ROOT));
    return;
  }

  // For every other request type
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request.url);
      if (cachedResponse) {
        // Return the cached response if it's available.
        return cachedResponse;
      }
      // Respond with a HTTP 404 response status.
      return new Response(null, { status: 404 });
    })(),
  );
});
