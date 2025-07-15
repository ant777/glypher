var e=globalThis,n={},t={},r=e.parcelRequirebdb8;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,r.call(i.exports,i,i.exports),i.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){t[e]=n},e.parcelRequirebdb8=r),(0,r.register)("4pGFC",function(e,n){let t="glypher-cache-81";var r=[
'/glypher/',"/glypher/glypher.8ac7d462.js",
"/glypher/glypher.91bd9c7f.css",
"/glypher/home.1e18d523.svg",
"/glypher/img.0dc0e39a.svg",
"/glypher/index.html",
"/glypher/Lexend-VariableFont_wght.bc91a6a1.ttf",
"/glypher/service-worker.68862d62.js",
"/glypher/sidebar.66651287.svg",
"/glypher/speaker.a462f130.svg"
];self.addEventListener("install",function(e){e.waitUntil(caches.open(t).then(function(e){return console.log("Opened cache"),e.addAll(r).then(function(){__hasUpdate=!0,console.log("All resources have been fetched and cached.")})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=[t];e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(-1===n.indexOf(e))return caches.delete(e)}))}))}),self.addEventListener("fetch",function(e){if("GET"!==e.request.method)return;let n=new URL(e.request.url);console.warn(e.request.url),e.respondWith(caches.match(e.request,{ignoreSearch:!0}).then(function(t){return(console.warn(t),t)?t:-1!==n.pathname.indexOf("worker-javascript.js")||-1!==n.pathname.indexOf("worker-html.js")?fetch(new Request(e.request,{credentials:"omit",mode:"cors"})):fetch(e.request)}))})}),r("4pGFC");
//# sourceMappingURL=service-worker.68862d62.js.map
