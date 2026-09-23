const CACHE_NAME="hephzibah-cyber-lab-v8";
const CORE=["./","./index.html","./css/osint-tree.css","./js/tree-data.js","./js/tree-loader.js","./js/lab-tools.js","./js/cyber-game.js","./js/cyber-arcade.js","./manifest.webmanifest","./robots.txt","./sitemap.xml"];
const EXTERNAL=["fonts.googleapis.com","fonts.gstatic.com","cdnjs.cloudflare.com","unpkg.com","cdn.tailwindcss.com","d3js.org"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url),local=u.origin===location.origin,external=EXTERNAL.includes(u.hostname);if(!(local||external))return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{if(r.ok)caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>local?caches.match("./index.html"):Response.error())))});
