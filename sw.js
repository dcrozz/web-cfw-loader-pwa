const version = 'latest'
importScripts(`https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js`)

if (workbox) {
    console.log("Yes! Workbox is loaded");

    workbox.precaching.precacheAndRoute([
        {
            "url": "index.html",
            "revision": "1"
        }
    ]);

    workbox.routing.registerRoute(
        /\.(js|css)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'static-files',
        }),
    );

    workbox.routing.registerRoute(
        /\.(png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'cache-images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
        workbox.strategies.cacheFirst({
            cacheName: 'googleapis',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 30,
                }),
            ],
        }),
    );
} else {
    console.log("No! Workbox didn't load");
}
