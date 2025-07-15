const CACHE_NAME = 'glypher-cache-81';
const version = '1.0.1';

var urlsToCache = [];
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache).then(function () {
                __hasUpdate = true;
                console.log('All resources have been fetched and cached.');
            });

        }).then(function () {
            // `skipWaiting()` forces the waiting ServiceWorker to become the
            // active ServiceWorker, triggering the `onactivate` event.
            // Together with `Clients.claim()` this allows a worker to take effect
            // immediately in the client(s).
            return self.skipWaiting();
        }));
});
self.addEventListener('activate', function (event) {

    var cacheWhitelist = [CACHE_NAME];
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
            }
        }));
    }));
});


self.addEventListener('fetch', function (event) {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
     event.respondWith(
            caches.match(event.request, {ignoreSearch: true})
                .then(function (response) {
                        // Cache hit - return response
                        if (response) {
                            return response;
                        }
                        if (url.pathname.indexOf('worker-javascript.js') !== -1 || url.pathname.indexOf('worker-html.js') !== -1) {
                            // request = new Request(request, {credentials: 'omit'});
                            return fetch(new Request(event.request, {credentials: 'omit', mode: 'cors'}));
                        }
                        return fetch(event.request);
                    }
                )
        );
        return;
    }
);

