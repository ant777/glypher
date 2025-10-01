var e=globalThis,t={},n={},r=e.parcelRequirebdb8;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,r.call(i.exports,i,i.exports),i.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequirebdb8=r),(0,r.register)("4pGFC",function(e,t){let n="glypher-cache-81";var r=[
'/glypher/',"/glypher/glypher.f5f00a42.js",
"/glypher/Lexend-VariableFont_wght.bc91a6a1.ttf",
"/glypher/glypher.b4db7529.js",
"/glypher/sidebar.66651287.svg",
"/glypher/home.1e18d523.svg",
"/glypher/index.html",
"/glypher/service-worker.6fa8b415.js",
"/glypher/speaker.a462f130.svg",
"/glypher/LXGWWenKaiTC-Regular.d5f7c6a1.ttf",
"/glypher/glypher.e8f16c70.css",
"/glypher/img.0dc0e39a.svg"
];self.addEventListener("install",function(e){e.waitUntil(caches.open(n).then(function(e){return console.log("Opened cache"),e.addAll(r).then(function(){__hasUpdate=!0,console.log("All resources have been fetched and cached.")})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=[n];e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(-1===t.indexOf(e))return caches.delete(e)}))}))}),self.addEventListener("fetch",function(e){if("GET"!==e.request.method)return;let t=new URL(e.request.url);e.respondWith(caches.match(e.request,{ignoreSearch:!0}).then(function(n){return n||(-1!==t.pathname.indexOf("worker-javascript.js")||-1!==t.pathname.indexOf("worker-html.js")?fetch(new Request(e.request,{credentials:"omit",mode:"cors"})):fetch(e.request))}))})}),r("4pGFC");
//# sourceMappingURL=service-worker.6fa8b415.js.map
