// BAU Field Analysis System — Service Worker v11
const CACHE_NAME = 'bau-field-v11';
const BASE = '/fbi-1723-bau';
const ASSETS = [BASE+'/',BASE+'/index.html',BASE+'/manifest.json',BASE+'/icon-192.png',BASE+'/icon-512.png'];
self.addEventListener('install', function(e){ e.waitUntil(caches.open(CACHE_NAME).then(function(c){ return c.addAll(ASSETS); })); self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(caches.keys().then(function(keys){ return Promise.all(keys.filter(function(k){ return k!==CACHE_NAME; }).map(function(k){ return caches.delete(k); })); })); self.clients.claim(); });
self.addEventListener('fetch', function(e){ if(e.request.url.includes('thebluealliance.com')) return; e.respondWith(caches.match(e.request).then(function(cached){ if(cached) return cached; return fetch(e.request).then(function(r){ if(r&&r.status===200){var copy=r.clone();caches.open(CACHE_NAME).then(function(c){c.put(e.request,copy).catch(function(){});});} return r;}).catch(function(){ return caches.match(BASE+'/index.html');}); })); });
