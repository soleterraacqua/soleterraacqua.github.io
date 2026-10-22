const CACHE_NAME = "sole-terra-acqua-v39";

// Solo l'essenziale per far comparire il sito subito, anche senza rete.
// Tutto il resto (foto della galleria, immagini del catalogo) viene messo in
// cache dal gestore "fetch" qui sotto la prima volta che serve davvero, cosi'
// la prima visita non scarica decine di megabyte sul telefono del cliente.
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/logo-completo.webp",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/foto-campo-hero.webp",
  "./assets/foto-campo-hero-mobile.webp"
];

self.addEventListener("install", event => {
  event.waitUntil(
    // "reload": i file dell'installazione li prendo dal sito, mai da una copia vecchia del browser
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL.map(indirizzo => new Request(indirizzo, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

// Le pagine col codice nuovo rispondono "ho-capito" e si ricaricano da sole quando e' il momento
// giusto (non durante consegna e conferma). Quelle col codice vecchio non rispondono: le ricarico io.
const hannoCapito = new Set();
self.addEventListener("message", event => {
  if (event.data && event.data.tipo === "ho-capito" && event.source) hannoCapito.add(event.source.id);
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const chiavi = await caches.keys();
    const cEraUnaVersionePrima = chiavi.some(chiave => chiave !== CACHE_NAME);
    await Promise.all(chiavi.filter(chiave => chiave !== CACHE_NAME).map(chiave => caches.delete(chiave)));
    await self.clients.claim();
    // chi apre il sito per la prima volta ha gia' tutto nuovo: niente ricariche inutili
    if (!cEraUnaVersionePrima) return;
    const finestre = await self.clients.matchAll({ type: "window" });
    finestre.forEach(finestra => finestra.postMessage({ tipo: "nuova-versione" }));
    await new Promise(fatto => setTimeout(fatto, 1500));
    // senza "await": la ricarica deve partire DOPO che questa attivazione e' finita,
    // altrimenti la pagina aspetta l'attivazione e l'attivazione aspetta la pagina
    finestre
      .filter(finestra => !hannoCapito.has(finestra.id))
      .forEach(finestra => finestra.navigate(finestra.url).catch(() => {}));
  })());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  // la settimana (giorni e verdure) deve arrivare sempre fresca dal sito, e le chiamate
  // a GitHub della dashboard non vanno mai in cache: le lascio passare dirette
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname.endsWith("/settimana.json")) return;

  // pagine, codice e stili: prima la rete, cosi' ogni novita' arriva subito a tutti;
  // la copia salvata serve solo quando manca la rete. Prima era il contrario e le novita'
  // si vedevano solo all'apertura successiva.
  const codice = event.request.mode === "navigate" || url.pathname.endsWith("/") || /\.(html|js|css|webmanifest)$/.test(url.pathname);
  if (codice) {
    const richiesta = event.request.mode === "navigate" ? event.request.url : event.request;
    event.respondWith(
      fetch(richiesta, { cache: "no-cache" }).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => caches.match(event.request, { ignoreSearch: true }).then(cached => cached || caches.match("./index.html")))
    );
    return;
  }

  // immagini e il resto: dalla copia salvata (non cambiano), altrimenti dalla rete
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
