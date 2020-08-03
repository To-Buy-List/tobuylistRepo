const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

//Install Service Worker
/* self means the service worker itself */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened Cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//Listen for Requests
self.addEventListener("fetch", (event) => {
  //For fetch the requests if the connection is fine else fetch offline.html
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

//Activate Server worker
//It'll update the caches
//It'llll remove all the previous cach and keep new ones
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  //push all the things we want to keep
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          /*If the Chache white list does not include the chach name, 
            we will delete this specific cache name */
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
