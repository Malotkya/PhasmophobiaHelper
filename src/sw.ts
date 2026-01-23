/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

const CACHED_FILES = [
    "/"
]

self.addEventListener("install", (event)=>{
    event.waitUntil(
        caches.open(VERSION).then(cache=>{
            cache.addAll(CACHED_FILES)
        })
    );
});

self.addEventListener("activate", (event)=>{
    self.clients.claim();
});


self.addEventListener("message", (event)=>{
    if (event.data.update) {
        self.skipWaiting();
    }
});

self.addEventListener("fetch", async(event)=>{
    event.respondWith((async():Promise<Response>=>{
        const cache = await caches.open(VERSION);
        return (await cache.match(event.request)) || await fetch(event.request);
    })());
});