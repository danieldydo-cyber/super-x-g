/* D7 DJ Studio service worker — shell + runtime cache for samples. */
const VER = 'd7dj-v1.4.0';
const SHELL = [
  './dloop.html',
  './superdj.html',
  './favicon.png',
  './icon-192.png',
  './icon-512.png',
  './d7-dj-studio.webmanifest',
  './dloop/samples/manifest.json'
];
self.addEventListener('install', ev => {
  ev.waitUntil((async () => {
    const c = await caches.open(VER);
    await Promise.all(SHELL.map(u => c.add(u).catch(() => null)));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', ev => {
  ev.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VER).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (/\/downloads\//.test(url.pathname) || /\.(apk|zip|exe)$/i.test(url.pathname)) return;
  ev.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && res.ok && (url.pathname.includes('/dloop/') || /icon-\d+\.png$|favicon|webmanifest|dloop\.html|superdj\.html|dloop-sw\.js/.test(url.pathname))) {
        const c = await caches.open(VER);
        c.put(req, res.clone()).catch(() => {});
      }
      return res;
    } catch (e) {
      if (hit) return hit;
      if (url.pathname.endsWith('dloop.html') || url.pathname.endsWith('/')) {
        const fb = await caches.match('./dloop.html');
        if (fb) return fb;
      }
      throw e;
    }
  })());
});
