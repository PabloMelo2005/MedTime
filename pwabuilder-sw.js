// This is the "Offline page" service worker
// Nome do arquivo: pwabuilder-sw.js

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";

// ATENÇÃO: Troque este nome pelo nome da sua página de fallback real
const offlineFallbackPage = "offline.html"; // <-- TROQUEI O "ToDo-replace-this-name.html"

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
// --- 🔔 NOVA LÓGICA DE PUSH E SOM ADICIONADA ABAIXO ---
// ===================================================================

/**
 * Escutador de Evento PUSH
 * Este é o código que "acorda" quando o servidor (Netlify Function)
 * envia uma notificação push.
 */
self.addEventListener('push', event => {
  // Tenta extrair os dados (JSON) enviados pelo servidor.
  // Ex: { "name": "Sinvastatina", "quantity": "1" }
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    console.warn('Push event sem JSON, usando fallback.');
    data = { name: 'seu remédio', quantity: '1' };
  }

  const title = `MedTime: Hora de ${data.name || 'seu remédio'}!`;
  const options = {
    // Corpo e Título
    body: `Tomar ${data.quantity || '1'} comprimido(s).`,

    // --- ÍCONE E SOM (IMPORTANTE) ---
    // Você DEVE ter esses arquivos na pasta do seu site no Netlify.
    // Ex: Coloque 'alarm.mp3' na pasta 'sounds/' do seu projeto.
    icon: '/icons/icon-192.png', // Caminho para o ícone
    sound: '/sounds/alarm.mp3',  // <--- ESSA É A LINHA DO SOM

    // Vibração (para celulares Android)
    vibrate: [200, 100, 200, 100, 200],

    // Ações (Botões na notificação)
    actions: [
      { action: 'taken', title: '✅ Tomei' },
      { action: 'snooze', title: '⏰ Adiar 5 min' }
    ],

    // Tag (impede notificações duplicadas se o usuário receber várias)
    tag: 'medtime-reminder'
  };

  // Finalmente, mostra a notificação
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});


/**
 * Escutador de Clique na Notificação
 * Este código roda quando o usuário clica na notificação ou
 * em um dos botões de ação ('Tomei', 'Adiar').
 */
self.addEventListener('notificationclick', event => {
  // Fecha a notificação assim que o usuário clica nela
  event.notification.close();

  if (event.action === 'taken') {
    // O usuário clicou em "Tomei"
    console.log('Usuário marcou como "Tomei"');
    // (No futuro, você pode mandar isso para o servidor)

  } else if (event.action === 'snooze') {
    // O usuário clicou em "Adiar"
    console.log('Usuário pediu para adiar');
    // (No futuro, você pode agendar outro push para 5 min)

  } else {
    // O usuário clicou no CORPO da notificação (não nos botões)
    // Tenta focar/abrir a aba do aplicativo
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        // Tenta focar uma aba já aberta
        for (let i = 0; i < clientList.length; i++) {
          let client = clientList[i];
          // (Troque '/' se a URL principal do seu app for outra)
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // Se nenhuma aba estiver aberta, abre uma nova
        if (clients.openWindow) {
          return clients.openWindow('/'); // (Troque '/')
        }
      })
    );
  }
});