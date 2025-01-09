export async function registerServiceWorker(path = "/sw.js") {
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register(path, { scope: "/" })
        } catch (error) {
            console.error(`Service worker registration failed with ${error}`);
        }
    }
}