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
    const parts = url.pathname.split('/');
    let fileName = parts.at(-1);
    if (fileName ==='custom.css') {
      event.respondWith(async function () {
        console.warn(fileName);
        const res = await fetch(new Request('./custom.json'));
        const output = await res.json();
        let response = ''
        console.warn(output );
        output.map((collection) => {
            if(collection.variables) {
                response += collection?.variables.map((it) => {
                    if(!it.name.includes('|')) return '/* as*/\n';
                    let val = Object.values(it.values)[0];
                    if(val.r !== undefined) {
                        val = `rgba(${Math.round(val.r*255)},${Math.round(val.g*255)},${Math.round(val.b*255)},${val.a})`
                    }
                    return `\n ${it.name.replace(/\*/g, '.').split('|')[0]} {
                        ${it.name.split('|')[1]}: ${val} !important;
                    }`;
                }).join('\n');
            }
        })
        return new Response(response, {
            headers: new Headers({
                'Content-Type': 'text/css; charset=utf-8'
            })
        });
     }());
    }else {

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
    }
        return;
    }
);

