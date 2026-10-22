// Liste del giro (consegne e raccolta) per la dashboard: anteprima in pagina, file PDF e
// chilometri tra una consegna e la successiva.
// Il PDF e' scritto a mano (testo, linee e riquadri con i font Helvetica di base): niente librerie
// esterne da scaricare. I km arrivano da OpenStreetMap (Nominatim per gli indirizzi, OSRM per le strade):
// si mandano solo indirizzo e localita', mai nome o telefono.

const A4 = { w: 595.28, h: 841.89 };
const MARGINE = 42;
const UTILE = A4.w - 2 * MARGINE;
const FONDO = 58;

const VERDE = "0.204 0.271 0.122";
const TERRACOTTA = "0.722 0.4 0.298";
const INCHIOSTRO = "0.122 0.176 0.141";
const GRIGIO = "0.408 0.451 0.420";
const LINEA = "0.85 0.84 0.80";
const BIANCO = "1 1 1";
const GRANO = "0.969 0.890 0.643";

// larghezze dei caratteri Helvetica (millesimi di em, dal 32 "spazio" al 126 "~"): servono per
// andare a capo al punto giusto e allineare a destra i numeri
const cifre = Array(10).fill(556);
const HELVETICA = [278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, ...cifre, 278, 278, 584, 584, 584, 556, 1015,
  667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611,
  278, 278, 278, 469, 556, 333,
  556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500,
  334, 260, 334, 584];
const HELVETICA_GRASSETTO = [278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278, ...cifre, 333, 333, 584, 584, 584, 611, 975,
  722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611,
  333, 278, 333, 584, 556, 333,
  556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611, 611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500,
  389, 280, 389, 584];
const ALTRI = { "€": 556, "–": 556, "—": 1000, "·": 278, "×": 584, "ª": 370, "’": 278, "‘": 278, "“": 500, "”": 500, "…": 1000, " ": 278 };

function larghezza(testo, corpo, grassetto = false) {
  const tabella = grassetto ? HELVETICA_GRASSETTO : HELVETICA;
  let millesimi = 0;
  for (const c of String(testo)) {
    // le lettere accentate sono larghe come quelle senza accento
    const base = c.normalize("NFD")[0];
    const codice = base.charCodeAt(0);
    millesimi += ALTRI[c] ?? (codice >= 32 && codice <= 126 ? tabella[codice - 32] : 556);
  }
  return millesimi / 1000 * corpo;
}

function aCapo(testo, massimo, corpo, grassetto = false) {
  const righe = [];
  let riga = "";
  for (const parola of String(testo).split(/\s+/).filter(Boolean)) {
    const prova = riga ? `${riga} ${parola}` : parola;
    if (larghezza(prova, corpo, grassetto) <= massimo) { riga = prova; continue; }
    if (riga) righe.push(riga);
    riga = parola;
    // una parola piu' lunga della riga (un indirizzo senza spazi): la spezzo
    while (larghezza(riga, corpo, grassetto) > massimo && riga.length > 1) {
      let taglio = riga.length - 1;
      while (taglio > 1 && larghezza(riga.slice(0, taglio), corpo, grassetto) > massimo) taglio--;
      righe.push(riga.slice(0, taglio));
      riga = riga.slice(taglio);
    }
  }
  if (riga) righe.push(riga);
  return righe.length ? righe : [""];
}

// testo PDF in codifica WinAnsi: lettere accentate, €, trattini e virgolette; il resto diventa "?"
const WINANSI = { "€": 128, "…": 133, "‘": 145, "’": 146, "“": 147, "”": 148, "•": 149, "–": 150, "—": 151 };
function stringaPdf(testo) {
  let out = "";
  for (const c of String(testo)) {
    let codice = WINANSI[c] ?? c.codePointAt(0);
    if (codice > 255 || (codice >= 127 && codice < 160 && !(c in WINANSI))) codice = 63;
    if (c === "(" || c === ")" || c === "\\") out += `\\${c}`;
    else if (codice < 32) out += " ";
    else if (codice > 126) out += `\\${codice.toString(8).padStart(3, "0")}`;
    else out += String.fromCharCode(codice);
  }
  return `(${out})`;
}

const n2 = numero => Number(numero).toFixed(2);

export function creaPdf(documento) {
  const pagine = [];
  let ops;
  let y;
  const opTesto = (x, yy, testo, corpo, font = "F1", colore = INCHIOSTRO) =>
    `BT /${font} ${corpo} Tf ${colore} rg 1 0 0 1 ${n2(x)} ${n2(yy)} Tm ${stringaPdf(testo)} Tj ET`;
  const testo = (...argomenti) => ops.push(opTesto(...argomenti));
  const aDestra = (testoDestra, yy, corpo, font, colore, margineDestro = 0) =>
    testo(A4.w - MARGINE - margineDestro - larghezza(testoDestra, corpo, font === "F2"), yy, testoDestra, corpo, font, colore);
  const linea = (y1, colore = LINEA, spessore = 0.6) =>
    ops.push(`${colore} RG ${spessore} w ${n2(MARGINE)} ${n2(y1)} m ${n2(A4.w - MARGINE)} ${n2(y1)} l S`);
  const riquadro = (yy, altezza, colore) => ops.push(`${colore} rg ${n2(MARGINE)} ${n2(yy)} ${n2(UTILE)} ${n2(altezza)} re f`);
  const nuovaPagina = () => {
    ops = [];
    pagine.push(ops);
    y = A4.h - 46;
    if (pagine.length > 1) {
      testo(MARGINE, y - 8, documento.titolo, 9, "F2", GRIGIO);
      y -= 24;
    }
  };
  const serve = altezza => { if (y - altezza < FONDO) nuovaPagina(); };

  nuovaPagina();
  testo(MARGINE, y - 18, documento.titolo, 20, "F2", VERDE);
  y -= 36;
  testo(MARGINE, y, documento.sottotitolo, 9.5, "F1", GRIGIO);
  y -= 12;
  linea(y, VERDE, 1.2);
  y -= 16;

  for (const blocco of documento.blocchi) {
    if (blocco.tipo === "giorno") {
      serve(80);
      y -= 4;
      riquadro(y - 22, 22, VERDE);
      testo(MARGINE + 10, y - 15, blocco.testo, 11, "F2", BIANCO);
      if (blocco.destra) aDestra(blocco.destra, y - 15, 9.5, "F2", GRANO, 10);
      y -= 36;
    } else if (blocco.tipo === "fermata") {
      const spazioDestra = blocco.destra ? larghezza(blocco.destra, 10.5, true) + 14 : 0;
      const titoli = aCapo(blocco.titolo, UTILE - 26 - spazioDestra, 11, true);
      const righe = blocco.righe.flatMap(riga => aCapo(riga, UTILE - 26, 9.5));
      serve(titoli.length * 14 + righe.length * 12.5 + 14);
      testo(MARGINE, y - 11, `${blocco.numero}`, 12, "F2", TERRACOTTA);
      if (blocco.destra) aDestra(blocco.destra, y - 11, 10.5, "F2", VERDE);
      titoli.forEach(riga => { testo(MARGINE + 26, y - 11, riga, 11, "F2", INCHIOSTRO); y -= 14; });
      righe.forEach(riga => { testo(MARGINE + 26, y - 9, riga, 9.5, "F1", INCHIOSTRO); y -= 12.5; });
      y -= 6;
      linea(y);
      y -= 10;
    } else if (blocco.tipo === "sezione") {
      serve(46);
      y -= 6;
      testo(MARGINE, y - 9, blocco.testo, 9, "F2", TERRACOTTA);
      y -= 18;
    } else if (blocco.tipo === "voce") {
      const spazioDestra = larghezza(blocco.destra || "", 10.5, true) + 16;
      const righe = aCapo(blocco.testo, UTILE - spazioDestra, 10.5);
      serve(righe.length * 14 + 8);
      if (blocco.destra) aDestra(blocco.destra, y - 10, 10.5, "F2", VERDE);
      righe.forEach(riga => { testo(MARGINE, y - 10, riga, 10.5, "F1", INCHIOSTRO); y -= 14; });
      y -= 3;
      linea(y, LINEA, 0.4);
      y -= 5;
    } else if (blocco.tipo === "nota" || blocco.tipo === "vuoto") {
      const corpo = blocco.tipo === "vuoto" ? 11 : 8.8;
      const righe = aCapo(blocco.testo, UTILE, corpo);
      serve(righe.length * (corpo + 3) + 10);
      y -= 4;
      righe.forEach(riga => { testo(MARGINE, y - corpo, riga, corpo, "F3", GRIGIO); y -= corpo + 3; });
      y -= 6;
    }
  }

  // piede di ogni pagina, ora che si sa quante sono
  pagine.forEach((pagina, indice) => {
    pagina.push(`${LINEA} RG 0.6 w ${n2(MARGINE)} 40 m ${n2(A4.w - MARGINE)} 40 l S`);
    pagina.push(opTesto(MARGINE, 28, documento.piede, 8, "F1", GRIGIO));
    const numero = `pagina ${indice + 1} di ${pagine.length}`;
    pagina.push(opTesto(A4.w - MARGINE - larghezza(numero, 8), 28, numero, 8, "F1", GRIGIO));
  });
  return componi(pagine, documento.titolo);
}

function componi(pagine, titolo) {
  const oggetti = [];
  const font = nome => `<< /Type /Font /Subtype /Type1 /BaseFont /${nome} /Encoding /WinAnsiEncoding >>`;
  oggetti[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  oggetti[2] = `<< /Type /Pages /Kids [${pagine.map((_, i) => `${8 + 2 * i} 0 R`).join(" ")}] /Count ${pagine.length} >>`;
  oggetti[3] = font("Helvetica");
  oggetti[4] = font("Helvetica-Bold");
  oggetti[5] = font("Helvetica-Oblique");
  oggetti[6] = `<< /Title ${stringaPdf(titolo)} /Author ${stringaPdf("Sole Terra Acqua")} >>`;
  pagine.forEach((ops, i) => {
    const flusso = ops.join("\n");
    oggetti[7 + 2 * i] = `<< /Length ${flusso.length} >>\nstream\n${flusso}\nendstream`;
    oggetti[8 + 2 * i] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4.w} ${A4.h}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${7 + 2 * i} 0 R >>`;
  });
  let pdf = "%PDF-1.4\n%âãÏÓ\n";
  const posizioni = [];
  for (let numero = 1; numero < oggetti.length; numero++) {
    posizioni[numero] = pdf.length;
    pdf += `${numero} 0 obj\n${oggetti[numero]}\nendobj\n`;
  }
  const inizioXref = pdf.length;
  pdf += `xref\n0 ${oggetti.length}\n0000000000 65535 f \n`;
  for (let numero = 1; numero < oggetti.length; numero++) pdf += `${String(posizioni[numero]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${oggetti.length} /Root 1 0 R /Info 6 0 R >>\nstartxref\n${inizioXref}\n%%EOF\n`;
  return Uint8Array.from(pdf, carattere => carattere.charCodeAt(0));
}

// stessa lista, per l'anteprima nella dashboard
export function documentoHtml(documento) {
  const e = testo => String(testo ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
  const blocchi = documento.blocchi.map(blocco => {
    if (blocco.tipo === "giorno") return `<h4 class="foglio-giorno"><span>${e(blocco.testo)}</span><small>${e(blocco.destra)}</small></h4>`;
    if (blocco.tipo === "fermata") return `
      <div class="foglio-fermata">
        <b class="foglio-numero">${e(blocco.numero)}</b>
        <div><strong>${e(blocco.titolo)}</strong>${blocco.righe.map(riga => `<span>${e(riga)}</span>`).join("")}</div>
        <em>${e(blocco.destra)}</em>
      </div>`;
    if (blocco.tipo === "sezione") return `<h5 class="foglio-sezione">${e(blocco.testo)}</h5>`;
    if (blocco.tipo === "voce") return `<div class="foglio-voce"><span>${e(blocco.testo)}</span><b>${e(blocco.destra)}</b></div>`;
    return `<p class="foglio-${blocco.tipo}">${e(blocco.testo)}</p>`;
  }).join("");
  return `<header class="foglio-testa"><h3>${e(documento.titolo)}</h3><p>${e(documento.sottotitolo)}</p></header>${blocchi}`;
}

// ---------- chilometri ----------
const CACHE_COORDINATE = "sole-terra-acqua-coordinate";
// le localita' come le chiama OpenStreetMap
const NOMI_ZONE = { "San Martino": "San Martino al Cimino", Quercia: "La Quercia" };
let ultimaChiamata = 0;

// i servizi gratuiti di OpenStreetMap chiedono al massimo una richiesta al secondo
async function turno() {
  const attesa = ultimaChiamata + 1100 - Date.now();
  if (attesa > 0) await new Promise(fatto => setTimeout(fatto, attesa));
  ultimaChiamata = Date.now();
}

async function chiedi(indirizzo) {
  await turno();
  const ferma = new AbortController();
  const timer = setTimeout(() => ferma.abort(), 12000);
  try {
    const risposta = await fetch(indirizzo, { signal: ferma.signal });
    if (!risposta.ok) throw new Error(`HTTP ${risposta.status}`);
    return await risposta.json();
  } finally {
    clearTimeout(timer);
  }
}

async function trova(testo) {
  // solo nella zona tra Vetralla, Vitorchiano e San Martino al Cimino
  const risultati = await chiedi(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=it&accept-language=it&viewbox=11.85,42.58,12.32,42.25&bounded=1&q=${encodeURIComponent(testo)}`);
  const [primo] = risultati || [];
  return primo ? { lat: Number(primo.lat), lon: Number(primo.lon) } : null;
}

async function coordinate(indirizzo, zona, cache) {
  const localita = NOMI_ZONE[zona] || zona || "Viterbo";
  const chiave = `${indirizzo}|${localita}`.toLowerCase().replace(/\s+/g, " ").trim();
  if (cache[chiave]) return cache[chiave];
  let punto = await trova(localita === "Viterbo" ? `${indirizzo}, Viterbo` : `${indirizzo}, ${localita}, Viterbo`);
  let approssimato = false;
  if (!punto) {
    // indirizzo scritto male o non in mappa: uso il centro della localita' e lo segnalo
    punto = await trova(`${localita}, Viterbo`);
    approssimato = true;
  }
  if (!punto) return null;
  cache[chiave] = { ...punto, approssimato };
  return cache[chiave];
}

function inLineaDAria(a, b) {
  const rad = gradi => gradi * Math.PI / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

// tappe: [{ indirizzo, zona }] nell'ordine del giro. km[i] = km dalla tappa precedente trovata
export async function calcolaKm(tappe) {
  let cache = {};
  try { cache = JSON.parse(localStorage.getItem(CACHE_COORDINATE)) || {}; } catch (_) {}
  const punti = [];
  try {
    for (const tappa of tappe) punti.push(await coordinate(tappa.indirizzo, tappa.zona, cache));
  } catch (_) {
    return { km: tappe.map(() => null), approssimate: tappe.map(() => false), metodo: "offline" };
  }
  try { localStorage.setItem(CACHE_COORDINATE, JSON.stringify(cache)); } catch (_) {}

  const km = tappe.map(() => null);
  const trovati = punti.map((punto, indice) => (punto ? indice : -1)).filter(indice => indice >= 0);
  let metodo = "strada";
  if (trovati.length >= 2) {
    try {
      const percorso = trovati.map(indice => `${punti[indice].lon.toFixed(5)},${punti[indice].lat.toFixed(5)}`).join(";");
      const dati = await chiedi(`https://router.project-osrm.org/route/v1/driving/${percorso}?overview=false`);
      if (dati.code !== "Ok") throw new Error(dati.code);
      dati.routes[0].legs.forEach((tratto, k) => { km[trovati[k + 1]] = tratto.distance / 1000; });
    } catch (_) {
      // servizio delle strade non raggiungibile: almeno la distanza in linea d'aria
      metodo = "aria";
      trovati.slice(1).forEach((indice, k) => { km[indice] = inLineaDAria(punti[trovati[k]], punti[indice]); });
    }
  }
  return {
    km,
    approssimate: punti.map(punto => !punto || punto.approssimato),
    mancanti: punti.map(punto => !punto),
    metodo
  };
}
