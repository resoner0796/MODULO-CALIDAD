// Definimos un nombre y versión para nuestro cache
const CACHE_NAME = 'panel-calidad-v1';

// Listamos los archivos que queremos cachear (el esqueleto de la app)
const urlsToCache = [
  'index.html',
  'manifest.json',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js'
   'icon-512x512.PNG',
   'icon-192x192.PNG'
];

// Evento 'install': se dispara cuando el Service Worker se instala
self.addEventListener('install', event => {
  // Esperamos a que la instalación termine para proceder
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        // Agregamos todos nuestros archivos al cache
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la página solicita un recurso (CSS, JS, imagen, etc.)
self.addEventListener('fetch', event => {
  event.respondWith(
    // Buscamos si el recurso ya está en el cache
    caches.match(event.request)
      .then(response => {
        // Si encontramos una respuesta en el cache, la devolvemos
        if (response) {
          return response;
        }
        // Si no está en cache, lo pedimos a la red
        return fetch(event.request);
      }
    )
  );
});
