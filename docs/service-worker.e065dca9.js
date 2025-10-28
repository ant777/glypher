var e=globalThis,t={},n={},r=e.parcelRequirebdb8;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},e.parcelRequirebdb8=r),(0,r.register)("4pGFC",function(e,t){let n="glypher-cache-81";var r=[
'/glypher/',"/glypher/Lexend-VariableFont_wght.bc91a6a1.ttf",
"/glypher/glypher.b4db7529.js",
"/glypher/service-worker.e065dca9.js",
"/glypher/sidebar.66651287.svg",
"/glypher/home.1e18d523.svg",
"/glypher/index.html",
"/glypher/glypher.a8252f2c.js",
"/glypher/speaker.a462f130.svg",
"/glypher/LXGWWenKaiTC-Regular.d5f7c6a1.ttf",
"/glypher/glypher.e8f16c70.css",
"/glypher/img.0dc0e39a.svg"
];self.addEventListener("install",function(e){e.waitUntil(caches.open(n).then(function(e){return console.log("Opened cache"),e.addAll(r).then(function(){__hasUpdate=!0,console.log("All resources have been fetched and cached.")})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=[n];e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(-1===t.indexOf(e))return caches.delete(e)}))}))}),self.addEventListener("fetch",function(e){if("GET"!==e.request.method)return;let t=new URL(e.request.url),n=t.pathname.split("/").at(-1);"custom.css"===n?e.respondWith(async function(){console.warn(n);let e=await fetch(new Request("./custom.json")),t=await e.json(),r="";return console.warn(t),t.map(e=>{let t=e.modes;e.variables&&(r+=e?.variables.map(e=>{if(!e.name.includes("|"))return"";if(t.length>1)return t.map(t=>{let n=t.name,r="";(n.includes("max-width")||n.includes("min-width"))&&(r=`@media only screen and (${n}) {`);let a=e.values[t.modeId];void 0!==a.r?a=`rgba(${Math.round(255*a.r)},${Math.round(255*a.g)},${Math.round(255*a.b)},${a.a})`:"string"!=typeof a&&(a+="px");let s=e.name.replace(/\*/g,".").split("|")[0];return -1!==s.indexOf("/")&&(s=s.substr(s.lastIndexOf("/")+1)),`
 ${r}${s} {
                                ${e.name.split("|")[1]}: ${a} !important;
                            }${r?"}":""}`}).join("");{let t=Object.values(e.values)[0];void 0!==t.r?t=`rgba(${Math.round(255*t.r)},${Math.round(255*t.g)},${Math.round(255*t.b)},${t.a})`:"string"!=typeof t&&(t+="px");let n=e.name.replace(/\*/g,".").split("|")[0];return -1!==n.indexOf("/")&&(n=n.substr(n.lastIndexOf("/")+1)),`
 ${n} {
                            ${e.name.split("|")[1]}: ${t} !important;
                        }`}}).join(""))}),new Response(r,{headers:new Headers({"Content-Type":"text/css; charset=utf-8"})})}()):e.respondWith(caches.match(e.request,{ignoreSearch:!0}).then(function(n){return n||(-1!==t.pathname.indexOf("worker-javascript.js")||-1!==t.pathname.indexOf("worker-html.js")?fetch(new Request(e.request,{credentials:"omit",mode:"cors"})):fetch(e.request))}))})}),r("4pGFC");
//# sourceMappingURL=service-worker.e065dca9.js.map
