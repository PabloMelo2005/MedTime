// This is the "Offline page" service worker
// Nome do arquivo: pwabuilder-sw.js

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";

const offlineFallbackPage = "offline.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});


// ===================================================================
// --- 🔔 LÓGICA DE PUSH E SOM ---
// ===================================================================

self.addEventListener('push', event => {

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    console.warn('Push event sem JSON, usando fallback.');
    data = { name: 'seu remédio', quantity: '1' };
  }

  const title = `MedTime: Hora de ${data.name || 'seu remédio'}!`;

  const options = {
    body: `Tomar ${data.quantity || '1'} comprimido(s).`,
    icon: 'AppImages/android/android-launchericon-192-192.png',
    vibrate: [200, 100, 200, 100, 200],
    actions: [
      { action: 'taken', title: '✅ Tomei' },
      { action: 'snooze', title: '⏰ Adiar 5 min' }
    ],
    tag: 'medtime-reminder'
    // 'sound' removido (não funciona em browsers)
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});


self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'taken') {
    console.log('Usuário marcou como "Tomei"');

  } else if (event.action === 'snooze') {
    console.log('Usuário pediu para adiar');

  } else {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        for (let i = 0; i < clientList.length; i++) {
          let client = clientList[i];
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});