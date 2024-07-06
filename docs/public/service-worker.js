if ('serviceWorker' in navigator) {
  self.addEventListener('install', () => {
    self.skipWaiting();
  });
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .then(() => navigator.serviceWorker.getRegistrations())
        .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister()))),
    );
  });
}
