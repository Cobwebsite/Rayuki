const cacheName = 'valdev-dashboard-v1';
const contentToCache = [
    '/sw.js',
    '/pwa/loading.html',
    '/pwa/icons/logo-512.png',
    '/pwa/loader.css',
    '/img/logo.svg'
];

self.addEventListener("install", e => {
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(contentToCache);
    })());
});


// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
    // Cache http and https only, skip unsupported chrome-extension:// and file://...
    if (!(
        e.request.url.startsWith('http:') || e.request.url.startsWith('https:')
    )) {
        return;
    }
    e.respondWith((async () => {
        let path = e.request.url.replace(location.origin, '');
        try {
            const response = await fetch(e.request);
            if (contentToCache.includes(path)) {
                const cache = await caches.open(cacheName);
                cache.put(e.request, response.clone());
            }
            return response;
        }
        catch (err) {
            const r = await caches.match(e.request);
            if (r) {
                return r;
            }

            return;
        }
    })());
});


self.addEventListener('push', function (event) {
    const payload = event.data ? event.data.text() : 'no payload';
    // Keep the service worker alive until the notification is created.
    event.waitUntil(
        // Show a notification with title 'ServiceWorker Cookbook' and body 'Alea iacta est'.
        self.registration.showNotification('ServiceWorker Cookbook', {
            body: payload,
        })
    );
});