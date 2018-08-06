// Service Worker
let staticName = 'restaurant-v1';
let cacheFiles = [
  './',
  './restaurant.html',
  './css/styles.css',
  './css/responsive.css',
  './css/responsive-inside.css',
  './js/main.js',
  './js/restaurant_info.js',
  './js/dbhelper.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg'
]

// Installation
self.addEventListener('install', function(event) {
  console.log("[serviceWorker] Installed");

  event.waitUntil(
    caches.open(staticName).then(cache => {
      console.log('[serviceWorker] Caching cacheFiles');
    return cache.addAll(cacheFiles);
    }).catch(err => {
      console.log(err);
    })
  )
})

// Activation
self.addEventListener('activate', function(event) {
  console.log("[serviceWorker] Activated");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      Promise.all(
        cacheNames.filter(thisCacheName => {
          return thisCacheName.startsWith('restaurant-') &&
            thisCacheName !== staticName;
        }).map(thisCacheName => {
          console.log("[ServiceWorker] Removing Cached Files from " + thisCacheName);
          return caches.delete(thisCacheName);
        })
      );
    })
  );
});

// Fetch requests from cache or network if not found
self.addEventListener('fetch', function(event) {
  console.log("[serviceWorker] Fetching", event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        // console.log("[ServiceWorker] Found in cache", event.request.url);
        return response;
      }
      return fetch(event.request);
    }).catch(err => {
      console.log(err);
    })
  )
})
