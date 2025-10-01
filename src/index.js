import { createRoot } from "react-dom/client";
import { App } from "./App";

const serviceWorkerURL = new URL('./service-worker.js', import.meta.url);
window.addEventListener('DOMContentLoaded', (event) => {
    
    if ('serviceWorker' in navigator) {
        // Register service worker
        navigator.serviceWorker.register(serviceWorkerURL, {
            scope: process.env.NODE_ENV.trim() === 'prod' ? '/glypher/' : '/'
        }).then(function (reg) {
            console.log("SW registration succeeded. Scope is " + reg.scope);
            const container = document.getElementById("app");
            const root = createRoot(container)
            root.render(<App />);


        }).catch(function (err) {
            console.error("SW registration failed with error " + err);
        });
    }
});
