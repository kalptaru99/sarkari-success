/**
 * Sarkari Success Service Worker
 * Handles background push notifications.
 */

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = {
      title: '🏛️ Sarkari Success',
      body: 'New government job alert!',
      url: 'https://sarkarisuccess.com',
    };
  }

  const options = {
    body: data.body || 'New government job alert!',
    icon: data.icon || '/icon-192.png',
    badge: data.badge || '/badge-72.png',
    tag: data.tag || 'sarkari-alert',
    renotify: data.renotify !== false,
    data: { url: data.url || 'https://sarkarisuccess.com' },
    actions: [
      { action: 'view', title: 'View Jobs' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '🏛️ Sarkari Success', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const url = event.notification.data?.url || 'https://sarkarisuccess.com';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Focus existing tab if already open
      for (const client of windowClients) {
        if (client.url.startsWith('https://sarkarisuccess.com') && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      // Otherwise open new tab
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
