const CACHE_NAME = 'shaped-game-v1';

const APP_ASSETS = [
  './',
  './index.html',
  './game.css',
  './main.js',
  './Game.js',
  './Entity.js',
  './Character.js',
  './Player.js',
  './Opponent.js',
  './Shot.js',
  './manifest.json',
  './assets/bueno.png',
  './assets/bueno_muerto.png',
  './assets/clases.png',
  './assets/game_over.png',
  './assets/jefe.png',
  './assets/jefe_muerto.png',
  './assets/malo.png',
  './assets/malo_muerto.png',
  './assets/screenshot.png',
  './assets/shot1.png',
  './assets/shot2.png',
  './assets/you_win.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
