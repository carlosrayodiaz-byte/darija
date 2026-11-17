// Service worker de Darija: red primero, con 2,5 s de margen.
// Con buena cobertura siempre carga la última versión; en un túnel o sin conexión,
// si la red no responde en 2,5 s, abre la copia guardada en el iPhone.
// Cuando cambies cualquier archivo, sube VERSION y sube también este sw.js.
const VERSION = 'darija-v8';
const CACHE = 'darija-' + VERSION;
const CORE = ['./', 'index.html', 'fsrs.js', 'darija.json', 'dialogos.json', 'manifest.webmanifest',
  'unbounded.woff2', 'manrope.woff2', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'];
const WAIT = 2500;
// si la red acaba de fallar o no ha respondido, durante 15 s el resto de archivos sale directamente
// de la copia (y se actualiza por detrás), para no esperar 2,5 s por cada uno
let slowUntil = 0;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(CORE.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => null))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith('darija') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function stripQuery(req) { const u = new URL(req.url); u.search = ''; return new Request(u.toString()); }

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Apps Script (copias en Drive): directo a la red
  const net = fetch(req, { cache: 'no-cache' }).then(res => {
    if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(stripQuery(req), copy)); }
    return res;
  });
  e.waitUntil(net.then(() => null, () => null)); // aunque se sirva la copia, la red sigue actualizándola
  e.respondWith((async () => {
    if (Date.now() < slowUntil) {
      const c = await caches.match(stripQuery(req));
      if (c) return c;
    }
    try {
      const res = await Promise.race([net, new Promise(r => setTimeout(() => r(null), WAIT))]);
      if (res) { slowUntil = 0; return res; }
    } catch (err) { /* sin conexión: a la copia */ }
    slowUntil = Date.now() + 15000;
    const cached = await caches.match(stripQuery(req)) || (req.mode === 'navigate' ? await caches.match('index.html') : null);
    return cached || net;
  })());
});
