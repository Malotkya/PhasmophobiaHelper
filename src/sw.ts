/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

const CACHED_FILES = [
    "/",
    "/index.js",
    "/style.css",
    "/favicon.ico",
    "/sound/footstep.wav",
    "/sound/metronome-85688.mp3",
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