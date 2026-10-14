// NACHTKROON: bewaart het spel op het toestel, zodat het ook zonder internet start. Gemaakt door nachtkroon-art/maak-app.js.
const CACHE='nachtkroon-fd46231c516f';
const BESTANDEN=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(BESTANDEN)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// eerst uit de bewaarde kopie (snel, ook zonder internet); een nieuwe versie komt via een nieuwe sw.js
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>caches.match('index.html'))));
});
