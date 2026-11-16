// Service worker: la app funciona sin conexión.
// Cuando cambies algún archivo, sube el número de versión para que el iPhone lo actualice.
const VERSION = 'darija-v5';
const SHELL = [
  './',
  './index.html',
  './fsrs.js',
  './darija.json',
  './dialogos.json',
  './manifest.webmanifest',
  './unbounded.woff2',
  './manrope.woff2',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  // si algún archivo falla, se instala igualmente con los que sí estén
  e.waitUntil(caches.open(VERSION).then(c => Promise.allSettled(SHELL.map(u => c.add(u)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Solo se guardan en caché los archivos de la propia app.
// Las llamadas a Google Apps Script (copias en Drive) van siempre directas a la red.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req).then(res => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
