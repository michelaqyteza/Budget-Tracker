const CACHE_NAME = "preCache";
const DATA_CACHE_NAME = "data-cache-v1";
const FILES_TO_CACHE = [
	'/',
	'index.html',
	'index.js',
	'db.js',
	'styles.css',
	'/icons/icon-192x192.png',
	'icons/icon-512x512.png',
	'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
];

self.addEventListener("install", function (evt) {

	evt.waitUntil(
		caches
			.open(DATA_CACHE_NAME)
			.then((cache) => cache.addAll(FILES_TO_CACHE))
			.then(self.skipWaiting())
	);



});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
	const currentCaches = [DATA_CACHE_NAME, CACHE_NAME];
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
			})
			.then((cachesToDelete) => {
				return Promise.all(
					cachesToDelete.map((cacheToDelete) => {
						return caches.delete(cacheToDelete);
					})
				);
			})
			.then(() => self.clients.claim())
	);
})