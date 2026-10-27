// Cassetta 3D nel compositore.
// Una cassetta vera, costruita asse per asse col legno delle foto, che si gira col dito
// o col mouse. Le verdure scelte ci cadono dentro con una fisica semplice: rimbalzano,
// rotolano e vanno a occupare gli spazi liberi tra le altre. Le verdure sono le stesse foto
// ritagliate del catalogo, sempre rivolte verso chi guarda, con un'ombra morbida sotto, ognuna
// in proporzione con le altre (cm dei prodotti in app.js). Piu' la cassetta e' piena, piu' le verdure
// si fanno un po' piu' piccole: cosi' stanno una accanto all'altra sul fondo invece di impilarsi in
// bilico (sembravano galleggiare). L'immagine pero' e' piu' grande del suo posto sul fondo (vista):
// le verdure si sovrappongono un po', come in una cassetta piena, e la cassetta non sembra vuota.
// Se qualcosa non va (niente WebGL, errore), il sito resta con la cassetta 2D.

import * as THREE from "./assets/vendor/three.module.min.js";

// misure interne in metri: larghezza, profondita', altezza, assi per parete e loro altezza;
// vista = quanto l'immagine di una verdura e' piu' grande del suo posto sul fondo (le cassette
// profonde si guardano piu' dall'alto e piu' da lontano: le verdure vanno ingrandite di piu')
const MISURE = {
  piccola: { l: 0.50, p: 0.34, a: 0.100, assi: 2, hp: 0.042, vista: 1.25 },
  media:   { l: 0.56, p: 0.36, a: 0.230, assi: 3, hp: 0.065, vista: 1.35 },
  grande:  { l: 0.58, p: 0.38, a: 0.310, assi: 4, hp: 0.068, vista: 1.42 }
};
const SPESSORE = 0.012;
const PALO = 0.032;
const RAGGIO = 0.08;           // raggio di una verdura, per la fisica
const GIRO_MAX = 0.5;          // quanto puo' inclinarsi l'immagine di una verdura (radianti)
const GRAVITA = -5.2;          // un po' meno della vera, per vedere bene la caduta
const PROPORZIONE_MARCHIO = 1702 / 151;
const STRETTE = 0.8;           // quanto si incastrano due verdure vicine (1 = si toccano appena)
const RIMPICCIOLISCI_FINO = 0.66;   // con tante verdure si fanno piu' piccole, ma non oltre

// il fondo su cui si appoggiano: nelle cassette media e grande, profonde, le verdure starebbero
// sotto le assi davanti e non si vedrebbero; il fondo di doghe e' rialzato (doppio fondo), quasi
// all'orlo: le verdure piccole davanti (castagne, pomodori) restano sopra l'asse alta
const fondoUtile = m => Math.max(SPESSORE, m.a - 1.15 * RAGGIO);
// quante verdure "medie" stanno sul fondo una accanto all'altra, a grandezza piena
const postiSulFondo = m => (m.l * m.p) / (2.45 * RAGGIO) ** 2;
// posti = quanti posti di verdura media occupano quelle scelte (una lattuga romana ne prende di piu')
const densita = (m, posti) => Math.max(RIMPICCIOLISCI_FINO, Math.min(1, Math.sqrt(postiSulFondo(m) / Math.max(1, posti))));
// grandezza vera: cm e' il lato piu' lungo di quello che si vede nella foto (in app.js); una verdura media
// della foto e' grande 19 cm
const CM_MEDI = 19;
const LATO_MEDIO = RAGGIO * 2 * 1.32;   // lato dell'immagine di una verdura media
const ALTEZZA_MEDIA = 0.16;              // metri: piu' alte vanno dietro, piu' basse davanti
const quantoGrande = prodotto => (prodotto?.cm ? prodotto.cm / CM_MEDI : 1);

// l'ombra morbida sotto ogni verdura: la appoggia, anche quando l'ombra del sole cade di lato
const trama = (() => {
  const tela = document.createElement("canvas");
  tela.width = tela.height = 64;
  const ctx = tela.getContext("2d");
  const sfumatura = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  sfumatura.addColorStop(0, "rgba(40, 28, 16, 0.75)");
  sfumatura.addColorStop(0.5, "rgba(40, 28, 16, 0.32)");
  sfumatura.addColorStop(1, "rgba(40, 28, 16, 0)");
  ctx.fillStyle = sfumatura;
  ctx.fillRect(0, 0, 64, 64);
  return tela;
})();

const caricatore = new THREE.TextureLoader();
const carica = url => new Promise((ok, ko) => caricatore.load(url, ok, undefined, ko));

export async function avviaCassetta3D({ contenitori, prodotti }) {
  const tela = document.createElement("canvas");
  tela.className = "cassetta-3d";
  tela.setAttribute("aria-hidden", "true");
  const renderer = new THREE.WebGLRenderer({ canvas: tela, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const [legnoImg, marchioImg] = await Promise.all([carica("assets/legno.webp"), carica("assets/marchio-riga.png")]);
  legnoImg.colorSpace = THREE.SRGBColorSpace;
  legnoImg.wrapS = THREE.RepeatWrapping;
  marchioImg.colorSpace = THREE.SRGBColorSpace;
  marchioImg.anisotropy = 4;

  const fogli = {};
  const foglio = url => (fogli[url] ||= carica(url).then(t => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; }));

  // ---------------------------------------------------------------- scena
  const scena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.05, 20);
  scena.add(new THREE.HemisphereLight(0xfff4e2, 0x6b5238, 1.15));
  const sole = new THREE.DirectionalLight(0xffffff, 1.7);
  sole.position.set(-0.55, 1.5, 0.95);
  sole.castShadow = true;
  sole.shadow.mapSize.set(1024, 1024);
  Object.assign(sole.shadow.camera, { left: -0.6, right: 0.6, top: 0.6, bottom: -0.6, near: 0.2, far: 4 });
  sole.shadow.bias = -0.0006;
  sole.shadow.normalBias = 0.015;
  scena.add(sole);

  const terra = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.ShadowMaterial({ opacity: 0.16 }));
  terra.rotation.x = -Math.PI / 2;
  terra.receiveShadow = true;
  scena.add(terra);

  const mondo = new THREE.Group();          // cassetta + verdure: e' questo che si gira
  scena.add(mondo);
  let cassetta = null;
  let misura = MISURE.media;
  let scatola = "";
  let cadutaCassetta = 1;     // 0 = appena cambiata (in alto), 1 = appoggiata

  const legno = (() => {
    const cache = new Map();
    return (seme, verticale = false) => {
      const chiave = `${seme}-${verticale}`;
      if (cache.has(chiave)) return cache.get(chiave);
      const t = legnoImg.clone();
      t.offset.x = (seme * 0.137) % 1;
      if (verticale) { t.center.set(0.5, 0.5); t.rotation = Math.PI / 2; }
      const tinta = 0.9 + ((seme * 7) % 10) / 70;
      const m = new THREE.MeshStandardMaterial({ map: t, roughness: 0.86, metalness: 0, color: new THREE.Color(tinta, tinta * 0.985, tinta * 0.96) });
      cache.set(chiave, m);
      return m;
    };
  })();

  function costruisciCassetta(m) {
    const g = new THREE.Group();
    const S = SPESSORE;
    const asse = (w, h, d, x, y, z, mat) => {
      const pezzo = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      pezzo.position.set(x, y, z);
      pezzo.castShadow = pezzo.receiveShadow = true;
      g.add(pezzo);
      return pezzo;
    };
    const nDoghe = 5, fessura = 0.012, larghDoga = (m.p - fessura * (nDoghe - 1)) / nDoghe;
    const yFondo = fondoUtile(m) - S / 2;
    for (let i = 0; i < nDoghe; i++) asse(m.l, S, larghDoga, 0, yFondo, -m.p / 2 + larghDoga / 2 + i * (larghDoga + fessura), legno(i));
    const vuoto = m.assi > 1 ? (m.a - m.assi * m.hp) / (m.assi - 1) : 0;
    for (let k = 0; k < m.assi; k++) {
      const y = m.a - m.hp / 2 - k * (m.hp + vuoto);
      asse(m.l + 2 * S, m.hp, S, 0, y, m.p / 2 + S / 2, legno(10 + k));
      asse(m.l + 2 * S, m.hp, S, 0, y, -m.p / 2 - S / 2, legno(20 + k));
      asse(S, m.hp, m.p, -m.l / 2 - S / 2, y, 0, legno(30 + k));
      asse(S, m.hp, m.p, m.l / 2 + S / 2, y, 0, legno(40 + k));
    }
    const hPalo = m.a + 0.022;
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      asse(PALO, hPalo, PALO, sx * (m.l / 2 - PALO / 2), hPalo / 2, sz * (m.p / 2 - PALO / 2), legno(50 + sx + sz * 2, true));
    }
    // marchio "SOLE TERRA ACQUA" sull'asse alta davanti
    const largh = Math.min(m.l * 0.8, (m.hp * 0.86) * PROPORZIONE_MARCHIO);
    const marchio = new THREE.Mesh(
      new THREE.PlaneGeometry(largh, largh / PROPORZIONE_MARCHIO),
      new THREE.MeshStandardMaterial({ map: marchioImg, transparent: true, depthWrite: false, roughness: 0.9, polygonOffset: true, polygonOffsetFactor: -2 })
    );
    marchio.position.set(0, m.a - m.hp / 2, m.p / 2 + S + 0.0006);
    g.add(marchio);
    return g;
  }

  // ---------------------------------------------------------------- verdure
  const verdure = [];               // { chiave, id, pos, vel, r, mesh, ombra, giro, entrata }
  const inUscita = [];
  const geometria = new THREE.PlaneGeometry(1, 1);
  const tramaOmbra = new THREE.CanvasTexture(trama);

  // Quanto e' larga e alta la parte colorata del ritaglio (lo sfondo trasparente non conta):
  // x e y misurate dal centro, l e a da un bordo all'altro, in frazioni del ritaglio.
  const ingombri = new Map();
  function parteColorata(base, prodotto) {
    if (ingombri.has(prodotto.id)) return ingombri.get(prodotto.id);
    let esito = { x: 0.5, y: 0.5, l: 0.9, a: 0.9 };
    try {
      const img = base.image;
      const cw = img.width / prodotto.cols, ch = img.height / prodotto.rows;
      const W = 96, H = Math.max(8, Math.round(W * ch / cw));
      const tela2d = document.createElement("canvas");
      tela2d.width = W; tela2d.height = H;
      const ctx = tela2d.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, prodotto.x * cw, prodotto.y * ch, cw, ch, 0, 0, W, H);
      const dati = ctx.getImageData(0, 0, W, H).data;
      let sx = W, dx = -1, alto = H, basso = -1;
      for (let yy = 0; yy < H; yy++) {
        for (let xx = 0; xx < W; xx++) {
          if (dati[(yy * W + xx) * 4 + 3] < 107) continue;   // come alphaTest 0.42
          if (xx < sx) sx = xx; if (xx > dx) dx = xx;
          if (yy < alto) alto = yy; if (yy > basso) basso = yy;
        }
      }
      if (dx >= 0) {
        esito = {
          x: Math.max(0.5 - sx / W, (dx + 1) / W - 0.5),
          y: Math.max(0.5 - alto / H, (basso + 1) / H - 0.5),
          l: (dx + 1 - sx) / W,
          a: (basso + 1 - alto) / H
        };
      }
    } catch (_) {}
    ingombri.set(prodotto.id, esito);
    return esito;
  }

  async function creaVerdura(chiave, id) {
    const prodotto = prodotti.find(p => p.id === id);
    if (!prodotto) return null;
    const base = await foglio(prodotto.sheet);
    const t = base.clone();
    t.repeat.set(1 / prodotto.cols, 1 / prodotto.rows);
    t.offset.set(prodotto.x / prodotto.cols, 1 - (prodotto.y + 1) / prodotto.rows);
    t.needsUpdate = true;
    const proporzione = (base.image.width / prodotto.cols) / (base.image.height / prodotto.rows);
    const mat = new THREE.MeshBasicMaterial({ map: t, alphaTest: 0.42, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometria, mat);
    mesh.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: t, alphaTest: 0.42 });
    mesh.castShadow = true;
    // in proporzione: il lato piu' lungo della parte colorata deve misurare i cm veri (prima ogni foto
    // aveva la stessa grandezza: le zucche di un mucchio venivano minuscole)
    const colorata = parteColorata(base, prodotto);
    const lungo = Math.max(colorata.l * Math.max(1, proporzione), colorata.a * Math.max(1, 1 / proporzione)) * LATO_MEDIO;
    const vera = prodotto.cm ? Math.min(2.2, Math.max(0.5, prodotto.cm / 100 / lungo)) : 1;
    const r = RAGGIO * vera * (0.94 + Math.random() * 0.12);
    const lato = r * 2 * 1.32;
    mesh.scale.set(lato * Math.max(1, proporzione), lato * Math.max(1, 1 / proporzione), 1);
    const scala = { x: mesh.scale.x, y: mesh.scale.y };
    const ombra = new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ map: tramaOmbra, transparent: true, depthWrite: false, opacity: 0 }));
    ombra.rotation.x = -Math.PI / 2;
    // l'immagine guarda sempre verso chi guarda: girando la cassetta la sua larghezza finisce
    // verso qualsiasi parete. Ingombro = mezza larghezza della parte colorata, anche inclinata.
    const mezzaL = colorata.x * mesh.scale.x, mezzaA = colorata.y * mesh.scale.y;
    const ingombro = Math.max(r, mezzaL * Math.cos(GIRO_MAX) + mezzaA * Math.sin(GIRO_MAX));
    // r, ingombro e grandezza dell'immagine cambiano con quanto e' piena la cassetta (k): qui le misure piene
    // quanto e' alta la parte colorata (a cassetta vuota): le alte vanno dietro, le basse davanti
    const alta = colorata.a * mesh.scale.y;
    return { chiave, id, alta, mezzaA, pos: new THREE.Vector3(), vel: new THREE.Vector3(), r, rPieno: r, ingombro, ingombroPieno: ingombro, scala, k: 1, kMeta: 1, fermo: 0, mesh, ombra, giro: (Math.random() - 0.5) * 0.9, entrata: 0 };
  }

  const limiteX = v => Math.max(0.004, misura.l / 2 - v.ingombro);
  const limiteZ = v => Math.max(0.004, misura.p / 2 - v.ingombro);
  function dentroLePareti(v) {
    const mx = limiteX(v), mz = limiteZ(v);
    if (v.pos.x < -mx) { v.pos.x = -mx; v.vel.x = Math.abs(v.vel.x) * 0.3; }
    if (v.pos.x > mx) { v.pos.x = mx; v.vel.x = -Math.abs(v.vel.x) * 0.3; }
    if (v.pos.z < -mz) { v.pos.z = -mz; v.vel.z = Math.abs(v.vel.z) * 0.3; }
    if (v.pos.z > mz) { v.pos.z = mz; v.vel.z = -Math.abs(v.vel.z) * 0.3; }
  }

  // misure della verdura per quanto e' piena la cassetta
  function adatta(v, k) {
    v.k = k;
    v.r = v.rPieno * k;
    v.ingombro = v.ingombroPieno * k;
  }

  // fa cadere una verdura sopra il punto piu' libero della cassetta: il piu' basso possibile e,
  // a parita', il piu' lontano dalle altre (cosi' va a riempire i buchi invece di impilarsi).
  // Come al banco del fruttivendolo le grandi vanno dietro e le piccole davanti, se no le
  // castagne sparirebbero dietro la lattuga. Conta l'altezza: zucca distesa e patate sono basse.
  function lancia(v, ritardo = 0) {
    const m = misura;
    let migliore = null;
    for (let i = 0; i < 24; i++) {
      const x = (Math.random() - 0.5) * 2 * limiteX(v) * 0.95;
      // un po' di preferenza verso il fondo: li' si vedono sopra l'asse davanti
      const z = (Math.random() * 1.7 - 0.9) * limiteZ(v);
      const alBanco = (z / Math.max(0.01, limiteZ(v))) * (v.alta / ALTEZZA_MEDIA - 1) * 0.9;
      let colonna = fondoUtile(m), spazio = 0.12;
      for (const o of verdure) {
        if (o === v) continue;
        const dx = o.pos.x - x, dz = o.pos.z - z, d2 = dx * dx + dz * dz;
        spazio = Math.min(spazio, Math.sqrt(d2) - o.r - v.r);
        if (d2 < ((o.r + v.r) * STRETTE) ** 2) colonna = Math.max(colonna, o.pos.y + o.r * STRETTE);
      }
      const punteggio = colonna * 10 - spazio + alBanco;
      if (!migliore || punteggio < migliore.punteggio) migliore = { x, z, colonna, punteggio };
    }
    v.pos.set(migliore.x, Math.max(m.a, migliore.colonna) + 0.32 + Math.random() * 0.08, migliore.z);
    v.fermo = 0;
    v.vel.set((Math.random() - 0.5) * 0.25, -0.15, (Math.random() - 0.5) * 0.15);
    v.attesa = ritardo;
    v.mesh.visible = ritardo <= 0;
  }

  // ---------------------------------------------------------------- fisica
  let ultimoMovimento = 0;
  function passoFisica(dt) {
    const m = misura, fondo = fondoUtile(m);
    let moto = 0;
    for (const v of verdure) {
      // la grandezza cambia piano, mentre le altre fanno spazio
      if (Math.abs(v.kMeta - v.k) > 0.0005) adatta(v, v.k + (v.kMeta - v.k) * Math.min(1, dt * 5));
      if (v.attesa > 0) { v.attesa -= dt; if (v.attesa <= 0) v.mesh.visible = true; else continue; }
      v.vel.y += GRAVITA * dt;
      v.pos.addScaledVector(v.vel, dt);
      if (v.pos.y - v.r < fondo) {
        v.pos.y = fondo + v.r;
        if (v.vel.y < 0) v.vel.y = -v.vel.y * 0.24;
        v.vel.x *= 0.86; v.vel.z *= 0.86;
      }
      dentroLePareti(v);
    }
    const n = new THREE.Vector3();
    for (let giro = 0; giro < 3; giro++) {
      for (let i = 0; i < verdure.length; i++) {
        const a = verdure[i];
        if (a.attesa > 0) continue;
        for (let j = i + 1; j < verdure.length; j++) {
          const b = verdure[j];
          if (b.attesa > 0) continue;
          n.subVectors(a.pos, b.pos);
          const d = n.length(), min = (a.r + b.r) * STRETTE;   // un po' si incastrano, come le verdure vere
          if (d >= min || d < 1e-6) continue;
          n.divideScalar(d);
          const spinta = (min - d) / 2;
          a.pos.addScaledVector(n, spinta);
          b.pos.addScaledVector(n, -spinta);
          const vRel = (a.vel.x - b.vel.x) * n.x + (a.vel.y - b.vel.y) * n.y + (a.vel.z - b.vel.z) * n.z;
          if (vRel < 0) {
            const imp = -(1 + 0.15) * vRel / 2;
            a.vel.addScaledVector(n, imp);
            b.vel.addScaledVector(n, -imp);
          }
          a.vel.multiplyScalar(0.985); b.vel.multiplyScalar(0.985);
        }
      }
    }
    for (const v of verdure) {
      if (v.attesa > 0) { moto = 1; continue; }
      dentroLePareti(v);   // gli urti possono averla spinta fuori: la rimetto dentro prima di disegnare
      v.vel.multiplyScalar(0.997);
      // si ferma subito solo se tocca il fondo; se e' rimasta in bilico sopra un'altra, per un attimo
      // la spingo di lato verso lo spazio libero piu' vicino, cosi' scivola giu' invece di galleggiare
      const aTerra = v.pos.y - v.r < fondo + 0.012;
      v.fermo = v.vel.lengthSq() < 0.01 ? v.fermo + dt : 0;
      if (!aTerra && v.fermo > 0.15 && v.fermo < 1.4) {
        let sx = 0, sz = 0;
        for (const o of verdure) {
          if (o === v || o.attesa > 0 || o.pos.y > v.pos.y) continue;
          const dx = v.pos.x - o.pos.x, dz = v.pos.z - o.pos.z, d = Math.hypot(dx, dz) || 1e-3;
          if (d < (o.r + v.r)) { sx += dx / d; sz += dz / d; }
        }
        if (sx || sz) { const l = Math.hypot(sx, sz); v.vel.x += (sx / l) * 0.9 * dt; v.vel.z += (sz / l) * 0.9 * dt; }
      }
      if (v.vel.lengthSq() < 0.0016 && (aTerra || v.fermo > 1.4)) v.vel.multiplyScalar(0.6);
      v.giro += (v.vel.x * Math.cos(yaw) - v.vel.z * Math.sin(yaw)) * dt / v.r * -0.6;
      v.giro = Math.max(-GIRO_MAX, Math.min(GIRO_MAX, v.giro));
      moto = Math.max(moto, v.vel.lengthSq());
    }
    if (moto > 0.0009) ultimoMovimento = performance.now();
  }

  // ---------------------------------------------------------------- rotazione col dito
  let yaw = 0, velYaw = 0, trascino = null, ultimaMano = -1e9;
  // giro lento automatico (mentre si scorrono le verdure): un giro ogni 12 secondi circa
  const VELOCITA_GIRO = 2 * Math.PI / 12;
  let autoGiro = false, velGiro = 0;
  tela.addEventListener("pointerdown", e => { trascino = { x: e.clientX, ultimo: e.clientX, id: e.pointerId, mosso: false }; velYaw = 0; sveglia(); });
  tela.addEventListener("pointermove", e => {
    if (!trascino || e.pointerId !== trascino.id) return;
    if (!trascino.mosso && Math.abs(e.clientX - trascino.x) > 6) {
      trascino.mosso = true;
      try { tela.setPointerCapture(e.pointerId); } catch (_) {}
    }
    if (!trascino.mosso) return;
    const dx = e.clientX - trascino.ultimo;
    trascino.ultimo = e.clientX;
    yaw += dx * 0.011;
    velYaw = dx * 0.011;
    ultimaMano = performance.now();
    sveglia();
  });
  const lascia = () => { trascino = null; ultimaMano = performance.now(); sveglia(); };
  tela.addEventListener("pointerup", lascia);
  tela.addEventListener("pointercancel", lascia);

  // ---------------------------------------------------------------- inquadratura
  let contenitore = null, larg = 0, alt = 0;
  function inquadra() {
    const m = misura;
    const aspetto = larg / Math.max(1, alt);
    const metaV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const larghezza = m.l + 2 * PALO + 0.08;
    const altezza = m.a + 0.3;
    const dist = Math.max((altezza / 2) / metaV, (larghezza / 2) / (metaV * aspetto)) * 1.05;
    const elev = THREE.MathUtils.degToRad(30 + m.a * 42);   // piu' e' profonda, piu' la guardo dall'alto
    const bersaglio = new THREE.Vector3(0, m.a * 0.5 + 0.035, 0);
    camera.aspect = aspetto;
    camera.position.set(0, bersaglio.y + Math.sin(elev) * dist, Math.cos(elev) * dist);
    camera.lookAt(bersaglio);
    camera.updateProjectionMatrix();
  }
  function aggancia() {
    const scelto = contenitori.find(c => c && c.offsetParent !== null && c.clientWidth > 0);
    if (!scelto) return;
    if (scelto !== contenitore) {
      contenitore = scelto;
      contenitori.forEach(c => c?.classList.add("crate-3d"));
      contenitore.appendChild(tela);
    }
    const w = contenitore.clientWidth, h = contenitore.clientHeight;
    if (w !== larg || h !== alt) {
      larg = w; alt = h;
      renderer.setSize(w, h, false);
      inquadra();
    }
    sveglia(400);
  }

  // ---------------------------------------------------------------- ciclo
  let inCorsa = false, inVista = true, prima = 0, attivoFino = 0;
  const qMondo = new THREE.Quaternion(), qInv = new THREE.Quaternion(), qGiro = new THREE.Quaternion(), asseZ = new THREE.Vector3(0, 0, 1);
  function disegna(ora) {
    const dt = Math.min(0.05, (ora - prima) / 1000 || 0.016);
    prima = ora;
    const passi = Math.ceil(dt / (1 / 120));
    for (let i = 0; i < passi; i++) passoFisica(dt / passi);

    if (!trascino) {
      yaw += velYaw;
      velYaw *= 0.92;
      if (ora - ultimaMano > 3200 && Math.abs(velYaw) < 0.002) {
        // il giro parte e si ferma dolcemente
        velGiro += ((autoGiro ? VELOCITA_GIRO : 0) - velGiro) * Math.min(1, dt * 1.6);
        if (velGiro > 0.02) {
          yaw += velGiro * dt;
        } else {
          // ritorno dolce verso il davanti, con un leggero ondeggiare mentre la verdura cade
          const ondeggia = ora - ultimoMovimento < 2500 ? Math.sin(ora / 900) * 0.16 : 0;
          const vicino = Math.round(yaw / (2 * Math.PI)) * 2 * Math.PI;
          yaw += (vicino + ondeggia - yaw) * 0.05;
        }
      }
    }
    if (cadutaCassetta < 1) {
      cadutaCassetta = Math.min(1, cadutaCassetta + dt / 0.6);
      const t = cadutaCassetta, rimbalzo = t < 0.7 ? (t / 0.7) ** 2 : 1 - Math.sin((t - 0.7) / 0.3 * Math.PI) * 0.06;
      mondo.position.y = (1 - rimbalzo) * 0.5;
    }
    mondo.rotation.y = yaw;
    mondo.updateMatrixWorld();
    qMondo.setFromRotationMatrix(mondo.matrixWorld);
    qInv.copy(qMondo).invert();
    const fondo = fondoUtile(misura);
    for (const v of verdure) {
      // immagine ingrandita (vista) ma sempre appoggiata: cresce verso l'alto, non sotto il fondo
      const vista = misura.vista || 1;
      v.mesh.position.set(v.pos.x, v.pos.y + (vista - 1) * v.mezzaA * v.k, v.pos.z);
      v.mesh.scale.set(v.scala.x * v.k * vista, v.scala.y * v.k * vista, 1);
      // ombra sul fondo: piena quando la verdura e' appoggiata, sparisce mentre e' ancora in aria
      const inAria = Math.max(0, v.pos.y - v.r - fondo);
      v.ombra.visible = v.mesh.visible;
      v.ombra.position.set(v.pos.x, fondo + 0.0015, v.pos.z);
      v.ombra.scale.set(v.r * 2.7 * vista, v.r * 1.9 * vista, 1);
      v.ombra.material.opacity = 0.62 * Math.max(0, 1 - inAria / 0.09);
      v.entrata = Math.min(1, v.entrata + dt * 6);
      qGiro.setFromAxisAngle(asseZ, v.giro);
      v.mesh.quaternion.copy(qInv).multiply(camera.quaternion).multiply(qGiro);
    }
    for (let i = inUscita.length - 1; i >= 0; i--) {
      const u = inUscita[i];
      u.t += dt * 4;
      u.mesh.position.y += dt * 0.25;
      u.mesh.scale.multiplyScalar(Math.max(0.6, 1 - dt * 5));
      if (u.t >= 1) { mondo.remove(u.mesh); u.mesh.material.map?.dispose(); u.mesh.material.dispose(); inUscita.splice(i, 1); }
    }
    renderer.render(scena, camera);
  }
  function ciclo(ora) {
    if (!inVista || document.hidden) { inCorsa = false; return; }
    disegna(ora);
    const fermo = !trascino && !autoGiro && velGiro <= 0.02 && cadutaCassetta >= 1 && Math.abs(velYaw) < 0.0005 && ora - ultimoMovimento > 400 && !inUscita.length
      && verdure.every(v => !(v.attesa > 0)) && Math.abs(yaw - Math.round(yaw / (2 * Math.PI)) * 2 * Math.PI) < 0.002;
    if (fermo && ora > attivoFino) { inCorsa = false; return; }
    requestAnimationFrame(ciclo);
  }
  function sveglia(ms = 1500) {
    attivoFino = Math.max(attivoFino, performance.now() + ms);
    if (!inCorsa && inVista && !document.hidden) { inCorsa = true; prima = performance.now(); requestAnimationFrame(ciclo); }
  }
  new IntersectionObserver(voci => { inVista = voci.some(v => v.isIntersecting); if (inVista) sveglia(); }).observe(tela);
  document.addEventListener("visibilitychange", () => sveglia());
  const osservaMisure = new ResizeObserver(() => aggancia());
  contenitori.forEach(c => c && osservaMisure.observe(c));
  window.addEventListener("resize", aggancia);

  // ---------------------------------------------------------------- sincronizzazione con il sito
  let coda = Promise.resolve();
  function sincronizza(selezione, nuovaScatola) {
    coda = coda.then(async () => {
      const cambioScatola = nuovaScatola !== scatola;
      if (cambioScatola) {
        scatola = nuovaScatola;
        misura = MISURE[nuovaScatola] || MISURE.media;
        if (cassetta) mondo.remove(cassetta);
        const primaVolta = !cassetta;
        cassetta = costruisciCassetta(misura);
        mondo.add(cassetta);
        if (!primaVolta) cadutaCassetta = 0;
        larg = 0;            // ricalcola l'inquadratura
      }
      const chiavi = new Set(selezione.map(s => s.chiave));
      for (let i = verdure.length - 1; i >= 0; i--) {
        if (chiavi.has(verdure[i].chiave)) continue;
        const v = verdure.splice(i, 1)[0];
        mondo.remove(v.ombra);
        v.ombra.material.dispose();
        inUscita.push({ mesh: v.mesh, t: 0 });
      }
      // piu' verdure ci sono, piu' si fanno piccole: quelle gia' dentro si stringono per fare posto
      // (tutte allo stesso modo, cosi' restano in proporzione tra loro)
      const posti = selezione.reduce((somma, s) => somma + quantoGrande(prodotti.find(p => p.id === s.id)) ** 2, 0);
      const k = densita(misura, posti);
      verdure.forEach(v => { v.kMeta = k; });
      let nuove = 0;
      for (const s of selezione) {
        if (verdure.some(v => v.chiave === s.chiave)) continue;
        const v = await creaVerdura(s.chiave, s.id);
        if (!v) continue;
        adatta(v, k);
        v.kMeta = k;
        verdure.push(v);
        mondo.add(v.mesh);
        mondo.add(v.ombra);
        lancia(v, nuove * 0.11);
        nuove += 1;
      }
      if (cambioScatola) verdure.forEach((v, i) => lancia(v, i * 0.09));   // cassetta nuova: ricadono tutte
      ultimoMovimento = performance.now();
      aggancia();
      sveglia(2500);
    }).catch(() => {});
    return coda;
  }

  // fa passare di colpo qualche secondo di fisica: le verdure arrivano gia' ferme al loro posto
  function avanza(secondi) {
    for (let t = 0; t < secondi; t += 1 / 120) passoFisica(1 / 120);
    for (const v of verdure) { v.attesa = 0; v.mesh.visible = true; v.entrata = 1; }
    prima = performance.now();
    disegna(prima);
  }

  tela.giroCassetta = () => ({ yaw, velGiro, autoGiro });   // per i collaudi
  const gira = attivo => {
    autoGiro = Boolean(attivo);
    if (autoGiro) sveglia();
  };

  // per le prove: quanto e' ingrandita ogni verdura e se e' appoggiata sul fondo
  const verdureInCassetta = () => verdure.map(v => ({ id: v.id, k: +v.k.toFixed(3), vista: +(v.mesh.scale.y / (v.scala.y * v.k)).toFixed(3), aTerra: v.pos.y - v.r < fondoUtile(misura) + 0.03 }));
  return { sincronizza, aggancia, avanza, gira, verdureInCassetta, ruota: angolo => { yaw = angolo; mondo.rotation.y = angolo; ultimaMano = performance.now(); disegna(performance.now()); } };
}
