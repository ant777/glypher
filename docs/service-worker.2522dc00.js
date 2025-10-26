var e=globalThis,n={},t={},r=e.parcelRequirebdb8;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var a={id:e,exports:{}};return n[e]=a,r.call(a.exports,a,a.exports),a.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,n){t[e]=n},e.parcelRequirebdb8=r),(0,r.register)("4pGFC",function(e,n){let t="glypher-cache-81";var r=[
'/glypher/',"/glypher/glypher.f5f00a42.js",
"/glypher/Lexend-VariableFont_wght.bc91a6a1.ttf",
"/glypher/glypher.b4db7529.js",
"/glypher/sidebar.66651287.svg",
"/glypher/home.1e18d523.svg",
"/glypher/index.html",
"/glypher/speaker.a462f130.svg",
"/glypher/LXGWWenKaiTC-Regular.d5f7c6a1.ttf",
"/glypher/glypher.e8f16c70.css",
"/glypher/img.0dc0e39a.svg",
"/glypher/service-worker.2522dc00.js"
];self.addEventListener("install",function(e){e.waitUntil(caches.open(t).then(function(e){return console.log("Opened cache"),e.addAll(r).then(function(){__hasUpdate=!0,console.log("All resources have been fetched and cached.")})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=[t];e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(-1===n.indexOf(e))return caches.delete(e)}))}))}),self.addEventListener("fetch",function(e){if("GET"!==e.request.method)return;let n=new URL(e.request.url),t=n.pathname.split("/").at(-1);"custom.css"===t?e.respondWith(async function(){console.warn(t);let e=await fetch(new Request("/custom.json")),n=await e.json(),r="";return console.warn(n),n.collections[0]?.variables&&(r=n.collections[0]?.variables.map(e=>{let n=Object.values(e.valuesByMode)[0];return void 0!==n.r&&(console.warn(n),n=`rgba(${Math.round(255*n.r)},${Math.round(255*n.g)},${Math.round(255*n.b)},${n.a})`),`${e.name.split("|")[0]} {
                    ${e.name.split("|")[1]}: ${n};
                }`}).join("\n")),new Response(r,{headers:new Headers({"Content-Type":"text/css"})})}()):e.respondWith(caches.match(e.request,{ignoreSearch:!0}).then(function(t){return t||(-1!==n.pathname.indexOf("worker-javascript.js")||-1!==n.pathname.indexOf("worker-html.js")?fetch(new Request(e.request,{credentials:"omit",mode:"cors"})):fetch(e.request))}))})}),r("4pGFC");
//# sourceMappingURL=service-worker.2522dc00.js.map
