const SHEET_1 = "assets/catalogo-vettoriali-1.webp";
const SHEET_2 = "assets/catalogo-vettoriali-2.webp";
const SHEET_EXTRA = "assets/catalogo-vettoriali-extra.webp";
// foto nuove fatte con Gemini nello stesso stile (ottobre 2026): ravanelli, radicchi, zucca butternut
const SHEET_NUOVE = "assets/catalogo-vettoriali-nuove.webp";
const WHATSAPP_NUMBER = "393202732892";
const ADMIN_PIN = "2892";
const ADMIN_SESSION_KEY = "sole-terra-acqua-admin-unlocked";
const OWNER_QUERY = "a";
const OWNER_VALUE = "1";
const ORDERS_STORAGE_KEY = "sole-terra-acqua-orders";
const CUSTOMERS_STORAGE_KEY = "sole-terra-acqua-customers";
const POINTS_FOR_REWARD = 10;
const PRESERVES_STORAGE_KEY = "sole-terra-acqua-conserve";
// La settimana (giorni di consegna e verdure) sta in settimana.json, pubblicato sul sito:
// e' l'unico posto che vedono tutti i clienti. La dashboard lo riscrive su GitHub.
// deve essere uguale al numero di CACHE_NAME in sw.js e al ?v= di app.js/styles.css in index.html:
// si alzano tutti insieme a ogni pubblicazione
const VERSIONE_SITO = 48;
const SITO_REPO = "soleterraacqua/soleterraacqua.github.io";
const SETTIMANA_FILE = "settimana.json";
const SETTIMANA_COPIA_KEY = "sole-terra-acqua-settimana";
const CHIAVE_GITHUB_KEY = "sole-terra-acqua-chiave-pubblicazione";
// Viterbo: fasce da 40 minuti fino alle 19:00 (l'ultima e' di mezz'ora). Zone vicine (+2,50 €): dalle 19:00 alle 20:00.
const FASCE_ORARIE = [
  ["14:30", "15:10"], ["15:10", "15:50"], ["15:50", "16:30"], ["16:30", "17:10"],
  ["17:10", "17:50"], ["17:50", "18:30"], ["18:30", "19:00"]
];
const FASCIA_ZONE_VICINE = [["19:00", "20:00"]];
const LOCALITA = [
  { nome: "Viterbo", costo: 0 },
  { nome: "Vitorchiano", costo: 2.5 },
  { nome: "Bagnaia", costo: 2.5 },
  { nome: "Vetralla", costo: 2.5 },
  { nome: "San Martino", costo: 2.5 },
  { nome: "Tobia", costo: 2.5 },
  { nome: "Quercia", costo: 2.5 }
];
// la cassetta composta (e le conserve) restano salvate sul telefono del cliente fino all'ordine
const CARRELLO_KEY = "sole-terra-acqua-carrello";
// Le conserve vere, dalle etichette. Ingredienti e pesi copiati dalle etichette:
// se cambia un'etichetta, cambiare anche qui.
const CONSERVE = [
  {
    id: "salsa-ciliegino", nome: "Salsa di pomodoro ciliegino", peso: "680 g", tinta: "#a3302a",
    foto: "assets/conserva-salsa-ciliegino.webp",
    ingredienti: "Pomodoro ciliegino 100%. Pomodoro italiano.",
    usi: [
      "Sugo in dieci minuti: aglio e olio in padella, la salsa, un pizzico di sale e una foglia di basilico.",
      "Base per pizza e focaccia, stesa a crudo prima di infornare.",
      "Uova in purgatorio, polpette al sugo o il ragù cotto piano la domenica."
    ],
    buono: [
      "Licopene, il pigmento rosso del pomodoro: con la cottura e un filo d'olio il corpo lo assorbe meglio.",
      "Il ciliegino è dolce e saporito: tanta acqua e poche calorie, circa 20 ogni 100 grammi da fresco.",
      "Potassio e altri carotenoidi, come il betacarotene."
    ]
  },
  {
    id: "pesto-zucchine", nome: "Pesto di zucchine e basilico con nocciole", peso: "170 g", tinta: "#2e6f37",
    foto: "assets/conserva-pesto-zucchine.webp",
    ingredienti: "Zucchine 68%, basilico 11,3%, olio extravergine di oliva, <b>nocciole</b> tostate 6%, succo di limone, sale, aglio.",
    usi: [
      "Sulla pasta, sciolto con un cucchiaio dell'acqua di cottura: si condisce a fuoco spento.",
      "Spalmato su bruschette e crostini, con una scaglia di pecorino.",
      "In un panino o in una piadina con mozzarella e pomodoro."
    ],
    buono: [
      "Zucchine: più del 90% è acqua, e la buccia porta fibre e luteina.",
      "Basilico: tanto profumo, così per dare sapore basta meno sale.",
      "Nocciole: vitamina E e grassi soprattutto monoinsaturi."
    ]
  },
  {
    id: "crema-zucchine-semi", nome: "Crema di zucchine ai semi", peso: "170 g", tinta: "#5a8f3c",
    foto: "assets/conserva-crema-zucchine-semi.webp",
    ingredienti: "Zucchine 81%, olio extravergine di oliva, succo di limone, semi di girasole 1,6%, semi di zucca 1,6%, semi di <b>sesamo</b> 0,8%, semi di cumino dei prati 0,3%, sale, aglio.",
    usi: [
      "Su crostini caldi come antipasto, con un filo d'olio a crudo.",
      "Al posto della maionese in un panino o in un tramezzino.",
      "Per mantecare un risotto o condire la pasta corta all'ultimo momento."
    ],
    buono: [
      "Zucchine: leggere, ricche d'acqua e di potassio.",
      "Semi di girasole e di zucca: fibre, magnesio e zinco.",
      "Sesamo e cumino dei prati: un po' di calcio dal sesamo e un profumo caldo, leggermente anisato."
    ]
  },
  {
    id: "zucchine-capperi-olive", nome: "Zucchine sott'olio con capperi e olive", peso: "270 g · sgocciolato 170 g", tinta: "#6b7d32",
    foto: "assets/conserva-zucchine-capperi-olive.webp",
    ingredienti: "Zucchine romanesche 63%, aceto di vino bianco (contiene <b>solfiti</b>), vino bianco (contiene <b>solfiti</b>), olio extravergine di oliva, capperi sotto sale 2%, olive 3%, origano secco, sale.",
    usi: [
      "Antipasto pronto, sul tagliere con salumi e formaggi.",
      "Nell'insalata di riso, di farro o di pasta fredda.",
      "Sulla pizza appena sfornata o dentro una focaccia farcita."
    ],
    buono: [
      "Zucchine romanesche: le più saporite, poche calorie e tanta acqua.",
      "Capperi: tra gli alimenti più ricchi di quercetina, un antiossidante naturale.",
      "Olive e olio extravergine: grassi soprattutto monoinsaturi."
    ]
  },
  {
    id: "zucchine-aglio-prezzemolo", nome: "Zucchine sott'olio con aglio e prezzemolo", peso: "270 g · sgocciolato 170 g", tinta: "#3a7a45",
    foto: "assets/conserva-zucchine-aglio-prezzemolo.webp",
    ingredienti: "Zucchine romanesche 63%, aceto di vino bianco (contiene <b>solfiti</b>), vino bianco (contiene <b>solfiti</b>), olio extravergine di oliva, prezzemolo 2%, aglio 2%, sale.",
    usi: [
      "Contorno pronto per carne o pesce alla griglia.",
      "Su una fetta di pane casereccio tostato, come bruschetta.",
      "A pezzetti in una frittata o in una torta salata."
    ],
    buono: [
      "Zucchine romanesche: potassio e fibre, soprattutto nella buccia.",
      "Prezzemolo: tra gli aromi più ricchi di vitamina K e vitamina C.",
      "Aglio: i suoi composti solforati, come l'allicina, gli danno il profumo inconfondibile."
    ]
  },
  {
    id: "crema-zucca", nome: "Crema di zucca, cipolla e nocciole", peso: "180 g", tinta: "#c2622a",
    foto: "assets/conserva-crema-zucca.webp",
    ingredienti: "Zucca butternut 58%, cipolla 19%, <b>nocciole</b> tostate 9%, olio extravergine di oliva, succo di limone, sale, pepe.",
    usi: [
      "Sulla pasta, allungata con un mestolo d'acqua di cottura.",
      "Su crostini, con una scaglia di formaggio stagionato.",
      "Come base per un risotto alla zucca pronto in poco tempo."
    ],
    buono: [
      "Zucca butternut: tanto betacarotene, che il corpo trasforma in vitamina A.",
      "Cipolla: tra le verdure più ricche di quercetina.",
      "Nocciole tostate: vitamina E e grassi soprattutto monoinsaturi."
    ]
  },
  {
    id: "composta-zucca-zenzero", nome: "Composta di zucca e zenzero", peso: "190 g", tinta: "#b98222",
    foto: "assets/conserva-composta-zucca-zenzero.webp",
    ingredienti: "Zucca butternut 59%, zucchero di canna grezzo, succo di limone, scorza di limone 0,1%, zenzero fresco 1,9%.",
    usi: [
      "Con formaggi stagionati o erborinati, come una mostarda gentile.",
      "Su yogurt bianco o ricotta, per una colazione diversa.",
      "Su pane tostato e burro, oppure per farcire una crostata."
    ],
    buono: [
      "Zucca butternut: il suo arancio è betacarotene, che il corpo trasforma in vitamina A.",
      "Zucca: fibre e potassio nella polpa.",
      "Zenzero fresco: il sapore pungente viene dai gingeroli, gli stessi della radice appena grattugiata."
    ]
  }
];

// l'olio in latta da 5 litri: nei nomi e sulla latta solo "Olio", la provenienza (Soriano nel Cimino)
// sta nella descrizione. Prezzo al litro e disponibilita' si cambiano dalla dashboard (voce "olio"
// di settimana.json); finche' non c'e', valgono questi
const OLIO = { nome: "Olio", litri: 5, prezzoLitro: 14, disponibile: true, foto: "assets/olio-latta.svg" };

CONSERVE.forEach(conserva => { conserva.prezzo = 0; conserva.disponibile = true; });

const DEFAULT_PRESERVES = CONSERVE.map(conserva => ({ id: conserva.id, name: conserva.nome, enabled: true }));

const PRODUCTS = [
  { id: "peperoni", name: "Peperoni", weight: "500 g", emoji: "🫑", sheet: SHEET_1, cols: 5, rows: 4, x: 0, y: 0, enabled: true },
  { id: "melanzane", name: "Melanzane", weight: "500 g", emoji: "🍆", sheet: SHEET_1, cols: 5, rows: 4, x: 1, y: 0, enabled: true },
  { id: "pomodori", name: "Pomodori", weight: "500 g", emoji: "🍅", sheet: SHEET_1, cols: 5, rows: 4, x: 2, y: 0, enabled: true },
  { id: "lattuga-romana", name: "Lattuga romana", weight: "1 cespo", emoji: "🥬", sheet: SHEET_1, cols: 5, rows: 4, x: 3, y: 0, enabled: true },
  { id: "lattuga-canasta", name: "Lattuga canasta", weight: "1 cespo", emoji: "🥬", sheet: SHEET_1, cols: 5, rows: 4, x: 4, y: 0, enabled: true },
  { id: "lattuga-gentilina", name: "Lattuga gentilina", weight: "1 cespo", emoji: "🥬", sheet: SHEET_1, cols: 5, rows: 4, x: 0, y: 1, enabled: true },
  { id: "lattuga-iceberg", name: "Lattuga iceberg", weight: "1 cespo", emoji: "🥬", sheet: SHEET_1, cols: 5, rows: 4, x: 1, y: 1, enabled: true },
  { id: "cicoria", name: "Cicoria", weight: "500 g", emoji: "🥬", sheet: SHEET_1, cols: 5, rows: 4, x: 2, y: 1, enabled: true },
  { id: "radicchio-treviso", name: "Radicchio di Treviso", weight: "500 g", emoji: "🥬", sheet: SHEET_NUOVE, cols: 4, rows: 1, x: 1, y: 0, enabled: true },
  { id: "radicchio-chioggia", name: "Radicchio di Chioggia", weight: "1 cespo", emoji: "🥬", sheet: SHEET_NUOVE, cols: 4, rows: 1, x: 2, y: 0, enabled: true },
  { id: "bieta-colorata", name: "Bieta colorata", weight: "500 g", emoji: "🥬", sheet: SHEET_1, cols: 5, rows: 4, x: 3, y: 1, enabled: true },
  { id: "bieta-verde", name: "Bieta verde", weight: "500 g", emoji: "🥬", sheet: SHEET_1, cols: 5, rows: 4, x: 4, y: 1, enabled: true },
  { id: "cocomero", name: "Cocomero", weight: "1 pz", emoji: "🍉", sheet: SHEET_1, cols: 5, rows: 4, x: 0, y: 2, enabled: true },
  { id: "melone", name: "Melone", weight: "1 pz", emoji: "🍈", sheet: SHEET_1, cols: 5, rows: 4, x: 1, y: 2, enabled: true },
  { id: "broccolo-romanesco", name: "Broccolo romanesco", weight: "1 pz", emoji: "🥦", sheet: SHEET_1, cols: 5, rows: 4, x: 2, y: 2, enabled: true },
  { id: "broccolo-siciliano", name: "Broccolo siciliano", weight: "1 pz", emoji: "🥦", sheet: SHEET_1, cols: 5, rows: 4, x: 3, y: 2, enabled: true },
  { id: "cavolfiore", name: "Cavolfiore", weight: "1 pz", emoji: "🥦", sheet: SHEET_1, cols: 5, rows: 4, x: 4, y: 2, enabled: true },
  { id: "cavolo-cappuccio", name: "Cavolo cappuccio", weight: "1 pz", emoji: "🥬", sheet: SHEET_1, cols: 5, rows: 4, x: 0, y: 3, enabled: true },
  { id: "cavolo-cappuccio-viola", name: "Cavolo cappuccio viola", weight: "1 pz", emoji: "🥬", sheet: SHEET_1, cols: 5, rows: 4, x: 1, y: 3, enabled: true },
  { id: "verza", name: "Verza", weight: "1 pz", emoji: "🥬", sheet: SHEET_1, cols: 5, rows: 4, x: 2, y: 3, enabled: true },
  { id: "cipolle-tropea", name: "Cipolle di Tropea", weight: "500 g", emoji: "🧅", sheet: SHEET_1, cols: 5, rows: 4, x: 3, y: 3, enabled: true },
  { id: "cipolle-bianche", name: "Cipolle bianche", weight: "500 g", emoji: "🧅", sheet: SHEET_1, cols: 5, rows: 4, x: 4, y: 3, enabled: true },
  { id: "ravanelli", name: "Ravanelli", weight: "1 mazzo", emoji: "🌱", sheet: SHEET_NUOVE, cols: 4, rows: 1, x: 0, y: 0, enabled: true },
  { id: "aglio", name: "Mazzo di aglio", weight: "1 mazzo", emoji: "🧄", sheet: SHEET_2, cols: 5, rows: 3, x: 0, y: 0, enabled: true },
  { id: "odori-misti", name: "Odori misti", weight: "1 mazzo", emoji: "🌿", sheet: SHEET_2, cols: 5, rows: 3, x: 1, y: 0, enabled: true },
  { id: "zucca", name: "Zucca butternut", weight: "1 kg", emoji: "🎃", sheet: SHEET_NUOVE, cols: 4, rows: 1, x: 3, y: 0, enabled: true },
  { id: "carciofi", name: "Carciofi", weight: "3 pz", emoji: "🌿", sheet: SHEET_2, cols: 5, rows: 3, x: 3, y: 0, enabled: true },
  { id: "asparagi", name: "Asparagi", weight: "1 mazzo", emoji: "🌿", sheet: SHEET_2, cols: 5, rows: 3, x: 4, y: 0, enabled: true },
  { id: "patate", name: "Patate", weight: "1 kg", emoji: "🥔", sheet: SHEET_2, cols: 5, rows: 3, x: 0, y: 1, enabled: true },
  { id: "zucchine-romanesche", name: "Zucchine romanesche", weight: "500 g", emoji: "🥒", sheet: SHEET_EXTRA, cols: 2, rows: 1, x: 0, y: 0, enabled: true },
  { id: "cetrioli", name: "Cetrioli", weight: "500 g", emoji: "🥒", sheet: SHEET_2, cols: 5, rows: 3, x: 2, y: 1, enabled: true },
  { id: "fiori-zucca", name: "Fiori di zucca", weight: "10 pz", emoji: "🌼", sheet: SHEET_2, cols: 5, rows: 3, x: 3, y: 1, enabled: true },
  { id: "peperoncini", name: "Peperoncini", weight: "200 g", emoji: "🌶️", sheet: SHEET_2, cols: 5, rows: 3, x: 4, y: 1, enabled: true },
  { id: "scarola-riccia", name: "Scarola riccia", weight: "1 cespo", emoji: "🥬", sheet: SHEET_2, cols: 5, rows: 3, x: 0, y: 2, enabled: true },
  { id: "scarola-liscia", name: "Scarola liscia", weight: "1 cespo", emoji: "🥬", sheet: SHEET_2, cols: 5, rows: 3, x: 1, y: 2, enabled: true },
  { id: "cavolo-nero", name: "Cavolo nero", weight: "1 mazzo", emoji: "🥬", sheet: SHEET_2, cols: 5, rows: 3, x: 2, y: 2, enabled: true },
  { id: "friggitelli", name: "Peperoni friggitelli", weight: "500 g", emoji: "🫑", sheet: SHEET_EXTRA, cols: 2, rows: 1, x: 1, y: 0, enabled: true }
];

const BOXES = {
  piccola: { label: "PICCOLA", price: 12, min: 3, included: 5 },
  media: { label: "MEDIA", price: 14, min: 4, included: 6 },
  grande: { label: "GRANDE", price: 17, min: 5, included: 8 }
};

const CRATE_IMAGES = {
  piccola: "assets/cassetta-piccola-nuova.webp",
  media: "assets/cassetta-media-nuova.webp",
  grande: "assets/cassetta-grande-nuova.webp"
};

const CRATE_SLOTS = [
  { left: 26, top: 43, w: 34, h: 39, r: -10 },
  { left: 41, top: 38, w: 35, h: 40, r: 8 },
  { left: 57, top: 39, w: 35, h: 40, r: -6 },
  { left: 72, top: 44, w: 34, h: 39, r: 10 },
  { left: 31, top: 55, w: 36, h: 41, r: 7 },
  { left: 48, top: 53, w: 37, h: 42, r: -8 },
  { left: 65, top: 55, w: 36, h: 41, r: 6 },
  { left: 39, top: 49, w: 35, h: 40, r: -5 },
  { left: 57, top: 48, w: 36, h: 41, r: 9 },
  { left: 74, top: 50, w: 34, h: 39, r: -9 },
  { left: 50, top: 29, w: 34, h: 39, r: -3 },
  { left: 63, top: 31, w: 33, h: 38, r: 7 },
  { left: 35, top: 34, w: 33, h: 38, r: -8 },
  { left: 44, top: 45, w: 34, h: 39, r: 5 },
  { left: 63, top: 44, w: 34, h: 39, r: -6 },
  { left: 52, top: 46, w: 38, h: 43, r: 3 }
];

const DEMO_ORDERS = [];

const state = {
  view: "home",
  step: 1,
  box: "media",
  quantities: Object.fromEntries(PRODUCTS.map(p => [p.id, 0])),
  selectionOrder: [],
  // le cassette dell'ordine (una, o due per chi ne ha bisogno): quella che si sta riempiendo
  // vive in box / quantities / selectionOrder, l'altra resta qui finche' non la si riapre
  cassette: [{ box: "media", selectionOrder: [] }],
  attiva: 0,
  deliveryDays: [],
  deliveryFee: 0,
  selectedDate: "",
  selectedTime: "",
  area: "",
  conserve: {},
  olio: 0,
  orderData: {},
  orders: [...DEMO_ORDERS],
  customers: {},
  orderFilter: "all",
  preserves: [],
  optimized: false
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = value => new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(value);
const quotaCount = () => Object.values(state.quantities).reduce((sum, value) => sum + value, 0);
const boxData = () => BOXES[state.box];
const extraCost = () => Math.max(0, quotaCount() - boxData().included) * 2;
const conserveInVendita = () => CONSERVE.filter(conserva => conserva.disponibile !== false && conserva.prezzo > 0);
const pezziConserve = () => Object.values(state.conserve).reduce((sum, value) => sum + value, 0);
const costoConserve = () => CONSERVE.reduce((sum, conserva) => sum + (state.conserve[conserva.id] || 0) * conserva.prezzo, 0);
const extraCassetta = cassetta => Math.max(0, cassetta.selectionOrder.length - BOXES[cassetta.box].included) * 2;
const prezzoCassetta = cassetta => BOXES[cassetta.box].price + extraCassetta(cassetta);
const costoCassette = () => cassetteOrdine().reduce((sum, cassetta) => sum + prezzoCassetta(cassetta), 0);
const extraTotale = () => cassetteOrdine().reduce((sum, cassetta) => sum + extraCassetta(cassetta), 0);
const prodottiTotali = () => cassetteOrdine().reduce((sum, cassetta) => sum + cassetta.selectionOrder.length, 0);
const nomeScatola = key => BOXES[key].label[0] + BOXES[key].label.slice(1).toLowerCase();
const olioInVendita = () => OLIO.disponibile !== false && OLIO.prezzoLitro > 0;
const prezzoLatta = () => Math.round(OLIO.litri * OLIO.prezzoLitro * 100) / 100;
const costoOlio = () => state.olio * prezzoLatta();
const latte = quante => `${quante} ${quante === 1 ? "latta" : "latte"} da ${OLIO.litri} L`;
const total = () => costoCassette() + state.deliveryFee + costoConserve() + costoOlio();

// tutte le cassette dell'ordine, con quella aperta aggiornata a come e' adesso
function cassetteOrdine() {
  state.cassette[state.attiva] = { box: state.box, selectionOrder: [...state.selectionOrder] };
  return state.cassette;
}

function caricaCassetta(cassetta) {
  state.box = cassetta.box;
  state.selectionOrder = [...cassetta.selectionOrder];
  Object.keys(state.quantities).forEach(id => { state.quantities[id] = 0; });
  state.selectionOrder.forEach(id => { state.quantities[id]++; });
  $$(".box-option").forEach(el => el.classList.toggle("selected", el.dataset.box === state.box));
}

function normalizePhone(value = "") {
  const digits = String(value).replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("39")) return digits;
  return `39${digits}`;
}

function customerKeyFromOrder(order) {
  const phone = normalizePhone(order.phone || "");
  if (phone) return phone;
  return `demo-${String(order.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function customerDisplayPhone(value = "") {
  const phone = normalizePhone(value);
  if (!phone) return "Telefono mancante";
  return phone.startsWith("39") ? `+${phone.slice(0, 2)} ${phone.slice(2)}` : `+${phone}`;
}

function getOrderItems(selectionOrder = state.selectionOrder) {
  const grouped = new Map();
  selectionOrder.forEach(id => {
    const product = PRODUCTS.find(item => item.id === id);
    if (!product) return;
    const current = grouped.get(id) || { id, name: product.name, weight: product.weight, emoji: product.emoji, quantity: 0 };
    current.quantity++;
    grouped.set(id, current);
  });
  return [...grouped.values()];
}

function seedMissingOrderData() {
  state.orders.forEach((order, index) => {
    if (!order.phone) order.phone = `333101${String(index + 1).padStart(4, "0")}`;
    if (!order.date) order.date = state.deliveryDays[0] || new Date().toISOString().slice(0, 10);
    if (!order.items) order.items = [];
    if (order.status === "Consegnato") order.loyaltyCredited = true;
  });
}

function saveBusinessData() {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(state.orders));
    localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(state.customers));
  } catch (_) {
    showToast("Memoria piena: alcuni dati potrebbero non essere salvati.");
  }
}

function upsertCustomerFromOrder(order, addPoint = false) {
  const key = customerKeyFromOrder(order);
  const existing = state.customers[key] || {
    id: key,
    name: order.name,
    phone: order.phone || "",
    points: 0,
    orders: 0,
    rewardsEarned: 0,
    rewardsUsed: 0,
    lastOrderId: "",
    lastDelivery: ""
  };
  existing.name = order.name || existing.name;
  existing.phone = order.phone || existing.phone;
  existing.orders = Math.max(existing.orders || 0, state.orders.filter(item => customerKeyFromOrder(item) === key && item.status === "Consegnato").length);
  existing.lastOrderId = order.id || existing.lastOrderId;
  existing.lastDelivery = order.date || existing.lastDelivery;
  if (addPoint) {
    existing.points = (existing.points || 0) + 1;
    if (existing.points % POINTS_FOR_REWARD === 0) {
      existing.rewardsEarned = (existing.rewardsEarned || 0) + 1;
    }
  }
  state.customers[key] = existing;
  return existing;
}

function rebuildCustomersFromOrders() {
  const savedCustomers = { ...state.customers };
  state.customers = {};
  state.orders.forEach(order => {
    const key = customerKeyFromOrder(order);
    if (savedCustomers[key]) state.customers[key] = savedCustomers[key];
    if (order.status === "Consegnato") upsertCustomerFromOrder(order, Boolean(order.loyaltyCredited && !savedCustomers[key]));
  });
}

function rewardStatus(customer) {
  const available = Math.max(0, customer.rewardsEarned || 0) - Math.max(0, customer.rewardsUsed || 0);
  if (available > 0) return `${available} omaggio da consegnare`;
  const missing = POINTS_FOR_REWARD - ((customer.points || 0) % POINTS_FOR_REWARD);
  return missing === 1 ? "1 consegna all'omaggio" : `${missing} consegne all'omaggio`;
}

function loadPreserves() {
  try {
    const saved = JSON.parse(localStorage.getItem(PRESERVES_STORAGE_KEY));
    if (Array.isArray(saved) && saved.length) {
      state.preserves = saved
        .filter(item => item && typeof item.name === "string")
        .map(item => ({ id: item.id || `c${Math.random().toString(36).slice(2)}`, name: item.name, enabled: item.enabled !== false }));
      return;
    }
  } catch (_) {}
  state.preserves = DEFAULT_PRESERVES.map(item => ({ ...item }));
}

function savePreserves() {
  try {
    localStorage.setItem(PRESERVES_STORAGE_KEY, JSON.stringify(state.preserves));
  } catch (_) {
    showToast("Memoria piena: l'elenco conserve potrebbe non essere salvato.");
  }
}

function availablePreserves() {
  return state.preserves.filter(item => item.enabled !== false && item.name.trim());
}

function encodeForUrl(data) {
  const json = JSON.stringify(data);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeFromUrl(payload = "") {
  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (_) {
    return null;
  }
}

// dati dell'ordine nel link "Registra l'ordine": versione 2, piu' corta (le conserve sono
// "posizione x quantita'"); i link della versione 1 si leggono ancora
function compactOrderForLink(order) {
  return [
    2,
    order.id || "",
    order.date || "",
    order.deliveryWindow || "",
    order.name || "",
    normalizePhone(order.phone || ""),
    order.address || "",
    order.area || "",
    order.box || "",
    Number(order.total || 0),
    order.source || "",
    (order.conserve || []).map(item => `${CONSERVE.findIndex(conserva => conserva.id === item.id)}x${item.quantita}`).join(",")
  ];
}

function expandImportedOrder(data) {
  if (!Array.isArray(data)) return data;
  let id, date, time, deliveryWindow, name, phone, address, area, box, total, source, conserve;
  if (data[0] === 2) {
    let codice;
    [, id, date, deliveryWindow, name, phone, address, area, box, total, source, codice] = data;
    time = String(deliveryWindow || "").slice(0, 5);
    conserve = String(codice || "").split(",").filter(Boolean).map(pezzo => {
      const [posizione, quantita] = pezzo.split("x").map(Number);
      const conserva = CONSERVE[posizione];
      return conserva ? `${quantita}× ${conserva.nome}` : "";
    }).filter(Boolean).join("; ");
  } else {
    [id, date, time, deliveryWindow, name, phone, address, area, box, total, source, conserve] = data;
  }
  return {
    id,
    date,
    time,
    deliveryWindow,
    name,
    phone,
    address,
    area,
    box,
    total: Number(total || 0),
    source,
    status: "Confermato",
    items: [],
    notes: conserve ? `Conserve: ${conserve}` : "",
    loyaltyCredited: false
  };
}

function ownerDashboardUrl(hash = "dashboard") {
  return `${window.location.origin}${window.location.pathname}?${OWNER_QUERY}=${OWNER_VALUE}#${hash}`;
}

// Link "Registra l'ordine", formato 3: campi corti separati da punti, spazi come trattini.
// Niente _ * ~ (WhatsApp li usa per corsivo, grassetto e barrato e spezzerebbe il link).
const ORIGINI_CLIENTE = ["Instagram", "Facebook", "Amici", "Già cliente"];
const testoPerLink = valore => encodeURIComponent(String(valore || ""))
  .replace(/[-_.!~*'()]/g, carattere => `%${carattere.charCodeAt(0).toString(16).toUpperCase()}`)
  .replace(/%20/g, "-");
const testoDalLink = valore => {
  try { return decodeURIComponent(String(valore || "").replace(/-/g, "%20")); } catch (_) { return ""; }
};

// verdure nel link: posizione in questo elenco (x quantita' se piu' di una), cassette separate da "-".
// Le verdure nuove vanno SOLO in fondo: spostarle cambierebbe il significato dei link gia' mandati.
const VERDURE_NEL_LINK = [
  "peperoni", "melanzane", "pomodori", "lattuga-romana", "lattuga-canasta", "lattuga-gentilina", "lattuga-iceberg",
  "cicoria", "radicchio-treviso", "radicchio-chioggia", "bieta-colorata", "bieta-verde", "cocomero", "melone",
  "broccolo-romanesco", "broccolo-siciliano", "cavolfiore", "cavolo-cappuccio", "cavolo-cappuccio-viola", "verza",
  "cipolle-tropea", "cipolle-bianche", "ravanelli", "aglio", "odori-misti", "zucca", "carciofi", "asparagi", "patate",
  "zucchine-romanesche", "cetrioli", "fiori-zucca", "peperoncini", "scarola-riccia", "scarola-liscia", "cavolo-nero",
  "friggitelli"
];

const codiceVerdure = cassette => (cassette || []).map(cassetta => (cassetta.items || []).map(item => {
  const posizione = VERDURE_NEL_LINK.indexOf(item.id);
  if (posizione < 0) return "";
  return item.quantity > 1 ? `${posizione}x${item.quantity}` : `${posizione}`;
}).filter(Boolean).join(",")).join("-");

function codificaOrdine(order) {
  const origine = ORIGINI_CLIENTE.indexOf(order.source);
  const verdure = codiceVerdure(order.cassette);
  const extra = [
    ...(order.conserve || []).map(item => `${CONSERVE.findIndex(conserva => conserva.id === item.id)}x${item.quantita}`),
    order.olio ? `O${order.olio}` : ""                                        // latte d'olio: O1, O2...
  ].filter(Boolean).join(",");
  return [
    3,
    order.id,
    String(order.date || "").replace(/-/g, "").slice(2),                      // 2026-10-23 -> 261023
    String(order.deliveryWindow || order.time || "").slice(0, 5).replace(":", ""),   // 19:00 -> 1900
    testoPerLink(order.name),
    normalizePhone(order.phone || ""),
    testoPerLink(order.address),
    Math.max(0, LOCALITA.findIndex(localita => localita.nome === order.area)),
    String(order.box || "M").split(" + ").map(nome => nome.charAt(0).toUpperCase()).join(""),   // "Media + Piccola" -> MP
    Math.round(Number(order.total || 0) * 100),                               // in centesimi
    origine >= 0 ? origine : order.source ? testoPerLink(order.source) : 9,     // 9 = non ha risposto
    extra || (verdure ? "n" : ""),                                            // n = niente conserve ne' olio
    verdure                                                                   // le verdure di ogni cassetta
  ].join(".").replace(/\.+$/, "");   // mai un punto finale: WhatsApp lo lascerebbe fuori dal link
}

function decodificaOrdine(testo) {
  const [, id, data, inizio, nome, telefono, indirizzo, zona, scatola, centesimi, origine, codiceConserve, codiceCassette] = testo.split(".");
  const codiceOlio = String(codiceConserve || "").split(",").find(pezzo => pezzo.startsWith("O")) || "";
  const olio = Math.max(0, Math.floor(Number(codiceOlio.slice(1)) || 0));
  const area = LOCALITA[Number(zona)]?.nome || "Viterbo";
  const ora = `${String(inizio || "").slice(0, 2)}:${String(inizio || "").slice(2, 4)}`;
  const fascia = [...FASCE_ORARIE, ...FASCIA_ZONE_VICINE].find(([da]) => da === ora);
  const conserveOrdinate = String(codiceConserve || "").split(",").map(pezzo => {
    const [posizione, quantita] = pezzo.split("x").map(Number);
    const conserva = /^\d+x\d+$/.test(pezzo) ? CONSERVE[posizione] : null;
    return conserva ? { id: conserva.id, nome: conserva.nome, quantita } : null;
  }).filter(Boolean);
  const conserve = conserveOrdinate.map(item => `${item.quantita}× ${item.nome}`).join("; ");
  const scatole = [...String(scatola || "")].map(lettera => ({ P: "Piccola", M: "Media", G: "Grande" }[lettera])).filter(Boolean);
  if (!scatole.length) scatole.push("Media");
  // i link mandati prima della versione 46 non hanno le verdure: restano solo nel messaggio WhatsApp
  const codici = codiceCassette === undefined ? null : String(codiceCassette).split("-");
  const cassette = scatole.map((box, indice) => {
    if (!codici) return { box, items: [], senzaElenco: true };
    const items = String(codici[indice] || "").split(",").filter(Boolean).map(pezzo => {
      const [posizione, quantita] = pezzo.split("x").map(Number);
      const product = PRODUCTS.find(item => item.id === VERDURE_NEL_LINK[posizione]);
      return product ? { id: product.id, name: product.name, weight: product.weight, emoji: product.emoji, quantity: quantita || 1 } : null;
    }).filter(Boolean);
    return { box, items };
  });
  return {
    id,
    date: data ? `20${data.slice(0, 2)}-${data.slice(2, 4)}-${data.slice(4, 6)}` : "",
    time: ora,
    deliveryWindow: fascia ? `${fascia[0]}–${fascia[1]}` : ora,
    name: testoDalLink(nome),
    phone: telefono || "",
    address: testoDalLink(indirizzo),
    area,
    box: scatole.join(" + "),
    cassette,
    total: Number(centesimi || 0) / 100,
    source: /^\d+$/.test(origine || "") ? ORIGINI_CLIENTE[Number(origine)] || "" : testoDalLink(origine),
    status: "Confermato",
    items: cassette.flatMap(cassetta => cassetta.items),
    conserve: conserveOrdinate,
    olio,
    registrato: Date.now(),
    notes: [conserve ? `Conserve: ${conserve}` : "", olio ? `Olio: ${latte(olio)}` : ""].filter(Boolean).join(" · "),
    loyaltyCredited: false
  };
}

function dashboardImportUrl(order) {
  // senza "?a=1": basta #o= perche' il sito apra la dashboard
  return `${window.location.origin}${window.location.pathname}#o=${codificaOrdine(order)}`;
}

function importOrderFromHash() {
  const match = window.location.hash.match(/(?:import-order|o)=([^&]+)/);
  if (!match) return false;
  // formato 3 (corto, "3.R...") oppure i link vecchi in base64
  const imported = match[1].startsWith("3.") ? decodificaOrdine(match[1]) : expandImportedOrder(decodeFromUrl(match[1]));
  if (!imported?.id || !imported?.name) {
    showToast("Link ordine non valido.");
    return false;
  }
  const order = {
    ...imported,
    status: imported.status || "Confermato",
    loyaltyCredited: Boolean(imported.loyaltyCredited)
  };
  seedMissingOrderData();
  const exists = state.orders.some(item => item.id === order.id);
  if (!exists) {
    state.orders.unshift(order);
    saveBusinessData();
    showToast(`Ordine ${order.id} importato nella dashboard.`);
  } else {
    showToast(`Ordine ${order.id} già presente in dashboard.`);
  }
  history.replaceState(null, "", `${window.location.pathname}?${OWNER_QUERY}=${OWNER_VALUE}#dashboard`);
  navigate("dashboard");
  return true;
}

function vectorMetrics(product) {
  const positionX = product.cols > 1 ? product.x * 100 / (product.cols - 1) : 0;
  const positionY = product.rows > 1 ? product.y * 100 / (product.rows - 1) : 0;
  return {
    size: `${product.cols * 100}% ${product.rows * 100}%`,
    position: `${positionX}% ${positionY}%`
  };
}

function productVisualStyle(product, useCustomerPhoto = true) {
  if (useCustomerPhoto && product.customImage) {
    return `background-image:url('${product.customImage}');background-size:cover;background-position:center`;
  }
  const vector = vectorMetrics(product);
  return `background-image:url('${product.sheet}');background-size:${vector.size};background-position:${vector.position}`;
}

function vectorCustomProperties(product) {
  const vector = vectorMetrics(product);
  return `--vector-sheet:url('${product.sheet}');--vector-size:${vector.size};--vector-position:${vector.position}`;
}

function showToast(message, durata = 2600) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), durata);
}

function openMenu(open) {
  $("#sideMenu").classList.toggle("open", open);
  $("#menuBackdrop").classList.toggle("open", open);
  $("#sideMenu").setAttribute("aria-hidden", String(!open));
  $("#menuButton").setAttribute("aria-expanded", String(open));
}

function isDashboardUnlocked() {
  try { return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true"; }
  catch (_) { return false; }
}

function isOwnerRoute() {
  const params = new URLSearchParams(window.location.search);
  return params.get(OWNER_QUERY) === OWNER_VALUE || window.location.hash.startsWith("#o=") || isDashboardUnlocked();
}

function showDashboardGate() {
  const unlocked = isDashboardUnlocked();
  const dashboard = $("#dashboardView");
  const lock = $("#dashboardLock");
  dashboard.classList.toggle("locked", !unlocked);
  if (lock) lock.hidden = unlocked;
  if (!unlocked) {
    requestAnimationFrame(() => $("#adminPinInput")?.focus());
  }
  return unlocked;
}

function unlockDashboard() {
  const input = $("#adminPinInput");
  const error = $("#adminPinError");
  const value = input?.value.trim() || "";
  if (value !== ADMIN_PIN) {
    if (error) error.textContent = "PIN non corretto.";
    input?.classList.add("invalid");
    showToast("PIN area azienda non corretto.");
    return;
  }
  try { sessionStorage.setItem(ADMIN_SESSION_KEY, "true"); } catch (_) {}
  if (error) error.textContent = "";
  input.value = "";
  showDashboardGate();
  renderDashboard();
  showToast("Area azienda sbloccata.");
}

function lockDashboard() {
  try { sessionStorage.removeItem(ADMIN_SESSION_KEY); } catch (_) {}
  showDashboardGate();
  showToast("Area azienda bloccata.");
}

// il pulsante "Problemi? Scrivimi" sale sopra la barra del totale quando c'e'; e sui telefoni piccoli
// si fa da parte se coprirebbe i pulsanti dell'apertura (ricompare appena si scorre)
function aggiornaPostoAiuto() {
  const barra = $("#mobileBasketBar");
  document.body.classList.toggle("con-barra", Boolean(barra) && getComputedStyle(barra).display !== "none");
  document.body.classList.toggle("vista-azienda", state.view === "dashboard");
  const aiuto = $("#aiutoWhatsapp");
  if (!aiuto) return;
  let copre = false;
  if (state.view === "home") {
    const a = aiuto.getBoundingClientRect();
    copre = [".hero-button", ".hero-extra"].some(selettore => {
      const el = $(selettore);
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && a.left < r.right && a.right > r.left && a.top < r.bottom + 6 && a.bottom > r.top - 6;
    });
  }
  aiuto.classList.toggle("si-fa-da-parte", copre);
}

function navigate(view, anchor) {
  if (view === "dashboard" && !isOwnerRoute()) {
    view = "home";
    anchor = null;
    showToast("Area azienda riservata.");
  }
  state.view = view;
  $$(".view").forEach(el => el.classList.toggle("active", el.dataset.view === view));
  $$(".desktop-nav a").forEach(el => el.classList.toggle("active", el.dataset.viewLink === view));
  $("#mobileBasketBar").style.display = view === "builder" && window.innerWidth <= 980 ? "flex" : "";
  aggiornaPostoAiuto();
  openMenu(false);
  requestAnimationFrame(() => {
    if (anchor && $(`#${anchor}`)) $(`#${anchor}`).scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  });
  if (view === "dashboard" && showDashboardGate()) renderDashboard();
  aggiornaCassettaFluttuante();
  controllaVersione();
  if (view === "builder") {
    ricontrollaSettimana();
    setupDatesAndTimes();
    requestAnimationFrame(() => dropCrates());
    setupCassetta3D();
  }
}

function dropCrates() {
  ["summaryCrateVisual", "liveCrateVisual"].forEach(id => {
    const crate = $(`#${id}`);
    if (!crate) return;
    crate.classList.remove("crate-drop");
    void crate.offsetWidth;
    crate.classList.add("crate-drop");
  });
}

function applyCrateVisual(crate) {
  if (!crate) return;
  const image = CRATE_IMAGES[state.box] || CRATE_IMAGES.media;
  crate.classList.remove("size-piccola", "size-media", "size-grande");
  crate.classList.add(`size-${state.box}`);
  crate.style.setProperty("--crate-image", `url("${image}")`);
  const img = $(".realistic-crate", crate);
  if (img && !img.src.endsWith(image)) img.src = image;
}

// Sul telefono, scendendo tra i prodotti, la cassetta resta visibile in alto in piccolo.
// Il segnaposto tiene lo spazio della cassetta grande, cosi' la pagina non salta.
// mentre si scorrono le verdure la cassetta 3D gira lenta su se stessa; tornando su si rimette di fronte
function aggiornaGiroCassetta() {
  if (!cassetta3D?.gira) return;
  const griglia = $("#productGrid");
  const scorre = state.view === "builder" && state.step === 2 && Boolean(griglia)
    && griglia.getBoundingClientRect().top < window.innerHeight * 0.45;
  if (scorre === aggiornaGiroCassetta.attivo) return;
  aggiornaGiroCassetta.attivo = scorre;
  cassetta3D.gira(scorre);
}

function aggiornaCassettaFluttuante() {
  aggiornaGiroCassetta();
  const slot = $(".live-crate-slot");
  const card = $(".live-crate-card");
  const sezione = slot?.closest(".order-step");
  if (!slot || !card || !sezione) return;
  const giaFluttua = card.classList.contains("fluttuante");
  const inVista = state.view === "builder" && sezione.classList.contains("active")
    && getComputedStyle(card).display !== "none";
  let fluttua = false;
  if (inVista) {
    const posto = slot.getBoundingClientRect();
    const fineSezione = sezione.getBoundingClientRect().bottom;
    fluttua = posto.bottom < 170 && fineSezione > 320;
  }
  if (fluttua === giaFluttua) return;
  if (fluttua) {
    // il margine sotto la cassetta sparisce quando diventa fissa: il segnaposto lo tiene
    slot.style.height = `${card.offsetHeight + (parseFloat(getComputedStyle(card).marginBottom) || 0)}px`;
    card.style.setProperty("--larghezza-cassetta", `${$(".crate-visual", card).offsetWidth}px`);
    card.classList.add("fluttuante");
  } else {
    card.classList.remove("fluttuante");
    slot.style.height = "";
  }
}

function goToStep(step) {
  if (step > 2) {
    // con due cassette devono essere pronte tutte e due: se manca qualcosa riapro quella giusta
    const cassette = cassetteOrdine();
    const incompleta = cassette.findIndex(cassetta => cassetta.selectionOrder.length < BOXES[cassetta.box].min);
    if (incompleta >= 0) {
      const mancano = BOXES[cassette[incompleta].box].min - cassette[incompleta].selectionOrder.length;
      if (incompleta !== state.attiva) scegliCassetta(incompleta);
      showToast(cassette.length > 1
        ? `Completa la ${incompleta + 1}ª cassetta: ${mancano === 1 ? "manca ancora 1 prodotto" : `mancano ancora ${mancano} prodotti`}.`
        : `Scegli almeno ${boxData().min} prodotti per continuare.`);
      step = 2;
    }
  }
  state.step = step;
  $$(".order-step").forEach(el => el.classList.toggle("active", Number(el.dataset.step) === step));
  $$(".stepper button").forEach((el, index) => {
    el.classList.toggle("active", index + 1 === step);
    el.classList.toggle("done", index + 1 < step);
  });
  $("#orderSuccess").classList.remove("active");
  updateSummary();
  aggiornaCassettaFluttuante();
  window.scrollTo({ top: Math.max(0, $("#builderView").offsetTop), behavior: "smooth" });
}

function selectBox(key) {
  state.box = key;
  $$(".box-option").forEach(el => el.classList.toggle("selected", el.dataset.box === key));
  renderProducts();
  updateSummary();
  dropCrates();
}

// passa dalla 1ª alla 2ª cassetta e viceversa: quella lasciata resta com'era
function scegliCassetta(indice) {
  if (indice === state.attiva || !state.cassette[indice]) return;
  cassetteOrdine();
  state.attiva = indice;
  caricaCassetta(state.cassette[indice]);
  renderProducts();
  updateSummary();
  dropCrates();
}

// "uguale": la 2ª nasce gia' piena come la prima e si puo' ancora cambiare;
// "nuova": si sceglie la dimensione e poi le verdure, come per la prima
function aggiungiSecondaCassetta(come) {
  const [prima] = cassetteOrdine();
  state.cassette = [prima, { box: prima.box, selectionOrder: come === "uguale" ? [...prima.selectionOrder] : [] }];
  state.attiva = 0;
  scegliCassetta(1);
  if (come === "uguale") {
    goToStep(2);
    showToast("2ª cassetta aggiunta, uguale alla prima: se vuoi cambiala qui.", 4000);
  } else {
    goToStep(1);
    showToast("1ª cassetta pronta ✓ Ora scegli la dimensione della 2ª.", 4000);
  }
}

function togliSecondaCassetta() {
  if (state.cassette.length < 2) return;
  if (!window.confirm("Tolgo la 2ª cassetta e le verdure che ci hai messo?")) return;
  if (state.attiva !== 0) scegliCassetta(0);
  state.cassette = cassetteOrdine().slice(0, 1);
  updateSummary();
  showToast("2ª cassetta tolta.");
}

function renderSecondaCassetta() {
  const cassette = cassetteOrdine();
  const due = cassette.length > 1;
  const schede = $("#cassetteSchede");
  schede.hidden = !due || state.step > 2;
  if (due) {
    schede.innerHTML = cassette.map((cassetta, indice) => {
      const quante = cassetta.selectionOrder.length;
      const mancano = BOXES[cassetta.box].min - quante;
      return `
        <button type="button" data-cassetta="${indice}" class="${indice === state.attiva ? "attiva" : ""}" aria-pressed="${indice === state.attiva}">
          <b>${indice + 1}ª CASSETTA</b>
          <small>${BOXES[cassetta.box].label} · ${mancano > 0 ? `MANCANO ${mancano}` : `${quante} PRODOTTI ✓`}</small>
        </button>`;
    }).join("") + `<button type="button" class="togli" data-togli-seconda aria-label="Togli la 2ª cassetta" title="Togli la 2ª cassetta">✕</button>`;
  }
  // la proposta compare quando la prima cassetta e' pronta
  $("#secondaCassetta").hidden = due || quotaCount() < boxData().min;
  const quale = due ? `${state.attiva + 1}ª ` : "";
  $("#titoloPasso1").textContent = due ? `SCEGLI LA DIMENSIONE DELLA ${quale}CASSETTA` : "SCEGLI LA DIMENSIONE";
  $("#titoloPasso2").textContent = due ? `RIEMPI LA ${quale}CASSETTA` : "RIEMPI LA TUA CASSETTA";
}

function renderProducts() {
  const grid = $("#productGrid");
  grid.innerHTML = PRODUCTS.filter(product => product.enabled !== false).map(product => {
    const quantity = state.quantities[product.id];
    return `
      <article class="product-card ${quantity ? "selected" : ""}" data-product-card="${product.id}">
        <div class="product-card-image" style="${productVisualStyle(product)}" role="img" aria-label="${product.name}"></div>
        <div class="product-card-body">
          <small>1 PRODOTTO · ${product.weight.toUpperCase()}</small>
          <h3>${product.name.toUpperCase()}</h3>
          <p>Disponibile questa settimana</p>
          <div class="counter">
            <button data-product-minus="${product.id}" ${quantity === 0 ? "disabled" : ""} aria-label="Togli ${product.name}">−</button>
            <b>${quantity}</b>
            <button data-product-plus="${product.id}" aria-label="Aggiungi ${product.name}">+</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  $$("[data-product-plus]").forEach(button => button.addEventListener("click", () => changeProduct(button.dataset.productPlus, 1)));
  $$("[data-product-minus]").forEach(button => button.addEventListener("click", () => changeProduct(button.dataset.productMinus, -1)));
}

function changeProduct(id, amount) {
  const nextTotal = quotaCount() + amount;
  if (nextTotal < 0) return;
  state.quantities[id] = Math.max(0, state.quantities[id] + amount);
  if (amount > 0) {
    state.selectionOrder.push(id);
  } else {
    const lastMatchingIndex = state.selectionOrder.lastIndexOf(id);
    if (lastMatchingIndex >= 0) state.selectionOrder.splice(lastMatchingIndex, 1);
  }
  renderProducts();
  updateSummary();
}

function updateSummaryLegacy() {
  const count = quotaCount();
  const box = boxData();
  $("#headerCartCount").textContent = count;
  $("#summaryBoxLabel").textContent = `${box.label} · ${box.price} €`;
  $("#summaryQuota").textContent = `${count} PRODOTTI`;
  $("#summaryExtras").textContent = money(extraCost());
  $("#summaryDelivery").textContent = state.selectedTime ? `${state.selectedTime}${state.deliveryFee ? ` · ${money(state.deliveryFee)}` : " · GRATIS"}` : "DA DEFINIRE";
  $("#summaryTotal").textContent = money(total());
  $("#mobileTotal").textContent = money(total());
  $("#mobileQuota").textContent = `${count} prodotti`;
  $("#quotaStatus").textContent = `${count} PRODOTTI SCELTI`;
  $("#quotaHint").textContent = count <= box.included ? `Fino a ${box.included} prodotti sono inclusi` : `${count - box.included} ${count - box.included === 1 ? "prodotto extra" : "prodotti extra"} · ${money(extraCost())}`;
  $("#liveCrateLabel").textContent = `CASSETTA ${box.label}`;
  $("#toDelivery").disabled = count < box.included;

  $("#quotaDots").innerHTML = Array.from({ length: Math.max(box.included, count) }, (_, index) => {
    const filled = index < count;
    const extra = filled && index >= box.included;
    return `<i class="${filled ? "filled" : ""} ${extra ? "extra" : ""}"></i>`;
  }).join("");

  const selected = state.selectionOrder.map(id => PRODUCTS.find(product => product.id === id));
  const crateContent = selected.length
    ? selected.map((item, index) => {
        const slots = CRATE_SLOTS;
        const slot = slots[index % slots.length];
        const sameBefore = selected.slice(0, index).filter(previous => previous.id === item.id).length;
        const duplicateShift = sameBefore % 3;
        const left = slot.left + [0, 5, -5][duplicateShift];
        const top = slot.top + [0, -4, 4][duplicateShift];
        const rotation = slot.r + [0, 13, -13][duplicateShift];
        const densityScale = selected.length === 1 ? 1.24 : selected.length === 2 ? 1.12 : 1;
        const boxScale = state.box === "piccola" ? .82 : state.box === "grande" ? 1.15 : 1;
        const finalScale = (densityScale * boxScale).toFixed(2);
        const enterScale = (finalScale * .96).toFixed(2);
        return `<span class="crate-item" style="${vectorCustomProperties(item)};--left:${left}%;--top:${top}%;--w:${slot.w}%;--h:${slot.h}%;--r:${rotation}deg;--z:${10 + index};--s:${finalScale};--enter-s:${enterScale};--delay:${160 + index * 45}ms" title="${item.name}" aria-label="${item.name}"></span>`;
      }).join("")
    : `<span class="empty-crate">LA CASSETTA È VUOTA<br>AGGIUNGI IL PRIMO PRODOTTO</span>`;
  $("#crateItems").innerHTML = crateContent;
  $("#liveCrateItems").innerHTML = crateContent;

  ["summaryCrateVisual", "liveCrateVisual"].forEach(id => {
    const crate = $(`#${id}`);
    applyCrateVisual(crate);
  });
}

function crateItemStyle(item, index, selected) {
  const slot = CRATE_SLOTS[index % CRATE_SLOTS.length];
  const sameBefore = selected.slice(0, index).filter(previous => previous.id === item.id).length;
  const duplicateShift = sameBefore % 3;
  const left = slot.left + [0, 5, -5][duplicateShift];
  const top = slot.top + [0, -4, 4][duplicateShift];
  const rotation = slot.r + [0, 13, -13][duplicateShift];
  const densityScale = selected.length === 1 ? 1.24 : selected.length === 2 ? 1.12 : 1;
  const boxScale = state.box === "piccola" ? .82 : state.box === "grande" ? 1.15 : 1;
  const finalScale = (densityScale * boxScale).toFixed(2);
  return `${vectorCustomProperties(item)};--left:${left}%;--top:${top}%;--w:${slot.w}%;--h:${slot.h}%;--r:${rotation}deg;--z:${10 + index};--s:${finalScale}`;
}

// Aggiorna le verdure dentro la cassetta tenendo quelle gia' presenti:
// cade solo quella appena aggiunta, le altre scivolano al nuovo posto.
function renderCrateItems(container, selected) {
  if (!container) return;
  if (!selected.length) {
    container.innerHTML = `<span class="empty-crate">LA CASSETTA È VUOTA<br>AGGIUNGI IL PRIMO PRODOTTO</span>`;
    return;
  }
  container.querySelector(".empty-crate")?.remove();

  const presenti = new Map($$(".crate-item", container).map(el => [el.dataset.key, el]));
  const occorrenze = {};
  let nuove = 0;
  selected.forEach((item, index) => {
    occorrenze[item.id] = (occorrenze[item.id] || 0) + 1;
    const key = `${item.id}#${occorrenze[item.id]}`;
    let el = presenti.get(key);
    const stile = crateItemStyle(item, index, selected);
    if (el) {
      presenti.delete(key);
      el.style.cssText = stile + (el.classList.contains("in-arrivo") ? `;--ritardo:${el.style.getPropertyValue("--ritardo") || "0ms"}` : "");
      return;
    }
    el = document.createElement("span");
    el.className = "crate-item in-arrivo";
    el.dataset.key = key;
    el.title = item.name;
    el.setAttribute("aria-label", item.name);
    el.style.cssText = `${stile};--ritardo:${nuove * 110}ms`;
    el.addEventListener("animationend", () => el.classList.remove("in-arrivo"), { once: true });
    container.appendChild(el);
    nuove += 1;
  });
  presenti.forEach(el => el.remove());
}

// Cassetta 3D: si carica quando entri nel compositore, se il dispositivo la regge.
// Finche' non e' pronta (o se non parte) resta la cassetta 2D.
let cassetta3D = null;
let cassetta3DPartita = false;
function setupCassetta3D() {
  if (cassetta3DPartita) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData) return;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return;
  cassetta3DPartita = true;
  import(`./cassetta3d.js?v=${VERSIONE_SITO}`)
    .then(m => m.avviaCassetta3D({ contenitori: [$("#liveCrateVisual"), $("#summaryCrateVisual")], prodotti: PRODUCTS }))
    .then(c => { cassetta3D = c; sincronizzaCassetta3D(); aggiornaGiroCassetta(); })
    .catch(() => $$(".crate-visual").forEach(el => el.classList.remove("crate-3d")));
}

function sincronizzaCassetta3D() {
  if (!cassetta3D) return;
  const volte = {};
  const selezione = state.selectionOrder.map(id => {
    volte[id] = (volte[id] || 0) + 1;
    return { chiave: `${id}#${volte[id]}`, id };
  });
  cassetta3D.sincronizza(selezione, state.box);
}

function updateSummary() {
  const count = quotaCount();
  const box = boxData();
  const includedRange = `${box.min}-${box.included}`;
  const missing = Math.max(0, box.min - count);
  const extraItems = Math.max(0, count - box.included);

  const pezzi = pezziConserve();
  const cassette = cassetteOrdine();
  const due = cassette.length > 1;
  $("#headerCartCount").textContent = prodottiTotali() + pezzi + state.olio;
  $("#summaryCassetteTitolo").textContent = due ? "LE TUE 2 CASSETTE" : "LA TUA CASSETTA";
  $("#summaryBoxLabel").textContent = due
    ? cassette.map(cassetta => BOXES[cassetta.box].label).join(" + ")
    : `${box.label} · ${box.price} €`;
  $("#summaryQuota").textContent = due
    ? `${cassette.map(cassetta => cassetta.selectionOrder.length).join(" + ")} PRODOTTI`
    : `${count} PRODOTTI · INCLUSI ${includedRange}`;
  $("#summaryExtras").textContent = money(extraTotale());
  $("#summaryDelivery").textContent = state.selectedTime ? `${state.selectedTime}${state.deliveryFee ? ` · ${money(state.deliveryFee)}` : " · GRATIS"}` : "DA DEFINIRE";
  $("#summaryTotal").textContent = money(total());
  $("#mobileTotal").textContent = money(total());
  $("#mobileQuotaTitolo").textContent = due ? "2 CASSETTE" : "CASSETTA";
  $("#mobileQuota").textContent = `${prodottiTotali()} prodotti${pezzi ? ` + ${pezzi} ${pezzi === 1 ? "conserva" : "conserve"}` : ""}${state.olio ? " + olio" : ""}`;
  $("#summaryConserveRiga").hidden = !pezzi;
  $("#summaryConserve").textContent = `${pezzi} · ${money(costoConserve())}`;
  $("#summaryOlioRiga").hidden = !state.olio;
  const pieno = due || prodottiTotali() + pezzi + state.olio > 0;
  $$("[data-svuota-carrello]").forEach(pulsante => { pulsante.hidden = !pieno; });
  $("#summaryOlio").textContent = `${latte(state.olio).toUpperCase()} · ${money(costoOlio())}`;
  $("#quotaStatus").textContent = `${count} PRODOTTI SCELTI`;
  $("#quotaHint").textContent = missing
    ? `Scegli ancora ${missing} ${missing === 1 ? "prodotto" : "prodotti"} per completare la cassetta`
    : extraItems
      ? `${extraItems} ${extraItems === 1 ? "prodotto extra" : "prodotti extra"} · ${money(extraCost())}`
      : `Nel prezzo sono inclusi da ${box.min} a ${box.included} prodotti`;
  $("#liveCrateLabel").textContent = due ? `${state.attiva + 1}ª CASSETTA · ${box.label}` : `CASSETTA ${box.label}`;
  $("#toDelivery").disabled = count < box.min;
  $("#invitoConserve").hidden = count < box.min || !conserveInVendita().length;
  renderSecondaCassetta();

  $("#quotaDots").innerHTML = Array.from({ length: Math.max(box.included, count) }, (_, index) => {
    const filled = index < count;
    const extra = filled && index >= box.included;
    return `<i class="${filled ? "filled" : ""} ${extra ? "extra" : ""}"></i>`;
  }).join("");

  const selected = state.selectionOrder.map(id => PRODUCTS.find(product => product.id === id));
  renderCrateItems($("#crateItems"), selected);
  renderCrateItems($("#liveCrateItems"), selected);

  ["summaryCrateVisual", "liveCrateVisual"].forEach(id => {
    const crate = $(`#${id}`);
    applyCrateVisual(crate);
  });
  sincronizzaCassetta3D();
  salvaCarrello();
}

function salvaCarrello() {
  try {
    const cassette = cassetteOrdine().map(cassetta => ({ box: cassetta.box, prodotti: cassetta.selectionOrder }));
    localStorage.setItem(CARRELLO_KEY, JSON.stringify({ box: state.box, prodotti: state.selectionOrder, conserve: state.conserve, olio: state.olio, cassette, attiva: state.attiva }));
  } catch (_) {}
}

function ripristinaCarrello() {
  let salvato = null;
  try { salvato = JSON.parse(localStorage.getItem(CARRELLO_KEY)); } catch (_) {}
  if (!salvato || typeof salvato !== "object") return;
  const attivi = new Set(PRODUCTS.filter(product => product.enabled !== false).map(product => product.id));
  const pulisci = prodotti => (Array.isArray(prodotti) ? prodotti : []).filter(id => attivi.has(id));
  // i carrelli salvati prima della seconda cassetta hanno solo box e prodotti
  const salvate = (Array.isArray(salvato.cassette) ? salvato.cassette : []).filter(cassetta => BOXES[cassetta?.box]).slice(0, 2);
  state.cassette = salvate.length
    ? salvate.map(cassetta => ({ box: cassetta.box, selectionOrder: pulisci(cassetta.prodotti) }))
    : [{ box: BOXES[salvato.box] ? salvato.box : state.box, selectionOrder: pulisci(salvato.prodotti) }];
  state.attiva = Math.min(Math.max(0, Number(salvato.attiva) || 0), state.cassette.length - 1);
  caricaCassetta(state.cassette[state.attiva]);
  const vendibili = new Set(conserveInVendita().map(conserva => conserva.id));
  state.conserve = {};
  Object.entries(salvato.conserve || {}).forEach(([id, quante]) => {
    if (vendibili.has(id) && quante > 0) state.conserve[id] = Math.min(20, Math.floor(quante));
  });
  state.olio = olioInVendita() ? Math.max(0, Math.min(10, Math.floor(Number(salvato.olio) || 0))) : 0;
}

function svuotaCarrello() {
  state.conserveProposte = false;
  // dopo l'ordine si riparte da una cassetta sola, della dimensione della prima
  state.cassette = [{ box: cassetteOrdine()[0].box, selectionOrder: [] }];
  state.attiva = 0;
  caricaCassetta(state.cassette[0]);
  state.conserve = {};
  state.olio = 0;
  try { localStorage.removeItem(CARRELLO_KEY); } catch (_) {}
  renderProducts();
  renderConserve();
  renderConserveCarrello();
  renderOlio();
  updateSummary();
}

// il cliente puo' ricominciare da capo quando vuole: prima il carrello si svuotava solo dopo l'ordine
function chiediSvuotaCarrello() {
  const due = cassetteOrdine().length > 1;
  const cose = [
    due ? "la 2ª cassetta" : "",
    prodottiTotali() ? "le verdure" : "",
    pezziConserve() ? "le conserve" : "",
    state.olio ? "l'olio" : ""
  ].filter(Boolean);
  if (!cose.length) return;
  const elenco = cose.length > 1 ? `${cose.slice(0, -1).join(", ")} e ${cose[cose.length - 1]}` : cose[0];
  if (!window.confirm(`Vuoi svuotare il carrello? Tolgo ${elenco} che hai scelto.`)) return;
  svuotaCarrello();
  if (state.step > 2) goToStep(1);
  showToast("Carrello svuotato: puoi ricominciare da capo.");
}

function conserveOrdinate() {
  return CONSERVE
    .filter(conserva => state.conserve[conserva.id] > 0)
    .map(conserva => ({ id: conserva.id, nome: conserva.nome, peso: conserva.peso, quantita: state.conserve[conserva.id], prezzo: conserva.prezzo }));
}

function changeConserva(id, delta) {
  const conserva = conserveInVendita().find(item => item.id === id);
  if (!conserva) return;
  const quante = Math.max(0, Math.min(20, (state.conserve[id] || 0) + delta));
  if (quante) state.conserve[id] = quante;
  else delete state.conserve[id];
  renderConserve();
  renderConserveCarrello();
  updateSummary();
  if (delta > 0) showToast(`${conserva.nome}: nel carrello.`);
}

// le conserve si aggiungono alla cassetta, in fondo alla scelta dei prodotti
function renderConserveCarrello() {
  const blocco = $("#conserveCarrello");
  if (!blocco) return;
  const inVendita = conserveInVendita();
  blocco.hidden = !inVendita.length;
  $("#conserveCarrelloGriglia").innerHTML = inVendita.map(conserva => {
    const quante = state.conserve[conserva.id] || 0;
    return `
      <article class="conserva-card ${quante ? "selected" : ""}" style="--tinta:${conserva.tinta}">
        <img src="${conserva.foto}" alt="" loading="lazy">
        <div class="conserva-card-body">
          <small>${conserva.peso.toUpperCase()} · ${money(conserva.prezzo)}</small>
          <h4>${conserva.nome.toUpperCase()}</h4>
          <div class="counter">
            <button type="button" data-conserva-meno="${conserva.id}" ${quante ? "" : "disabled"} aria-label="Togli ${conserva.nome}">−</button>
            <b>${quante}</b>
            <button type="button" data-conserva-piu="${conserva.id}" aria-label="Aggiungi ${conserva.nome}">+</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

let conservaScelta = CONSERVE[0].id;

function renderConserve() {
  const scelta = $("#conserveScelta");
  const scheda = $("#conservaScheda");
  if (!scelta || !scheda) return;
  const conserva = CONSERVE.find(item => item.id === conservaScelta) || CONSERVE[0];
  scelta.innerHTML = CONSERVE.map(item => `
    <button type="button" role="tab" aria-selected="${item.id === conserva.id}" data-conserva="${item.id}" style="--tinta:${item.tinta}">
      <img src="${item.foto}" alt="" loading="lazy">
      <span>${item.nome}</span>
      ${item.disponibile !== false && item.prezzo > 0 ? `<small>${money(item.prezzo)}</small>` : ""}
    </button>
  `).join("");
  const inVendita = conserva.disponibile !== false && conserva.prezzo > 0;
  const quante = state.conserve[conserva.id] || 0;
  const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Ciao Alessio, vorrei informazioni sulla conserva "${conserva.nome}".`)}`;
  const azioni = !inVendita
    ? `<a class="primary-button conserva-chiedi" href="${whatsapp}" target="_blank" rel="noopener">CHIEDIMELA SU WHATSAPP <span>→</span></a>`
    : quante
      ? `<div class="conserva-nel-carrello">
          <div class="counter">
            <button type="button" data-conserva-meno="${conserva.id}" aria-label="Togli ${conserva.nome}">−</button>
            <b>${quante}</b>
            <button type="button" data-conserva-piu="${conserva.id}" aria-label="Aggiungi ${conserva.nome}">+</button>
          </div>
          <button type="button" class="primary-button conserva-chiedi" data-vai-carrello>VAI AL CARRELLO <span>→</span></button>
        </div>`
      : `<button type="button" class="primary-button conserva-chiedi" data-conserva-piu="${conserva.id}">AGGIUNGI AL CARRELLO · ${money(conserva.prezzo)} <span>+</span></button>`;
  scheda.style.setProperty("--tinta", conserva.tinta);
  scheda.innerHTML = `
    <div class="conserva-foto"><img src="${conserva.foto}" alt="${conserva.nome}: illustrazione dell'etichetta" loading="lazy"></div>
    <div class="conserva-testo">
      <p class="conserva-peso">VASETTO · ${conserva.peso.toUpperCase()}${inVendita ? ` · <b>${money(conserva.prezzo)}</b>` : ""}</p>
      <h3>${conserva.nome.toUpperCase()}</h3>
      <p class="conserva-ingredienti"><strong>INGREDIENTI</strong> ${conserva.ingredienti}</p>
      <div class="conserva-liste">
        <div>
          <h4>3 MODI PER USARLA</h4>
          <ol>${conserva.usi.map(uso => `<li>${uso}</li>`).join("")}</ol>
        </div>
        <div>
          <h4>IL BUONO DELLA VERDURA</h4>
          <ul>${conserva.buono.map(voce => `<li>${voce}</li>`).join("")}</ul>
        </div>
      </div>
      ${azioni}
      ${inVendita ? `<p class="conserva-nota">Arriva insieme alla tua cassetta di verdure. Domande? <a href="${whatsapp}" target="_blank" rel="noopener">Scrivimi su WhatsApp</a></p>` : ""}
    </div>
  `;
}

function changeOlio(delta) {
  if (!olioInVendita()) return;
  state.olio = Math.max(0, Math.min(10, state.olio + delta));
  renderOlio();
  updateSummary();
  if (delta > 0) showToast(`Olio: ${latte(state.olio)} nel carrello.`);
}

// l'olio compare in home (sezione dedicata) e in fondo ai prodotti, sotto le conserve
function renderOlio() {
  const inVendita = olioInVendita();
  const quante = state.olio;
  const contatore = `
    <div class="counter">
      <button type="button" data-olio-meno ${quante ? "" : "disabled"} aria-label="Togli una latta d'olio">−</button>
      <b>${quante}</b>
      <button type="button" data-olio-piu aria-label="Aggiungi una latta d'olio">+</button>
    </div>`;
  const prezzi = $("#olioPrezzi");
  if (prezzi) {
    prezzi.innerHTML = `
      <strong>${money(prezzoLatta()).replace(",00", "")}</strong>
      <span>LA LATTA DA ${OLIO.litri} LITRI<small>${money(OLIO.prezzoLitro).replace(",00", "")} al litro</small></span>`;
    prezzi.hidden = !inVendita;
  }
  const azioni = $("#olioAzioni");
  if (azioni) {
    const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Ciao Alessio, vorrei informazioni sull'olio.")}`;
    azioni.innerHTML = !inVendita
      ? `<p class="olio-esaurito">In questo momento è finito: scrivimi e ti dico quando torna.</p>
         <a class="primary-button" href="${whatsapp}" target="_blank" rel="noopener">CHIEDIMELO SU WHATSAPP <span>→</span></a>`
      : quante
        ? `<div class="olio-nel-carrello">${contatore}<button type="button" class="primary-button" data-vai-carrello>VAI AL CARRELLO <span>→</span></button></div>
           <p class="olio-nota">${latte(quante)} nel carrello: arriva insieme alla tua cassetta.</p>`
        : `<button type="button" class="primary-button" data-olio-piu>AGGIUNGI AL CARRELLO · ${money(prezzoLatta())} <span>+</span></button>
           <p class="olio-nota">Arriva insieme alla tua cassetta, nella stessa consegna.</p>`;
  }
  const carrello = $("#olioCarrello");
  if (carrello) {
    carrello.hidden = !inVendita;
    carrello.classList.toggle("selected", quante > 0);
    $("#olioCarrelloPrezzo").innerHTML = `<b>${money(prezzoLatta()).replace(",00", "")}</b> la latta <small>· ${money(OLIO.prezzoLitro).replace(",00", "")} al litro</small>`;
    $("#olioCarrelloContatore").innerHTML = contatore;
  }
}

function oggiLocale() {
  const adesso = new Date();
  return new Date(adesso.getTime() - adesso.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

// si ordina fino al giorno prima della consegna
function giorniPrenotabili() {
  const oggi = oggiLocale();
  return state.deliveryDays.filter(giorno => giorno > oggi);
}

function aggiornaOrdiniAperti() {
  const aperti = giorniPrenotabili().length > 0 || !state.settimanaArrivata;
  $("#builderView").classList.toggle("chiuso", !aperti);
  $("#ordiniChiusi").hidden = aperti;
  aggiornaPostoAiuto();
  return aperti;
}

function minutiFascia(da, a) {
  const minuti = orario => Number(orario.slice(0, 2)) * 60 + Number(orario.slice(3, 5));
  return minuti(a) - minuti(da);
}

function setupDatesAndTimes() {
  const giorni = giorniPrenotabili();
  aggiornaOrdiniAperti();
  if (!giorni.includes(state.selectedDate)) state.selectedDate = giorni[0] || "";
  $("#dateChoices").innerHTML = giorni.length
    ? giorni.map((value, index) => {
      const day = new Date(`${value}T12:00:00`).toLocaleDateString("it-IT", { weekday: "short", day: "numeric", month: "short" }).toUpperCase();
      return `<label><input type="radio" name="deliveryDate" value="${value}" ${value === state.selectedDate ? "checked" : ""}><span>${day}<small>${index === 0 ? "PROSSIMA CONSEGNA" : "DISPONIBILE"}</small></span></label>`;
    }).join("")
    : `<p class="date-empty">Sto preparando il calendario delle prossime consegne. Torna a trovarmi tra poco, oppure scrivimi su WhatsApp.</p>`;

  $("#areaChoices").innerHTML = LOCALITA.map(localita => `
    <label>
      <input type="radio" name="area" value="${localita.nome}" ${state.area === localita.nome ? "checked" : ""}>
      <span>${localita.nome.toUpperCase()}<small>${localita.costo ? `+${money(localita.costo)} · ORE 19–20` : "CONSEGNA GRATUITA"}</small></span>
    </label>
  `).join("");
  const zona = LOCALITA.find(localita => localita.nome === state.area);
  const fasce = !zona ? [] : zona.costo ? FASCIA_ZONE_VICINE : FASCE_ORARIE;
  if (!fasce.some(([from, to]) => `${from}–${to}` === state.selectedTime)) {
    // nelle zone vicine la fascia e' una sola: la scelgo io
    state.selectedTime = fasce.length === 1 ? `${fasce[0][0]}–${fasce[0][1]}` : "";
  }
  $("#timeGrid").innerHTML = !zona
    ? `<p class="date-empty">Prima scegli dove consegno: le fasce orarie dipendono dalla zona.</p>`
    : fasce.map(([from, to]) => `
      <label>
        <input type="radio" name="deliveryTime" value="${from}–${to}" ${state.selectedTime === `${from}–${to}` ? "checked" : ""}>
        <span>${from}–${to}<small>${zona.costo ? "ZONE VICINE" : `${minutiFascia(from, to)} MINUTI`}</small></span>
      </label>
    `).join("");

  $$('input[name="deliveryDate"]').forEach(input => input.addEventListener("change", event => state.selectedDate = event.target.value));
  $$('input[name="deliveryTime"]').forEach(input => input.addEventListener("change", event => {
    state.selectedTime = event.target.value;
    updateSummary();
  }));
}

function validateDelivery() {
  const form = $("#deliveryForm");
  const giornoScelto = state.selectedDate;
  setupDatesAndTimes();
  if (!state.selectedDate) {
    showToast("Gli ordini di questa settimana sono chiusi.");
    return false;
  }
  if (state.selectedDate !== giornoScelto) {
    showToast("Il giorno che avevi scelto non è più disponibile: scegline un altro.");
    return false;
  }
  if (!state.area) {
    showToast("Prima dimmi dove consegno.");
    $("#areaChoices").scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }
  let valid = true;
  $$("[required]", form).forEach(field => {
    const ok = field.value.trim() !== "";
    field.classList.toggle("invalid", !ok);
    valid = valid && ok;
  });
  if (!state.selectedTime) {
    showToast("Scegli una fascia oraria disponibile.");
    valid = false;
  } else if (!valid) {
    showToast("Completa i campi obbligatori.");
  }
  if (valid) {
    state.orderData = Object.fromEntries(new FormData(form).entries());
    state.orderData.date = state.selectedDate;
    state.orderData.time = state.selectedTime;
  }
  return valid;
}

function renderCheckout() {
  const cassette = cassetteOrdine();
  const due = cassette.length > 1;
  $("#checkoutCard").innerHTML = `
    <h3>IL TUO ORDINE</h3>
    <div class="checkout-products">
      ${cassette.map((cassetta, indice) => `
        ${due ? `<b class="checkout-cassetta">${indice + 1}ª CASSETTA · ${BOXES[cassetta.box].label}</b>` : ""}
        ${getOrderItems(cassetta.selectionOrder).map(item => `<span>${item.emoji} ${item.quantity}× ${item.name.toUpperCase()}</span>`).join("")}
      `).join("")}
      ${due && pezziConserve() ? `<b class="checkout-cassetta">CONSERVE</b>` : ""}
      ${conserveOrdinate().map(item => `<span>🫙 ${item.quantita}× ${item.nome.toUpperCase()}</span>`).join("")}
      ${due && state.olio ? `<b class="checkout-cassetta">OLIO</b>` : ""}
      ${state.olio ? `<span>🫒 ${state.olio}× OLIO · LATTA ${OLIO.litri} L</span>` : ""}
    </div>
    <div class="checkout-detail">
      <div><small>${due ? "CASSETTE" : "CASSETTA"}</small><strong>${cassette.map(cassetta => `${BOXES[cassetta.box].label} · ${cassetta.selectionOrder.length} PRODOTTI`).join("<br>")}</strong></div>
      ${pezziConserve() ? `<div><small>CONSERVE</small><strong>${pezziConserve()} ${pezziConserve() === 1 ? "VASETTO" : "VASETTI"} · ${money(costoConserve())}</strong></div>` : ""}
      ${state.olio ? `<div><small>OLIO</small><strong>${latte(state.olio).toUpperCase()} · ${money(costoOlio())}</strong></div>` : ""}
      <div><small>CONSEGNA</small><strong>${formatDate(state.orderData.date)}<br>${state.orderData.time}</strong></div>
      <div><small>CLIENTE</small><strong>${escapeHtml(state.orderData.fullName)}<br>${escapeHtml(state.orderData.phone)}</strong></div>
      <div><small>INDIRIZZO</small><strong>${escapeHtml(state.orderData.address)}<br>${escapeHtml(state.orderData.area)}</strong></div>
    </div>
    <div class="checkout-total">
      <span>TOTALE ORDINE<br><small>Consegna inclusa</small></span>
      <strong>${money(total())}</strong>
    </div>
  `;
}

function selectedProductLines() {
  return getOrderItems().map(item => `- ${item.quantity} x ${item.name} (${item.weight})`);
}

// messaggio che il cliente mi manda: corto, una riga per cosa
function buildWhatsAppUrl(orderInput, discoverySource) {
  const order = typeof orderInput === "object" ? orderInput : null;
  const orderId = order?.id || orderInput;
  const notes = (order?.notes || state.orderData.notes || "").trim();
  const elenco = voci => voci.map(item => `${item.quantity > 1 ? `${item.quantity}× ` : ""}${item.name}`).join(", ");
  const cassette = order?.cassette?.length
    ? order.cassette
    : cassetteOrdine().map(cassetta => ({ box: nomeScatola(cassetta.box), items: getOrderItems(cassetta.selectionOrder) }));
  const righeCassette = cassette.length > 1
    ? cassette.map((cassetta, indice) => `🧺 ${indice + 1}ª cassetta ${cassetta.box.toLowerCase()}: ${elenco(cassetta.items)}`)
    : [`🧺 Cassetta ${cassette[0].box.toLowerCase()}: ${elenco(cassette[0].items)}`];
  const conserve = (order?.conserve || conserveOrdinate()).map(item => `${item.quantita > 1 ? `${item.quantita}× ` : ""}${item.nome}`).join(", ");
  const olio = order ? order.olio || 0 : state.olio;
  const area = order?.area || state.orderData.area;
  const giorno = formatDate(order?.date || state.orderData.date);
  const importUrl = order ? dashboardImportUrl(order) : "";
  const message = [
    `*NUOVO ORDINE ${orderId}*`,
    `📅 ${giorno.charAt(0)}${giorno.slice(1).toLowerCase()}, ${order?.deliveryWindow || state.orderData.time}`,
    `📍 ${order?.address || state.orderData.address}, ${area}`,
    `👤 ${order?.name || state.orderData.fullName} · ${order?.phone || state.orderData.phone}`,
    "",
    ...righeCassette,
    // le righe facoltative entrano solo se ci sono: una riga vuota in mezzo lascerebbe un buco nel messaggio
    ...(conserve ? [`🫙 Conserve: ${conserve}`] : []),
    ...(olio ? [`🫒 Olio: ${latte(olio)}`] : []),
    ...(notes ? [`📝 ${notes}`] : []),
    "",
    `💶 *Totale ${money(order?.total || total())}* (${area === "Viterbo" ? "consegna gratuita" : `consegna ${money(2.5)} inclusa`})`,
    ...(discoverySource ? [`Mi ha conosciuto: ${discoverySource}`] : []),
    importUrl ? `\nRegistra l'ordine: ${importUrl}` : ""
  ].filter((riga, indice, righe) => riga !== "" || (righe[indice - 1] && righe[indice - 1] !== "")).join("\n").trim();
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderPopupConserve() {
  $("#popupConserveLista").innerHTML = conserveInVendita().map(conserva => {
    const quante = state.conserve[conserva.id] || 0;
    return `
      <div class="popup-conserva ${quante ? "aggiunta" : ""}" style="--tinta:${conserva.tinta}">
        <img src="${conserva.foto}" alt="" loading="lazy">
        <div><strong>${conserva.nome.toUpperCase()}</strong><small>${conserva.peso} · ${money(conserva.prezzo)}</small></div>
        <button type="button" data-popup-conserva="${conserva.id}">${quante ? `✓ ${quante} NEL CARRELLO` : "+ AGGIUNGI"}</button>
      </div>
    `;
  }).join("");
  const pezzi = pezziConserve();
  $("#popupConserveConferma").innerHTML = pezzi
    ? `CONFERMA CON ${pezzi} ${pezzi === 1 ? "CONSERVA" : "CONSERVE"} · ${money(total())} <span>→</span>`
    : `SCEGLI UNA CONSERVA QUI SOPRA <span>↑</span>`;
  $("#popupConserveConferma").disabled = !pezzi;
}

// sul telefono il popup compare sotto il dito: un doppio tocco premeva subito "No grazie"
// e il popup non si vedeva nemmeno. Per il primo secondo i suoi pulsanti non rispondono.
let popupApertoAlle = 0;
const popupAppenaAperto = () => performance.now() - popupApertoAlle < 900;

function apriPopupConserve() {
  popupApertoAlle = performance.now();
  renderPopupConserve();
  $("#popupConserve").hidden = false;
  document.body.style.overflow = "hidden";
}

function chiudiPopupConserve() {
  $("#popupConserve").hidden = true;
  document.body.style.overflow = "";
}

// informativa privacy: si apre dalla crocetta del passo 4 e dal fondo della pagina
function apriPrivacy() {
  $("#popupPrivacy").hidden = false;
  $("#popupPrivacy .privacy-testo").scrollTop = 0;
  document.body.style.overflow = "hidden";
}

function chiudiPrivacy() {
  $("#popupPrivacy").hidden = true;
  document.body.style.overflow = $("#popupConserve").hidden ? "" : "hidden";
}

function confirmOrder() {
  // "come mi hai conosciuto" e' facoltativa: se non risponde, va bene lo stesso
  const origine = $('input[name="discovery"]:checked')?.value || "";
  const privacy = $("#privacyCheck").checked;
  $(".privacy-check").classList.toggle("da-completare", !privacy);
  if (!privacy) {
    // prima l'avviso compariva lontano dal punto giusto e sembrava che "conferma ordine" non
    // funzionasse: ora porto il cliente alla crocetta e la evidenzio
    const riquadro = $(".privacy-check");
    riquadro.scrollIntoView({ behavior: "smooth", block: "center" });
    riquadro.classList.remove("richiamo");
    void riquadro.offsetWidth;
    riquadro.classList.add("richiamo");
    showToast("Manca la crocetta sulla privacy: toccala e poi conferma.", 4500);
    return;
  }
  // tutto a posto: via l'eventuale avviso rimasto, non deve coprire il popup o la conferma
  clearTimeout(showToast.timer);
  $("#toast").classList.remove("show");
  // nessuna conserva nel carrello: prima di confermare gliele propongo una volta
  if (!pezziConserve() && conserveInVendita().length && !state.conserveProposte) {
    apriPopupConserve();
    return;
  }
  if (!giorniPrenotabili().includes(state.orderData.date)) {
    setupDatesAndTimes();
    if (state.selectedDate) goToStep(3);
    showToast("Il giorno scelto non è più disponibile per gli ordini.");
    return;
  }

  // codice unico: prima ogni cliente al primo ordine riceveva lo stesso numero e in dashboard gli ordini si sovrapponevano
  const orderId = `R${Date.now().toString(36).slice(-5).toUpperCase()}${Math.floor(Math.random() * 36).toString(36).toUpperCase()}`;
  const cassette = cassetteOrdine().map(cassetta => ({ box: nomeScatola(cassetta.box), items: getOrderItems(cassetta.selectionOrder) }));
  const order = {
    id: orderId,
    time: state.selectedTime.split("–")[0],
    name: state.orderData.fullName,
    area: state.orderData.area,
    address: state.orderData.address,
    box: cassette.map(cassetta => cassetta.box).join(" + "),
    cassette,
    total: total(),
    source: origine,
    status: "Confermato"
  };
  order.time = state.selectedTime.slice(0, 5);
  order.date = state.orderData.date;
  order.deliveryWindow = state.orderData.time;
  order.phone = state.orderData.phone;
  order.items = cassette.flatMap(cassetta => cassetta.items);
  order.conserve = conserveOrdinate();
  order.olio = state.olio;
  order.notes = state.orderData.notes || "";
  order.loyaltyCredited = false;
  state.orders.unshift(order);
  try { localStorage.setItem("radici-demo-order", JSON.stringify(order)); } catch (_) {}
  saveBusinessData();
  const whatsappUrl = buildWhatsAppUrl(order, origine);
  window.open(whatsappUrl, "_blank", "noopener");

  $$(".order-step").forEach(el => el.classList.remove("active"));
  $("#orderSuccess").classList.add("active");
  // l'ordine mi arriva solo se il cliente preme INVIA su WhatsApp: prima il sito diceva "confermato"
  // e chi chiudeva WhatsApp senza inviare credeva di aver ordinato
  const [dalle, alle] = state.selectedTime.split("–");
  $("#successCopy").innerHTML = `
    <p class="success-saluto">Grazie ${escapeHtml(order.name.split(" ")[0])}, ci siamo quasi!</p>
    <p class="success-invia-box">Su WhatsApp trovi già pronto il riepilogo del tuo ordine <strong>#${orderId}</strong>. Ti basta premere <strong>INVIA</strong>: è l'ultimo passo, e solo così l'ordine verrà elaborato.</p>
    <p>Poi non devi fare altro: la tua cassetta te la porto io <strong>${formatDate(state.orderData.date).toLowerCase()}</strong>, tra le <strong>${escapeHtml(dalle || "")}</strong> e le <strong>${escapeHtml(alle || "")}</strong>.</p>
    <p class="success-nota">WhatsApp non si è aperto? Tocca il pulsante qui sotto.</p>`;
  $("#successWhatsapp").href = whatsappUrl;
  showToast("Ultimo passo: premi INVIA su WhatsApp.", 5000);
  svuotaCarrello();
}

function formatDate(value) {
  if (!value) return "Data da definire";
  return new Date(`${value}T12:00:00`).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" }).toUpperCase();
}

function escapeHtml(value = "") {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

// il 14/10/2026 il sito riparte da zero: su ogni dispositivo, una volta sola, cancello
// ordini e clienti di prova salvati (compresi quelli inventati del vecchio sito)
const DATI_VERSIONE_KEY = "sole-terra-acqua-dati-versione";
const DATI_VERSIONE = "2026-10-14";
function ripartiDaZero() {
  try {
    if (localStorage.getItem(DATI_VERSIONE_KEY) === DATI_VERSIONE) return;
    [ORDERS_STORAGE_KEY, CUSTOMERS_STORAGE_KEY, "radici-demo-order"].forEach(chiave => localStorage.removeItem(chiave));
    localStorage.setItem(DATI_VERSIONE_KEY, DATI_VERSIONE);
  } catch (_) {}
}

function loadLocalOrder() {
  ripartiDaZero();
  try {
    const savedOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY));
    if (Array.isArray(savedOrders) && savedOrders.length) state.orders = savedOrders;
    const savedCustomers = JSON.parse(localStorage.getItem(CUSTOMERS_STORAGE_KEY));
    if (savedCustomers && typeof savedCustomers === "object") state.customers = savedCustomers;
    const saved = JSON.parse(localStorage.getItem("radici-demo-order"));
    if (saved && !state.orders.some(order => order.id === saved.id)) state.orders.unshift(saved);
    seedMissingOrderData();
    rebuildCustomersFromOrders();
    saveBusinessData();
  } catch (_) {}
}

// applica giorni e verdure letti da settimana.json (o dall'ultima copia salvata sul telefono)
function applicaSettimana(dati) {
  if (!dati || typeof dati !== "object") return false;
  if (Array.isArray(dati.giorni)) {
    state.deliveryDays = [...new Set(dati.giorni.filter(giorno => /^\d{4}-\d{2}-\d{2}$/.test(giorno)))].sort();
  }
  if (Array.isArray(dati.prodotti)) {
    dati.prodotti.forEach(voce => {
      const product = PRODUCTS.find(item => item.id === voce?.id);
      if (!product) return;
      if (typeof voce.nome === "string" && voce.nome.trim()) product.name = voce.nome.trim();
      if (typeof voce.peso === "string" && voce.peso.trim()) product.weight = voce.peso.trim();
      if (typeof voce.disponibile === "boolean") product.enabled = voce.disponibile;
      // solo foto caricate dalla dashboard nella cartella del sito
      product.customImage = /^assets\/prodotti\/[a-z0-9-]+\.(jpg|webp|png)$/.test(voce.foto || "") ? voce.foto : "";
    });
  }
  if (Array.isArray(dati.conserve)) {
    dati.conserve.forEach(voce => {
      const conserva = CONSERVE.find(item => item.id === voce?.id);
      if (!conserva) return;
      const prezzo = Number(voce.prezzo);
      conserva.prezzo = Number.isFinite(prezzo) && prezzo > 0 ? Math.round(prezzo * 100) / 100 : 0;
      if (typeof voce.disponibile === "boolean") conserva.disponibile = voce.disponibile;
    });
  }
  if (dati.olio && typeof dati.olio === "object") {
    const prezzo = Number(dati.olio.prezzoLitro);
    if (Number.isFinite(prezzo)) OLIO.prezzoLitro = prezzo > 0 ? Math.round(prezzo * 100) / 100 : 0;
    if (typeof dati.olio.disponibile === "boolean") OLIO.disponibile = dati.olio.disponibile;
  }
  if (!olioInVendita()) state.olio = 0;
  const vendibili = new Set(conserveInVendita().map(conserva => conserva.id));
  Object.keys(state.conserve).forEach(id => { if (!vendibili.has(id)) delete state.conserve[id]; });
  state.settimanaPubblicata = typeof dati.aggiornato === "string" ? dati.aggiornato : "";
  // dalle cassette tolgo le verdure che questa settimana non ci sono
  const attive = new Set(PRODUCTS.filter(product => product.enabled !== false).map(product => product.id));
  cassetteOrdine().forEach(cassetta => { cassetta.selectionOrder = cassetta.selectionOrder.filter(id => attive.has(id)); });
  caricaCassetta(state.cassette[state.attiva]);
  return true;
}

function loadAdminSettings() {
  try { state.settimanaArrivata = applicaSettimana(JSON.parse(localStorage.getItem(SETTIMANA_COPIA_KEY))); } catch (_) {}
}

// Il sito e' una pagina sola: chi lo tiene aperto non si ricarica mai e resta sulla versione
// vecchia. Controllo il numero online e, se e' piu' nuovo, ricarico (mai durante consegna e
// conferma; il carrello e' salvato).
let ultimoControlloVersione = 0;
async function controllaVersione() {
  if (Date.now() - ultimoControlloVersione < 60000) return;
  ultimoControlloVersione = Date.now();
  try {
    const testo = await (await fetch(`sw.js?v=${Date.now()}`, { cache: "no-store" })).text();
    const online = Number((testo.match(/sole-terra-acqua-v(\d+)/) || [])[1]);
    if (!online || online <= VERSIONE_SITO) return;
    if (state.view === "builder" && state.step >= 3) return;   // riprovo alla prossima occasione
    ultimoControlloVersione = 0;
    location.reload();
  } catch (_) {}
}
document.addEventListener("visibilitychange", () => { if (!document.hidden) controllaVersione(); });

let ultimoControlloSettimana = 0;
function ricontrollaSettimana() {
  if (Date.now() - ultimoControlloSettimana < 20000) return;
  aggiornaSettimanaDalSito();
}
document.addEventListener("visibilitychange", () => { if (!document.hidden) ricontrollaSettimana(); });

async function aggiornaSettimanaDalSito() {
  ultimoControlloSettimana = Date.now();
  try {
    const risposta = await fetch(`${SETTIMANA_FILE}?v=${Date.now()}`, { cache: "no-store" });
    if (!risposta.ok) throw new Error(risposta.status);
    const testo = await risposta.text();
    let copia = null;
    try { copia = localStorage.getItem(SETTIMANA_COPIA_KEY); } catch (_) {}
    if (testo === copia) return;
    if (!applicaSettimana(JSON.parse(testo))) return;
    try { localStorage.setItem(SETTIMANA_COPIA_KEY, testo); } catch (_) {}
    renderProducts();
    renderConserve();
    renderConserveCarrello();
    renderOlio();
    setupDatesAndTimes();
    updateSummary();
    renderWeekEditor();
  } catch (_) {
    // senza rete e senza copia salvata: da qui in poi conta quello che c'e'
  } finally {
    if (!state.settimanaArrivata) {
      state.settimanaArrivata = true;
      aggiornaOrdiniAperti();
    }
  }
}

// riepilogo di quello che e' pubblicato, con il pulsante MODIFICA
function renderRiepilogoSettimana() {
  const box = $("#settimanaRiepilogo");
  if (!box) return;
  const giorni = giorniPrenotabili();
  const verdure = PRODUCTS.filter(product => product.enabled !== false);
  const conserve = conserveInVendita();
  box.innerHTML = `
    <div class="riepilogo-testa ${giorni.length ? "aperta" : "chiusa"}">
      <small>${giorni.length ? "ORDINI APERTI PER" : "ORDINI CHIUSI"}</small>
      <strong>${giorni.length ? giorni.map(giorno => formatDate(giorno)).join(" · ") : "Nessuna consegna in calendario: premi MODIFICA e aggiungi i giorni"}</strong>
    </div>
    <div class="riepilogo-blocco">
      <small>VERDURE DISPONIBILI · ${verdure.length}</small>
      <p>${verdure.map(product => `<span>${escapeHtml(product.name)} <em>${escapeHtml(product.weight)}</em></span>`).join("") || "<span>Nessuna</span>"}</p>
    </div>
    <div class="riepilogo-blocco">
      <small>CONSERVE IN VENDITA · ${conserve.length}</small>
      <p>${conserve.map(conserva => `<span>${conserva.nome} <em>${money(conserva.prezzo)}</em></span>`).join("") || "<span>Nessuna</span>"}</p>
    </div>
    <div class="riepilogo-blocco">
      <small>OLIO · LATTA ${OLIO.litri} L</small>
      <p>${olioInVendita() ? `<span>${money(OLIO.prezzoLitro)} al litro <em>${money(prezzoLatta())} la latta</em></span>` : "<span>Non in vendita</span>"}</p>
    </div>
  `;
}

function renderGiorniEditor(giorni) {
  $("#deliveryDaysEditor").innerHTML = giorni.length ? giorni.map((day, index) => `
    <div class="delivery-day-row">
      <span>${index + 1}</span>
      <input type="date" value="${day}" min="${oggiLocale()}" data-delivery-day="${index}" aria-label="Giorno di consegna ${index + 1}">
      <button type="button" data-remove-delivery-day="${index}" aria-label="Rimuovi giorno ${index + 1}">×</button>
    </div>
  `).join("") : `<p class="editor-note">Nessun giorno in calendario: aggiungi i giorni della prossima settimana.</p>`;
}

// i giorni come sono scritti adesso nell'editor (anche se non ancora pubblicati)
function giorniNellEditor() {
  return $$("[data-delivery-day]").map(input => input.value).filter(Boolean);
}

function contaVerdureAccese() {
  const tutte = $$("[data-admin-enabled]");
  const accese = tutte.filter(input => input.checked).length;
  const conta = $("#verdureAccese");
  if (conta) conta.textContent = `${accese} accese su ${tutte.length}`;
}

function renderWeekEditor({ forza = false } = {}) {
  if (!$("#weeklyProductsEditor")) return;
  const inModifica = Boolean(state.modificaSettimana);
  $("#settimanaEditor").hidden = !inModifica;
  $("#settimanaRiepilogo").hidden = inModifica;
  $("#modificaSettimana").hidden = inModifica;
  $$("[data-salva-settimana], [data-annulla-modifica]").forEach(el => { el.hidden = !inModifica; });
  renderRiepilogoSettimana();
  aggiornaStatoPubblicazione();
  // in MODIFICA l'editor non si ridisegna da solo: le modifiche non salvate restano
  if (!inModifica || (state.editorAperto && !forza)) return;
  state.editorAperto = true;

  renderGiorniEditor(state.deliveryDays.filter(giorno => giorno >= oggiLocale()));

  $("#weeklyProductsEditor").innerHTML = PRODUCTS.map(product => `
    <div class="admin-product-row" data-admin-product="${product.id}">
      <div class="admin-product-thumb-wrap">
        <div class="admin-product-thumb" style="${productVisualStyle(product)}" role="img" aria-label="${escapeHtml(product.name)}"></div>
        <label class="admin-photo-label" title="Sostituisci foto">
          +
          <input type="file" accept="image/*" data-admin-photo="${product.id}">
        </label>
      </div>
      <input type="text" value="${escapeHtml(product.name)}" data-admin-name="${product.id}" aria-label="Nome ${escapeHtml(product.name)}">
      <input type="text" value="${escapeHtml(product.weight)}" data-admin-weight="${product.id}" aria-label="Peso ${escapeHtml(product.name)}">
      <label class="availability-toggle" title="Disponibile questa settimana">
        <input type="checkbox" data-admin-enabled="${product.id}" ${product.enabled !== false ? "checked" : ""}>
        <span></span>
      </label>
    </div>
  `).join("");

  $("#conserveVenditaEditor").innerHTML = CONSERVE.map(conserva => `
    <div class="admin-conserva-row">
      <img src="${conserva.foto}" alt="">
      <span>${conserva.nome}<small>${conserva.peso}</small></span>
      <label class="prezzo-campo">
        <input type="number" min="0" step="0.10" inputmode="decimal" value="${conserva.prezzo ? conserva.prezzo.toFixed(2) : ""}" placeholder="0,00" data-conserva-prezzo="${conserva.id}" aria-label="Prezzo ${escapeHtml(conserva.nome)}">
        <b>€</b>
      </label>
      <label class="availability-toggle" title="In vendita">
        <input type="checkbox" data-conserva-vendita="${conserva.id}" ${conserva.disponibile !== false ? "checked" : ""}>
        <span></span>
      </label>
    </div>
  `).join("") + `
    <div class="admin-conserva-row admin-olio-row">
      <img src="${OLIO.foto}" alt="">
      <span>${OLIO.nome}<small>latta ${OLIO.litri} L · prezzo AL LITRO</small></span>
      <label class="prezzo-campo">
        <input type="number" min="0" step="0.10" inputmode="decimal" value="${OLIO.prezzoLitro ? OLIO.prezzoLitro.toFixed(2) : ""}" placeholder="0,00" data-olio-prezzo aria-label="Prezzo al litro dell'olio">
        <b>€/L</b>
      </label>
      <label class="availability-toggle" title="In vendita">
        <input type="checkbox" data-olio-vendita ${OLIO.disponibile !== false ? "checked" : ""}>
        <span></span>
      </label>
    </div>
  `;
  contaVerdureAccese();
}

function apriModificaSettimana() {
  state.modificaSettimana = true;
  state.editorAperto = false;
  renderWeekEditor();
  $(".week-manager").scrollIntoView({ behavior: "smooth", block: "start" });
}

function annullaModificaSettimana() {
  state.modificaSettimana = false;
  state.editorAperto = false;
  // torno a quello che e' pubblicato (anche le foto caricate e non pubblicate)
  loadAdminSettings();
  renderProducts();
  renderConserve();
  renderConserveCarrello();
  renderOlio();
  setupDatesAndTimes();
  updateSummary();
  renderWeekEditor();
  showToast("Modifiche annullate: resta la settimana pubblicata.");
}

function leggiChiave() {
  try { return localStorage.getItem(CHIAVE_GITHUB_KEY) || ""; } catch (_) { return ""; }
}

function aggiornaStatoPubblicazione() {
  const info = $("#pubblicaInfo");
  if (!info) return;
  const quando = state.settimanaPubblicata ? new Date(state.settimanaPubblicata) : null;
  const giorni = giorniPrenotabili();
  const ultima = quando && !isNaN(quando)
    ? `Ultima pubblicazione: ${quando.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })} alle ${quando.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}.`
    : "Settimana non ancora pubblicata.";
  const stato = giorni.length
    ? `Ordini APERTI per ${giorni.map(giorno => new Date(`${giorno}T12:00:00`).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })).join(", ")}.`
    : "Ordini CHIUSI: pubblica i giorni e le verdure della prossima settimana per riaprirli.";
  info.textContent = `${stato} ${ultima}`;
  const chiave = leggiChiave();
  $("#pubblicaChiave").hidden = Boolean(chiave);
  $("#cambiaChiave").hidden = !chiave;
}

function base64Utf8(testo) {
  const byte = new TextEncoder().encode(testo);
  let binario = "";
  for (let i = 0; i < byte.length; i += 0x8000) binario += String.fromCharCode(...byte.subarray(i, i + 0x8000));
  return btoa(binario);
}

function erroreGitHub(stato) {
  if (stato === 401) return Object.assign(new Error("La chiave non è valida o è scaduta: incollane una nuova."), { chiaveDaRifare: true });
  if (stato === 403 || stato === 404) return new Error("La chiave non ha il permesso di scrivere sul sito.");
  if (stato === 409 || stato === 422) return new Error("Il sito si stava già aggiornando: riprova tra qualche secondo.");
  return new Error(`Pubblicazione non riuscita (errore ${stato}).`);
}

// crea o sostituisce un file del sito su GitHub; Pages lo mette online in un paio di minuti
async function scriviSuGitHub(chiave, percorso, contenutoBase64, messaggio) {
  const indirizzo = `https://api.github.com/repos/${SITO_REPO}/contents/${percorso}`;
  const intestazioni = { Authorization: `Bearer ${chiave}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
  for (let tentativo = 1; ; tentativo++) {
    let sha;
    const esistente = await fetch(`${indirizzo}?ref=main&t=${Date.now()}`, { headers: intestazioni, cache: "no-store" });
    if (esistente.ok) sha = (await esistente.json()).sha;
    else if (esistente.status !== 404) throw erroreGitHub(esistente.status);
    const risposta = await fetch(indirizzo, {
      method: "PUT",
      headers: intestazioni,
      body: JSON.stringify({ message: messaggio, content: contenutoBase64, branch: "main", ...(sha ? { sha } : {}) })
    });
    if (risposta.ok) return;
    // 409/422: subito dopo un'altra pubblicazione GitHub puo' dare ancora la versione vecchia
    if ((risposta.status === 409 || risposta.status === 422) && tentativo < 4) {
      await new Promise(fatto => setTimeout(fatto, 1500 * tentativo));
      continue;
    }
    throw erroreGitHub(risposta.status);
  }
}

async function saveWeekSettings() {
  if (!state.modificaSettimana) return;
  // i giorni gia' passati non servono piu': non li ripubblico
  const deliveryDays = [...new Set(giorniNellEditor().filter(giorno => giorno >= oggiLocale()))].sort();
  if (!deliveryDays.length) {
    showToast("Inserisci almeno un giorno di consegna da oggi in avanti.");
    return;
  }
  const campoChiave = $("#chiavePubblicazione");
  if (campoChiave.value.trim()) {
    try { localStorage.setItem(CHIAVE_GITHUB_KEY, campoChiave.value.trim()); } catch (_) {}
    campoChiave.value = "";
  }
  const chiave = leggiChiave();
  if (!chiave) {
    aggiornaStatoPubblicazione();
    campoChiave.classList.add("invalid");
    campoChiave.focus();
    showToast("Prima incolla la chiave di pubblicazione.");
    return;
  }

  const verdure = PRODUCTS.map(product => ({
    id: product.id,
    nome: $(`[data-admin-name="${product.id}"]`)?.value.trim() || product.name,
    peso: $(`[data-admin-weight="${product.id}"]`)?.value.trim() || product.weight,
    disponibile: Boolean($(`[data-admin-enabled="${product.id}"]`)?.checked)
  }));
  if (!verdure.some(voce => voce.disponibile)) {
    showToast("Accendi almeno una verdura disponibile.");
    return;
  }
  const conserveVendita = CONSERVE.map(conserva => {
    const prezzo = parseFloat(String($(`[data-conserva-prezzo="${conserva.id}"]`)?.value || "").replace(",", "."));
    return {
      id: conserva.id,
      prezzo: Number.isFinite(prezzo) && prezzo > 0 ? Math.round(prezzo * 100) / 100 : 0,
      disponibile: Boolean($(`[data-conserva-vendita="${conserva.id}"]`)?.checked)
    };
  });
  const prezzoOlio = parseFloat(String($("[data-olio-prezzo]")?.value || "").replace(",", "."));
  const olio = {
    prezzoLitro: Number.isFinite(prezzoOlio) && prezzoOlio > 0 ? Math.round(prezzoOlio * 100) / 100 : 0,
    disponibile: Boolean($("[data-olio-vendita]")?.checked)
  };

  const bottoni = $$("[data-salva-settimana]");
  const testi = bottoni.map(bottone => bottone.innerHTML);
  bottoni.forEach(bottone => { bottone.disabled = true; bottone.textContent = "PUBBLICO…"; });
  let riuscita = false;
  try {
    for (const product of PRODUCTS) {
      if (!product.customImage?.startsWith("data:")) continue;
      const percorso = `assets/prodotti/${product.id}-${Date.now()}.jpg`;
      await scriviSuGitHub(chiave, percorso, product.customImage.split(",")[1], `Foto: ${product.name}`);
      product.customImage = percorso;
    }
    const dati = {
      aggiornato: new Date().toISOString(),
      giorni: deliveryDays,
      prodotti: verdure.map(voce => ({ ...voce, foto: PRODUCTS.find(product => product.id === voce.id).customImage || "" })),
      conserve: conserveVendita,
      olio
    };
    const testo = `${JSON.stringify(dati, null, 2)}\n`;
    await scriviSuGitHub(chiave, SETTIMANA_FILE, base64Utf8(testo), "Settimana aggiornata dalla dashboard");
    applicaSettimana(dati);
    try { localStorage.setItem(SETTIMANA_COPIA_KEY, testo); } catch (_) {}
    riuscita = true;
    showToast(`Pubblicata: ${verdure.filter(voce => voce.disponibile).length} verdure. Tra un paio di minuti la vedono tutti i clienti.`, 5000);
  } catch (errore) {
    if (errore.chiaveDaRifare) {
      try { localStorage.removeItem(CHIAVE_GITHUB_KEY); } catch (_) {}
    }
    showToast(errore instanceof TypeError ? "Niente connessione: riprova tra poco." : errore.message, 5000);
  } finally {
    bottoni.forEach((bottone, indice) => { bottone.disabled = false; bottone.innerHTML = testi[indice]; });
  }
  if (!riuscita) return;   // resto in MODIFICA con tutto quello che avevo scritto

  state.modificaSettimana = false;
  state.editorAperto = false;
  setupDatesAndTimes();
  renderProducts();
  renderConserve();
  renderConserveCarrello();
  renderOlio();
  updateSummary();
  renderWeekEditor();
}

function addDeliveryDay() {
  const giorni = giorniNellEditor();
  const lastDay = [...giorni].sort().pop();
  const next = lastDay && lastDay >= oggiLocale() ? new Date(`${lastDay}T12:00:00`) : new Date();
  next.setDate(next.getDate() + 1);
  const local = new Date(next.getTime() - next.getTimezoneOffset() * 60000);
  giorni.push(local.toISOString().slice(0, 10));
  renderGiorniEditor(giorni);
}

function removeDeliveryDay(index) {
  const giorni = $$("[data-delivery-day]").map(input => input.value);
  giorni.splice(index, 1);
  renderGiorniEditor(giorni.filter(Boolean));
}

function compressProductPhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const maxSide = 480;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", .82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function handleProductPhoto(input) {
  const file = input.files?.[0];
  const product = PRODUCTS.find(item => item.id === input.dataset.adminPhoto);
  if (!file || !product) return;
  try {
    product.customImage = await compressProductPhoto(file);
    const row = input.closest(".admin-product-row");
    const thumb = $(".admin-product-thumb", row);
    thumb.setAttribute("style", productVisualStyle(product));
    showToast(`Foto di ${product.name} aggiornata.`);
  } catch (_) {
    showToast("Non riesco a leggere questa immagine.");
  }
}

function renderDashboardLegacy(filter = "all") {
  const visible = state.orders.filter(order => {
    if (filter === "all") return true;
    if (filter === "Fuori zona") return order.area !== "Viterbo";
    return order.area === filter;
  });
  const upcoming = state.orders.filter(order => order.status !== "Consegnato").slice(0, 5);

  $("#nextDeliveries").innerHTML = upcoming.map((order, index) => `
    <div class="next-delivery">
      <strong>${order.time}</strong>
      <p><strong>${escapeHtml(order.name.toUpperCase())}</strong><small>${escapeHtml(order.address)} · ${escapeHtml(order.area)}</small></p>
      <span>${index + 1}</span>
    </div>
  `).join("");

  $("#ordersTable").innerHTML = `
    <div class="order-row header"><span>ORA</span><span>CLIENTE</span><span>INDIRIZZO</span><span>LOCALITÀ</span><span>CASSETTA</span><span>STATO</span></div>
    ${visible.map(order => `
      <div class="order-row">
        <span>${order.time}</span>
        <span class="order-customer"><strong>${escapeHtml(order.name)}</strong><small>#${order.id} · ${escapeHtml(order.source)}</small></span>
        <span>${escapeHtml(order.address)}</span>
        <span class="area-pill">${escapeHtml(order.area.toUpperCase())}</span>
        <span>${escapeHtml(order.box)} · ${money(order.total)}</span>
        <span class="status-pill ${order.status === "Consegnato" ? "delivered" : ""}">${escapeHtml(order.status.toUpperCase())}</span>
      </div>
    `).join("")}
  `;

  const revenue = state.orders.reduce((sum, order) => sum + Number(order.total), 0) + 174;
  $("#statOrders").textContent = state.orders.length + 11;
  $("#statRevenue").textContent = money(revenue);
  $("#statExtra").textContent = state.orders.filter(order => order.area !== "Viterbo").length + 3;
  renderWeekEditor();
}

function buildCustomerNotificationUrl(order, customer) {
  const phone = normalizePhone(order.phone);
  if (!phone) return "";
  const availableRewards = Math.max(0, (customer.rewardsEarned || 0) - (customer.rewardsUsed || 0));
  const missingPoints = POINTS_FOR_REWARD - ((customer.points || 0) % POINTS_FOR_REWARD);
  const nome = String(order.name || "").split(" ")[0];
  const righe = [`Ciao ${nome}, il tuo ordine ${order.id} risulta consegnato. Grazie da Sole Terra Acqua!`, ""];
  if (availableRewards > 0) {
    const conserve = availablePreserves();
    righe.push(`Questa è la tua consegna numero ${customer.points || POINTS_FOR_REWARD}: hai diritto a una CONSERVA IN OMAGGIO.`);
    if (conserve.length) {
      righe.push("", "Puoi scegliere tra:");
      conserve.forEach(item => righe.push(`- ${item.name}`));
      righe.push("", "Rispondi con quella che preferisci e te la porto alla prossima consegna.");
    } else {
      righe.push("", "Rispondi a questo messaggio e dimmi quale conserva preferisci.");
    }
  } else {
    const quante = missingPoints === 1 ? "ancora una consegna" : `ancora ${missingPoints} consegne`;
    righe.push(`Sei a ${customer.points || 0} consegne su ${POINTS_FOR_REWARD}: ${quante} e ricevi una conserva in omaggio.`);
  }
  righe.push("", "A presto!");
  return `https://wa.me/${phone}?text=${encodeURIComponent(righe.join("\n"))}`;
}

function markOrderDelivered(orderId) {
  const order = state.orders.find(item => item.id === orderId);
  if (!order) return;
  const alreadyDelivered = order.status === "Consegnato" && order.loyaltyCredited;
  order.status = "Consegnato";
  order.deliveredAt = new Date().toISOString();
  const customer = upsertCustomerFromOrder(order, !alreadyDelivered);
  order.loyaltyCredited = true;
  saveBusinessData();
  renderDashboard(state.orderFilter);
  const notificationUrl = buildCustomerNotificationUrl(order, customer);
  if (notificationUrl) window.open(notificationUrl, "_blank", "noopener");
  showToast(alreadyDelivered ? "Ordine già consegnato: riapro l'avviso cliente." : "Ordine consegnato: punto fedeltà aggiunto.");
}

function useCustomerReward(customerId) {
  const customer = state.customers[customerId];
  if (!customer) return;
  const available = Math.max(0, (customer.rewardsEarned || 0) - (customer.rewardsUsed || 0));
  if (!available) {
    showToast("Questo cliente non ha omaggi disponibili.");
    return;
  }
  const selettore = $(`[data-reward-choice="${customerId}"]`);
  const scelta = selettore && selettore.value ? selettore.value : "";
  customer.rewardsUsed = (customer.rewardsUsed || 0) + 1;
  customer.lastReward = scelta;
  customer.lastRewardDate = new Date().toISOString().slice(0, 10);
  saveBusinessData();
  renderDashboard(state.orderFilter);
  showToast(scelta ? `Omaggio segnato: ${scelta}.` : "Omaggio segnato come consegnato.");
}

function renderCustomers() {
  const customers = Object.values(state.customers)
    .filter(customer => customer.phone || customer.name)
    .sort((a, b) => ((b.rewardsEarned || 0) - (b.rewardsUsed || 0)) - ((a.rewardsEarned || 0) - (a.rewardsUsed || 0)) || (b.points || 0) - (a.points || 0));
  const table = $("#customersTable");
  if (!table) return;
  if (!customers.length) {
    table.innerHTML = `<div class="empty-table-note">Ancora nessun cliente consegnato. I punti appariranno dopo il primo ordine segnato come consegnato.</div>`;
    return;
  }
  const conserve = availablePreserves();
  const opzioniConserve = conserve.length
    ? conserve.map(item => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}</option>`).join("")
    : `<option value="">Nessuna conserva disponibile</option>`;

  table.innerHTML = `
    <div class="customer-row header"><span>CLIENTE</span><span>TELEFONO</span><span>VERSO L’OMAGGIO</span><span>CONSEGNE</span><span>OMAGGIO</span></div>
    ${customers.map(customer => {
      const availableRewards = Math.max(0, (customer.rewardsEarned || 0) - (customer.rewardsUsed || 0));
      return `
        <div class="customer-row">
          <span class="customer-name"><strong>${escapeHtml(customer.name || "Cliente")}</strong><small>Ultimo ordine ${escapeHtml(customer.lastOrderId || "—")}</small>${customer.lastReward ? `<small class="last-gift">Omaggio dato: ${escapeHtml(customer.lastReward)}</small>` : ""}</span>
          <span>${escapeHtml(customerDisplayPhone(customer.phone))}</span>
          <span class="points-pill ${availableRewards ? "reward-ready" : ""}">${availableRewards ? "OMAGGIO PRONTO" : `${(customer.points || 0) % POINTS_FOR_REWARD} / ${POINTS_FOR_REWARD}`}</span>
          <span>${(customer.orders || 0) === 1 ? "1 consegna" : `${customer.orders || 0} consegne`}</span>
          <span>${availableRewards ? `
            <span class="reward-cell">
              <select class="reward-choice" data-reward-choice="${escapeHtml(customer.id)}" aria-label="Conserva scelta da ${escapeHtml(customer.name || "cliente")}">${opzioniConserve}</select>
              <button class="reward-action" data-use-reward="${escapeHtml(customer.id)}">SEGNA OMAGGIO</button>
            </span>` : rewardStatus(customer)}</span>
        </div>
      `;
    }).join("")}
  `;
}

function renderPreservesEditor() {
  const editor = $("#preservesEditor");
  if (!editor) return;
  editor.innerHTML = state.preserves.map((item, index) => `
    <div class="preserve-row">
      <input type="text" value="${escapeHtml(item.name)}" data-preserve-name="${index}" placeholder="Nome della conserva" aria-label="Nome conserva ${index + 1}">
      <label class="availability-toggle" title="Proponila come omaggio">
        <input type="checkbox" data-preserve-enabled="${index}" ${item.enabled !== false ? "checked" : ""}>
        <span></span>
      </label>
      <button type="button" data-remove-preserve="${index}" aria-label="Rimuovi ${escapeHtml(item.name || "conserva")}">×</button>
    </div>
  `).join("");

  const disponibili = availablePreserves().length;
  const nota = $("#preservesCount");
  if (nota) {
    nota.textContent = disponibili === 0
      ? "Nessuna conserva attiva: il cliente non vedrebbe nessuna scelta."
      : disponibili === 1
        ? "1 conserva proposta al cliente."
        : `${disponibili} conserve proposte al cliente.`;
    nota.classList.toggle("warning", disponibili === 0);
  }
}

function addPreserve() {
  state.preserves.push({ id: `c${Date.now()}`, name: "", enabled: true });
  renderPreservesEditor();
  const ultimo = $$("[data-preserve-name]").pop();
  if (ultimo) ultimo.focus();
}

function removePreserve(index) {
  state.preserves.splice(index, 1);
  savePreserves();
  renderPreservesEditor();
  renderCustomers();
}

function savePreservesSettings() {
  state.preserves = state.preserves
    .map((item, index) => ({
      id: item.id,
      name: (($(`[data-preserve-name="${index}"]`) || {}).value || "").trim(),
      enabled: Boolean(($(`[data-preserve-enabled="${index}"]`) || {}).checked)
    }))
    .filter(item => item.name);
  savePreserves();
  renderPreservesEditor();
  renderCustomers();
  showToast(availablePreserves().length
    ? "Elenco conserve aggiornato."
    : "Salvato, ma nessuna conserva e' attiva: attivane almeno una.");
}

function renderDashboard(filter = state.orderFilter || "all") {
  state.orderFilter = filter;
  const visible = state.orders.filter(order => {
    if (filter === "all") return true;
    if (filter === "Fuori zona") return order.area !== "Viterbo";
    return order.area === filter;
  });
  const upcoming = state.orders.filter(order => order.status !== "Consegnato").slice(0, 5);

  $("#nextDeliveries").innerHTML = upcoming.map((order, index) => `
    <div class="next-delivery">
      <strong>${escapeHtml(order.time || "—")}</strong>
      <p><strong>${escapeHtml(order.name.toUpperCase())}</strong><small>${escapeHtml(order.address)} · ${escapeHtml(order.area)}</small></p>
      <span>${index + 1}</span>
    </div>
  `).join("");

  $("#ordersTable").innerHTML = `
    <div class="order-row header"><span>ORA</span><span>CLIENTE</span><span>INDIRIZZO</span><span>LOCALITÀ</span><span>CASSETTA</span><span>STATO</span><span>AZIONE</span></div>
    ${visible.map(order => {
      const delivered = order.status === "Consegnato";
      const customer = state.customers[customerKeyFromOrder(order)];
      const points = customer?.points || 0;
      return `
        <div class="order-row">
          <span>${escapeHtml(order.time || "—")}</span>
          <span class="order-customer"><strong>${escapeHtml(order.name)}</strong><small>#${order.id} · ${escapeHtml(customerDisplayPhone(order.phone))} · ${points} punti</small></span>
          <span>${escapeHtml(order.address)}</span>
          <span class="area-pill">${escapeHtml(order.area.toUpperCase())}</span>
          <span>${escapeHtml(order.box)} · ${money(order.total)}</span>
          <span class="status-pill ${delivered ? "delivered" : ""}">${escapeHtml(order.status.toUpperCase())}</span>
          <button class="delivery-action ${delivered ? "done" : ""}" data-deliver-order="${escapeHtml(order.id)}">${delivered ? "RIAVVISA CLIENTE" : "CONSEGNATO + AVVISA"}</button>
        </div>
      `;
    }).join("")}
  `;

  const daConsegnare = state.orders.filter(order => order.status !== "Consegnato");
  const posti = (FASCE_ORARIE.length + FASCIA_ZONE_VICINE.length) * 4;
  const prossimo = giorniPrenotabili()[0] || state.deliveryDays.find(giorno => giorno >= oggiLocale());
  $("#dashboardDate").textContent = prossimo ? formatDate(prossimo) : "NESSUNA IN CALENDARIO";
  $("#statOrders").textContent = daConsegnare.length;
  $("#statOrdersNota").textContent = `su ${posti} posti per giornata`;
  $("#statRevenue").textContent = money(daConsegnare.reduce((sum, order) => sum + Number(order.total || 0), 0));
  $("#statExtra").textContent = daConsegnare.filter(order => order.area !== "Viterbo").length;
  $("#statClienti").textContent = Object.keys(state.customers).length;
  if (!daConsegnare.length) {
    $("#nextDeliveries").innerHTML = `<p class="dashboard-vuoto">Nessuna consegna in programma.</p>`;
  }
  if (!visible.length) {
    $("#ordersTable").innerHTML = `<div class="empty-table-note">Ancora nessun ordine. Quando un cliente ordina ti arriva un WhatsApp: apri il link "Importa" del messaggio e l'ordine compare qui.</div>`;
  }
  const viterbo = daConsegnare.filter(order => order.area === "Viterbo");
  const vicine = daConsegnare.filter(order => order.area !== "Viterbo");
  const localitaVicine = [...new Set(vicine.map(order => order.area))];
  $("#routeSummary").innerHTML = `
    <div><span class="route-color sage"></span><p><strong>GIRO VITERBO · 14:30–19:00</strong><small>${viterbo.length ? "Consegna gratuita in città" : "Nessun ordine a Viterbo"}</small></p><b>${viterbo.length} ${viterbo.length === 1 ? "ORDINE" : "ORDINI"}</b></div>
    <div><span class="route-color peach"></span><p><strong>GIRO ZONE VICINE · 19:00–20:00</strong><small>${localitaVicine.length ? localitaVicine.join(" → ") : "Nessun ordine fuori Viterbo"}</small></p><b>${vicine.length} ${vicine.length === 1 ? "ORDINE" : "ORDINI"}</b></div>
  `;
  renderCustomers();
  renderWeekEditor();
  renderPreservesEditor();
  aggiornaListe();
  avviaListeOrarie();
}

// ---------- Liste del giro: consegne (con i km) e raccolta, in anteprima e in PDF ----------
// Non c'e' un server: le liste si rifanno sul telefono quando si apre la dashboard, quando si
// registra un ordine e ogni ora finche' la dashboard resta aperta.
const ORA_IN_MS = 60 * 60 * 1000;
const liste = { firma: "", alle: 0, consegne: null, raccolta: null, aperta: "", urlPdf: "", file: null, giro: 0 };
let moduloListe = null;
const caricaModuloListe = () => (moduloListe ||= import(`./liste.js?v=${VERSIONE_SITO}`));
const inizioFascia = order => String(order.deliveryWindow || order.time || "").slice(0, 5);
const kmTesto = km => km.toFixed(1).replace(".", ",");

// ordini ancora da consegnare, per giorno e per fascia oraria
function ordiniPerGiorno() {
  const oggi = oggiLocale();
  const ordini = state.orders
    .map((order, posizione) => ({ order, posizione }))
    .filter(({ order }) => order.status !== "Consegnato" && String(order.date || "") >= oggi)
    .sort((a, b) => a.order.date.localeCompare(b.order.date)
      || inizioFascia(a.order).localeCompare(inizioFascia(b.order))
      || (a.order.registrato || 0) - (b.order.registrato || 0)
      || b.posizione - a.posizione)   // in state.orders i piu' recenti sono in cima
    .map(({ order }) => order);
  const gruppi = [];
  ordini.forEach(order => {
    if (gruppi.at(-1)?.data !== order.date) gruppi.push({ data: order.date, ordini: [] });
    gruppi.at(-1).ordini.push(order);
  });
  return gruppi;
}

function cassetteDellOrdine(order) {
  if (order.cassette?.length) return order.cassette;
  return String(order.box || "Media").split(" + ").map((box, indice) => ({
    box,
    items: indice === 0 && order.items?.length ? order.items : [],
    senzaElenco: !(indice === 0 && order.items?.length)
  }));
}

function conserveDellOrdine(order) {
  if (Array.isArray(order.conserve)) return order.conserve.map(item => ({ id: item.id, nome: item.nome, quantita: Number(item.quantita) || 0 }));
  // ordini registrati prima: le conserve sono solo nelle note ("Conserve: 2× Salsa; 1× Pesto · Olio: …")
  const testo = (String(order.notes || "").match(/Conserve: ([^·]+)/) || [])[1] || "";
  return testo.split(";").map(pezzo => pezzo.trim().match(/^(\d+)× (.+)$/)).filter(Boolean)
    .map(([, quantita, nome]) => ({ id: CONSERVE.find(conserva => conserva.nome === nome.trim())?.id || nome.trim(), nome: nome.trim(), quantita: Number(quantita) }));
}

// "500 g" preso 7 volte -> "7 × 500 g = 3,5 kg"; "1 mazzo" 3 volte -> "3 mazzi"
function quantitaRaccolta(peso, volte) {
  const parti = String(peso).trim().toLowerCase().match(/^(\d+(?:[.,]\d+)?)\s*(g|kg|pz|mazz[oi]|cesp[oi])$/);
  if (!parti) return `${volte} × ${peso}`;
  const valore = parseFloat(parti[1].replace(",", ".")) * volte;
  const numero = v => String(Math.round(v * 100) / 100).replace(".", ",");
  if (parti[2] === "g" || parti[2] === "kg") {
    const grammi = parti[2] === "kg" ? valore * 1000 : valore;
    const totale = grammi >= 1000 ? `${numero(grammi / 1000)} kg` : `${numero(grammi)} g`;
    return volte === 1 ? totale : `${volte} × ${peso} = ${totale}`;
  }
  if (parti[2] === "pz") return volte === 1 || parti[1] === "1" ? `${numero(valore)} pz` : `${volte} × ${peso} = ${numero(valore)} pz`;
  const singolare = parti[2].startsWith("mazz") ? "mazzo" : "cespo";
  return `${numero(valore)} ${valore === 1 ? singolare : `${singolare.slice(0, -1)}i`}`;
}

function aggiornataAlle(quando) {
  const giorno = new Date(quando).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
  const ora = new Date(quando).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
  return `Aggiornata ${giorno} alle ${ora}`;
}

function documentoConsegne(gruppi, kmPerGiorno) {
  const blocchi = [];
  if (!gruppi.length) blocchi.push({ tipo: "vuoto", testo: "Nessun ordine da consegnare: quando registri un ordine dal link WhatsApp compare qui." });
  gruppi.forEach((gruppo, indiceGiorno) => {
    const km = kmPerGiorno?.[indiceGiorno];
    const conKm = km && km.metodo !== "offline" && gruppo.ordini.length > 1;
    const totale = conKm ? km.km.reduce((somma, valore) => somma + (valore || 0), 0) : 0;
    const quante = gruppo.ordini.length;
    blocchi.push({ tipo: "giorno", testo: formatDate(gruppo.data), destra: `${quante} ${quante === 1 ? "consegna" : "consegne"}${conKm ? ` · ${kmTesto(totale)} km` : ""}` });
    gruppo.ordini.forEach((order, indice) => {
      const conserve = conserveDellOrdine(order);
      let destra = "1ª tappa";
      if (indice > 0) {
        const tratto = km?.km[indice];
        destra = !km ? "km…" : tratto == null ? "km ?" : `${km.approssimate[indice] ? "~" : "+"} ${kmTesto(tratto)} km`;
      }
      blocchi.push({
        tipo: "fermata",
        numero: indice + 1,
        titolo: `${order.deliveryWindow || order.time || "—"} · ${order.name}`,
        destra,
        righe: [
          `Tel. ${customerDisplayPhone(order.phone)}`,
          `${order.address}, ${order.area}${km?.mancanti?.[indice] ? " (indirizzo non trovato sulla mappa)" : ""}`,
          ...cassetteDellOrdine(order).map(cassetta => `Cassetta ${cassetta.box.toLowerCase()}: ${cassetta.items.length
            ? cassetta.items.map(item => `${item.quantity > 1 ? `${item.quantity}× ` : ""}${item.name}`).join(", ")
            : "le verdure sono nel messaggio WhatsApp"}`),
          conserve.length ? `Conserve: ${conserve.map(item => `${item.quantita}× ${item.nome}`).join(", ")}` : "",
          order.olio ? `Olio: ${latte(order.olio)}` : "",
          order.notes && !/^(Conserve|Olio):/.test(order.notes) ? `Note: ${order.notes}` : "",
          `Totale ${money(order.total)} · ordine #${order.id}`
        ].filter(Boolean)
      });
    });
  });
  const metodi = new Set((kmPerGiorno || []).map(km => km.metodo));
  let nota = "I km tra una consegna e la successiva si stanno calcolando.";
  if (kmPerGiorno) {
    nota = metodi.has("offline")
      ? "Km non disponibili: per calcolarli serve internet. Riapri la lista quando sei connesso."
      : metodi.has("aria")
        ? "Km in linea d'aria: il servizio delle strade non ha risposto. ~ = indirizzo non trovato, conto dal centro della località."
        : "Km su strada tra una consegna e la successiva (mappe OpenStreetMap). ~ = indirizzo non trovato, conto dal centro della località.";
  }
  if (gruppi.length) blocchi.push({ tipo: "nota", testo: `In ordine di fascia oraria. ${nota}` });
  return { titolo: "LISTA CONSEGNE", sottotitolo: aggiornataAlle(liste.alle), piede: "Sole Terra Acqua · lista consegne", nome: "lista-consegne", blocchi };
}

function documentoRaccolta(gruppi) {
  const blocchi = [];
  if (!gruppi.length) blocchi.push({ tipo: "vuoto", testo: "Nessun ordine da consegnare: quando registri un ordine dal link WhatsApp compare qui." });
  gruppi.forEach(gruppo => {
    const cassette = gruppo.ordini.flatMap(cassetteDellOrdine);
    blocchi.push({ tipo: "giorno", testo: formatDate(gruppo.data), destra: `${gruppo.ordini.length} ${gruppo.ordini.length === 1 ? "ordine" : "ordini"} · ${cassette.length} ${cassette.length === 1 ? "cassetta" : "cassette"}` });

    blocchi.push({ tipo: "sezione", testo: "CASSETTE DA PREPARARE" });
    ["Piccola", "Media", "Grande"].forEach(box => {
      const quante = cassette.filter(cassetta => cassetta.box === box).length;
      if (quante) blocchi.push({ tipo: "voce", testo: `Cassetta ${box.toLowerCase()}`, destra: `${quante}` });
    });

    const verdure = new Map();
    cassette.forEach(cassetta => cassetta.items.forEach(item => verdure.set(item.id, (verdure.get(item.id) || 0) + item.quantity)));
    blocchi.push({ tipo: "sezione", testo: "VERDURE DA RACCOGLIERE" });
    [...verdure.entries()]
      .map(([id, volte]) => ({ product: PRODUCTS.find(item => item.id === id), volte }))
      .filter(voce => voce.product)
      .sort((a, b) => a.product.name.localeCompare(b.product.name, "it"))
      .forEach(({ product, volte }) => blocchi.push({ tipo: "voce", testo: product.name, destra: quantitaRaccolta(product.weight, volte) }));
    if (!verdure.size) blocchi.push({ tipo: "nota", testo: "Nessuna verdura con l'elenco registrato per questo giorno." });
    const senzaElenco = gruppo.ordini.filter(order => cassetteDellOrdine(order).some(cassetta => cassetta.senzaElenco));
    if (senzaElenco.length) {
      blocchi.push({ tipo: "nota", testo: `Da aggiungere a mano: ${senzaElenco.length === 1 ? "l'ordine" : "gli ordini"} ${senzaElenco.map(order => `#${order.id} (${order.name})`).join(", ")} ${senzaElenco.length === 1 ? "è stato registrato" : "sono stati registrati"} prima di questo aggiornamento: le verdure le trovi nel messaggio WhatsApp.` });
    }

    const conserve = new Map();
    gruppo.ordini.flatMap(conserveDellOrdine).forEach(item => {
      const voce = conserve.get(item.id) || { nome: item.nome, quantita: 0 };
      voce.quantita += item.quantita;
      conserve.set(item.id, voce);
    });
    if (conserve.size) {
      blocchi.push({ tipo: "sezione", testo: "CONSERVE" });
      conserve.forEach(voce => blocchi.push({ tipo: "voce", testo: voce.nome, destra: `${voce.quantita} ${voce.quantita === 1 ? "vasetto" : "vasetti"}` }));
    }

    const olio = gruppo.ordini.reduce((somma, order) => somma + (Number(order.olio) || 0), 0);
    if (olio) {
      blocchi.push({ tipo: "sezione", testo: "OLIO" });
      blocchi.push({ tipo: "voce", testo: `Latte d'olio da ${OLIO.litri} L`, destra: `${olio} (${olio * OLIO.litri} litri)` });
    }
  });
  return { titolo: "LISTA RACCOLTA", sottotitolo: aggiornataAlle(liste.alle), piede: "Sole Terra Acqua · lista raccolta", nome: "lista-raccolta", blocchi };
}

function mostraStatoListe(testo) {
  const stato = $("#listeStato");
  if (stato) stato.textContent = testo;
}

async function aggiornaListe({ forza = false } = {}) {
  const gruppi = ordiniPerGiorno();
  const firma = JSON.stringify(gruppi.map(gruppo => [gruppo.data, gruppo.ordini.map(order => [order.id, order.address, order.area, order.deliveryWindow, order.status])]));
  if (!forza && firma === liste.firma && Date.now() - liste.alle < ORA_IN_MS) return;
  const giro = ++liste.giro;
  liste.firma = firma;
  liste.alle = Date.now();
  liste.raccolta = documentoRaccolta(gruppi);
  liste.consegne = documentoConsegne(gruppi, null);
  const ora = new Date(liste.alle).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
  const daCalcolare = gruppi.some(gruppo => gruppo.ordini.length > 1);
  mostraStatoListe(`Aggiornate alle ${ora}${daCalcolare ? " · calcolo i km…" : ""}`);
  if (liste.aperta) mostraLista(liste.aperta);
  if (!daCalcolare) return;
  try {
    const modulo = await caricaModuloListe();
    const kmPerGiorno = [];
    for (const gruppo of gruppi) kmPerGiorno.push(await modulo.calcolaKm(gruppo.ordini.map(order => ({ indirizzo: order.address, zona: order.area }))));
    if (giro !== liste.giro) return;   // nel frattempo e' arrivato un ordine: ci pensa il giro nuovo
    liste.consegne = documentoConsegne(gruppi, kmPerGiorno);
    const offline = kmPerGiorno.some(km => km.metodo === "offline");
    mostraStatoListe(`Aggiornate alle ${ora}${offline ? " · km non disponibili senza internet" : " · km calcolati"}`);
    if (liste.aperta === "consegne") mostraLista("consegne");
  } catch (_) {
    if (giro === liste.giro) mostraStatoListe(`Aggiornate alle ${ora} · km non disponibili`);
  }
}

let listeOrarie = null;
function avviaListeOrarie() {
  if (listeOrarie) return;
  listeOrarie = setInterval(() => {
    if (state.view === "dashboard" && isDashboardUnlocked()) aggiornaListe({ forza: true });
  }, ORA_IN_MS);
}

// anteprima a tutto schermo con "Scarica PDF" (e "Condividi" dove il telefono lo permette)
async function mostraLista(quale) {
  if (!liste[quale]) await aggiornaListe({ forza: true });
  const documento = liste[quale];
  const modulo = await caricaModuloListe();
  liste.aperta = quale;
  $("#visoreTitolo").textContent = documento.titolo;
  $("#visoreFoglio").innerHTML = modulo.documentoHtml(documento);
  const quando = new Date(liste.alle);
  const nome = `${documento.nome}-${oggiLocale()}-${String(quando.getHours()).padStart(2, "0")}${String(quando.getMinutes()).padStart(2, "0")}.pdf`;
  liste.file = new File([modulo.creaPdf(documento)], nome, { type: "application/pdf" });
  if (liste.urlPdf) URL.revokeObjectURL(liste.urlPdf);
  liste.urlPdf = URL.createObjectURL(liste.file);
  $("#visoreScarica").href = liste.urlPdf;
  $("#visoreScarica").download = nome;
  $("#visoreCondividi").hidden = !(navigator.canShare && navigator.canShare({ files: [liste.file] }));
  if ($("#visoreLista").hidden) {
    $("#visoreLista").hidden = false;
    $("#visoreFoglio").scrollTop = 0;
    document.body.style.overflow = "hidden";
  }
}

function chiudiLista() {
  liste.aperta = "";
  $("#visoreLista").hidden = true;
  document.body.style.overflow = "";
}

function optimizeRoutes() {
  const button = $("#optimizeRoutes");
  button.disabled = true;
  button.innerHTML = "<span>✦</span> ANALIZZO GLI INDIRIZZI…";
  setTimeout(() => {
    state.optimized = true;
    state.orders.sort((a, b) => {
      const zoneOrder = ["Viterbo", "Quercia", "Bagnaia", "San Martino", "Vitorchiano", "Vetralla", "Tobia"];
      return zoneOrder.indexOf(a.area) - zoneOrder.indexOf(b.area) || a.time.localeCompare(b.time);
    });
    $("#routeLine").setAttribute("d", "M105 232C160 205 205 100 270 122S350 205 445 188 535 75 618 85");
    button.innerHTML = "<span>✓</span> PERCORSI OTTIMIZZATI";
    renderDashboard();
    showToast("Percorsi raggruppati per vicinanza e fascia oraria.");
    setTimeout(() => { button.disabled = false; }, 700);
  }, 1200);
}

function setupEvents() {
  let fluttuaInCoda = false;
  window.addEventListener("scroll", () => {
    if (fluttuaInCoda) return;
    fluttuaInCoda = true;
    requestAnimationFrame(() => { fluttuaInCoda = false; aggiornaCassettaFluttuante(); aggiornaPostoAiuto(); });
  }, { passive: true });
  window.addEventListener("resize", aggiornaCassettaFluttuante);
  $("#menuButton").addEventListener("click", () => openMenu(true));
  $("#closeMenu").addEventListener("click", () => openMenu(false));
  $("#menuBackdrop").addEventListener("click", () => openMenu(false));
  $("#headerCart").addEventListener("click", () => { navigate("builder"); goToStep(2); });

  $$("[data-view-link]").forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    navigate(link.dataset.viewLink);
  }));
  $$("[data-home-anchor]").forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    navigate("home", link.dataset.homeAnchor);
  }));
  $$("[data-start-builder]").forEach(button => button.addEventListener("click", () => {
    navigate("builder");
    goToStep(1);
  }));
  $$("[data-next-step]").forEach(button => button.addEventListener("click", () => goToStep(state.step + 1)));
  $$("[data-prev-step]").forEach(button => button.addEventListener("click", () => goToStep(state.step - 1)));
  $$("[data-step-jump]").forEach(button => button.addEventListener("click", () => {
    const target = Number(button.dataset.stepJump);
    if (target <= state.step || target <= 2) goToStep(target);
    else showToast("Completa questo passaggio prima di continuare.");
  }));
  $$(".box-option").forEach(button => button.addEventListener("click", () => selectBox(button.dataset.box)));
  $$("[data-seconda]").forEach(button => button.addEventListener("click", () => aggiungiSecondaCassetta(button.dataset.seconda)));
  $$("[data-svuota-carrello]").forEach(button => button.addEventListener("click", chiediSvuotaCarrello));
  $("#cassetteSchede").addEventListener("click", event => {
    if (event.target.closest("[data-togli-seconda]")) togliSecondaCassetta();
    const scheda = event.target.closest("[data-cassetta]");
    if (scheda) scegliCassetta(Number(scheda.dataset.cassetta));
  });
  $("#areaChoices").addEventListener("change", event => {
    if (event.target.name !== "area") return;
    const zona = LOCALITA.find(localita => localita.nome === event.target.value);
    state.area = zona ? zona.nome : "";
    state.deliveryFee = zona ? zona.costo : 0;
    setupDatesAndTimes();
    updateSummary();
  });
  // + e − delle conserve: valgono sia nella scheda in home sia in fondo ai prodotti
  document.addEventListener("click", event => {
    const piu = event.target.closest("[data-conserva-piu]");
    const meno = event.target.closest("[data-conserva-meno]");
    if (piu) changeConserva(piu.dataset.conservaPiu, 1);
    else if (meno) changeConserva(meno.dataset.conservaMeno, -1);
    else if (event.target.closest("[data-olio-piu]")) changeOlio(1);
    else if (event.target.closest("[data-olio-meno]")) changeOlio(-1);
    else if (event.target.closest("[data-vai-carrello]")) {
      navigate("builder");
      goToStep(quotaCount() ? 2 : 1);
    }
  });
  $("#toReview").addEventListener("click", () => {
    if (validateDelivery()) {
      renderCheckout();
      goToStep(4);
    }
  });
  $("#confirmOrder").addEventListener("click", confirmOrder);
  $("#optimizeRoutes").addEventListener("click", optimizeRoutes);
  $$("[data-lista]").forEach(bottone => bottone.addEventListener("click", () => mostraLista(bottone.dataset.lista)));
  $$("[data-chiudi-visore]").forEach(bottone => bottone.addEventListener("click", chiudiLista));
  $("#visoreCondividi").addEventListener("click", () => {
    if (liste.file) navigator.share({ files: [liste.file], title: liste.file.name }).catch(() => {});
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !$("#visoreLista").hidden) chiudiLista();
  });
  $("#ordersTable").addEventListener("click", event => {
    const button = event.target.closest("[data-deliver-order]");
    if (button) markOrderDelivered(button.dataset.deliverOrder);
  });
  $("#customersTable").addEventListener("click", event => {
    const button = event.target.closest("[data-use-reward]");
    if (button) useCustomerReward(button.dataset.useReward);
  });
  $("#unlockDashboard").addEventListener("click", unlockDashboard);
  $("#lockDashboard").addEventListener("click", lockDashboard);
  $("#adminPinInput").addEventListener("keydown", event => {
    if (event.key === "Enter") unlockDashboard();
  });
  $("#adminPinInput").addEventListener("input", event => {
    event.target.classList.remove("invalid");
    $("#adminPinError").textContent = "";
  });
  $("#savePreserves").addEventListener("click", savePreservesSettings);
  $("#addPreserve").addEventListener("click", addPreserve);
  $("#preservesEditor").addEventListener("click", event => {
    const button = event.target.closest("[data-remove-preserve]");
    if (button) removePreserve(Number(button.dataset.removePreserve));
  });
  $("#popupConserveLista").addEventListener("click", event => {
    const bottone = event.target.closest("[data-popup-conserva]");
    if (!bottone || popupAppenaAperto()) return;
    changeConserva(bottone.dataset.popupConserva, 1);
    renderPopupConserve();
    renderCheckout();
  });
  $("#popupConserveConferma").addEventListener("click", () => {
    if (popupAppenaAperto()) return;
    chiudiPopupConserve();
    confirmOrder();
  });
  $("#popupConserveNo").addEventListener("click", () => {
    if (popupAppenaAperto()) return;
    state.conserveProposte = true;   // ha detto no: non lo richiedo per questo ordine
    chiudiPopupConserve();
    confirmOrder();
  });
  // informativa privacy: il link sta dentro l'etichetta della crocetta e non deve spuntarla
  document.addEventListener("click", event => {
    if (event.target.closest("[data-apri-privacy]")) {
      event.preventDefault();
      apriPrivacy();
    } else if (event.target.closest("[data-chiudi-privacy]") || event.target.id === "popupPrivacy") {
      chiudiPrivacy();
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !$("#popupPrivacy").hidden) chiudiPrivacy();
  });
  $("#popupConserve").addEventListener("click", event => {
    if (event.target === event.currentTarget && !popupAppenaAperto()) chiudiPopupConserve();   // tocco fuori: torno al riepilogo
  });
  $("#conserveScelta").addEventListener("click", event => {
    const bottone = event.target.closest("[data-conserva]");
    if (!bottone || bottone.dataset.conserva === conservaScelta) return;
    conservaScelta = bottone.dataset.conserva;
    renderConserve();
    $(`[data-conserva="${conservaScelta}"]`)?.focus({ preventScroll: true });
  });
  $$("[data-salva-settimana]").forEach(bottone => bottone.addEventListener("click", saveWeekSettings));
  $$("[data-annulla-modifica]").forEach(bottone => bottone.addEventListener("click", annullaModificaSettimana));
  $("#modificaSettimana").addEventListener("click", apriModificaSettimana);
  $("#weeklyProductsEditor").addEventListener("change", event => {
    if (event.target.matches("[data-admin-enabled]")) contaVerdureAccese();
  });
  $$("[data-tutte-verdure]").forEach(bottone => bottone.addEventListener("click", () => {
    $$("[data-admin-enabled]").forEach(input => { input.checked = bottone.dataset.tutteVerdure === "1"; });
    contaVerdureAccese();
  }));
  $("#chiavePubblicazione").addEventListener("input", event => event.target.classList.remove("invalid"));
  $("#cambiaChiave").addEventListener("click", () => {
    $("#pubblicaChiave").hidden = false;
    $("#chiavePubblicazione").focus();
  });
  $("#addDeliveryDay").addEventListener("click", addDeliveryDay);
  $("#deliveryDaysEditor").addEventListener("click", event => {
    const button = event.target.closest("[data-remove-delivery-day]");
    if (button) removeDeliveryDay(Number(button.dataset.removeDeliveryDay));
  });
  $("#weeklyProductsEditor").addEventListener("change", event => {
    if (event.target.matches("[data-admin-photo]")) handleProductPhoto(event.target);
  });
  $$("[data-order-filter]").forEach(button => button.addEventListener("click", () => {
    $$("[data-order-filter]").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderDashboard(button.dataset.orderFilter);
  }));
  $$("input, select, textarea", $("#deliveryForm")).forEach(field => field.addEventListener("input", () => field.classList.remove("invalid")));
  // "come mi hai conosciuto": toccando di nuovo la risposta scelta la si toglie (e' facoltativa)
  $$('input[name="discovery"]').forEach(input => {
    const etichetta = input.closest("label");
    etichetta.addEventListener("pointerdown", () => { input.dataset.eraScelta = input.checked ? "1" : ""; });
    etichetta.addEventListener("click", event => {
      if (input.dataset.eraScelta === "1") {
        event.preventDefault();
        input.checked = false;
        input.dataset.eraScelta = "";
      }
    });
  });
  $("#privacyCheck").addEventListener("change", event => {
    if (event.target.checked) $(".privacy-check").classList.remove("da-completare");
  });
  window.addEventListener("resize", () => {
    $("#mobileBasketBar").style.display = state.view === "builder" && window.innerWidth <= 980 ? "flex" : "";
    aggiornaPostoAiuto();
  });
  // "Problemi? Scrivimi": il messaggio dice gia' versione, pagina e telefono, cosi' capisco subito dove guardare
  $("#aiutoWhatsapp").addEventListener("click", event => {
    const pagina = state.view === "builder" ? `componi la cassetta, passo ${state.step}` : state.view === "dashboard" ? "area azienda" : "home";
    const telefono = /iPhone|iPad/.test(navigator.userAgent) ? "iPhone" : /Android/.test(navigator.userAgent) ? "Android" : "computer";
    const testo = `Ciao Alessio, ho un problema con il sito: \n\n(versione ${VERSIONE_SITO} · ${pagina} · ${telefono})`;
    event.currentTarget.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(testo)}`;
  });
}

// 3D leggero: le schede si inclinano verso il mouse; sul telefono verso il dito che preme.
function setupInclinazione3D() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const SCHEDE = ".weekly-products article, .product-card, .box-option";
  const conMouse = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const inclina = (scheda, evento, forza) => {
    const r = scheda.getBoundingClientRect();
    const x = Math.min(.5, Math.max(-.5, (evento.clientX - r.left) / r.width - .5));
    const y = Math.min(.5, Math.max(-.5, (evento.clientY - r.top) / r.height - .5));
    scheda.style.setProperty("--incl-x", `${(-y * forza).toFixed(2)}deg`);
    scheda.style.setProperty("--incl-y", `${(x * forza).toFixed(2)}deg`);
    scheda.style.setProperty("--luce-x", `${((x + .5) * 100).toFixed(1)}%`);
    scheda.style.setProperty("--luce-y", `${((y + .5) * 100).toFixed(1)}%`);
    scheda.classList.add("inclinata");
  };
  const raddrizza = scheda => scheda?.classList.remove("inclinata");
  if (conMouse) {
    let attuale = null;
    document.addEventListener("pointermove", evento => {
      const scheda = evento.target.closest?.(SCHEDE) || null;
      if (attuale && attuale !== scheda) raddrizza(attuale);
      attuale = scheda;
      if (scheda) inclina(scheda, evento, 9);
    }, { passive: true });
    document.addEventListener("mouseout", evento => { if (!evento.relatedTarget) { raddrizza(attuale); attuale = null; } });
  } else {
    document.addEventListener("pointerdown", evento => {
      const scheda = evento.target.closest?.(SCHEDE);
      if (scheda) inclina(scheda, evento, 6);
    }, { passive: true });
    ["pointerup", "pointercancel"].forEach(tipo => document.addEventListener(tipo, () => $$(".inclinata").forEach(raddrizza), { passive: true }));
  }
}

// 3D leggero: la galleria "Dal campo" diventa un anello di foto che si gira col dito o col mouse.
function setupGalleria3D() {
  const binario = $(".gallery-rail");
  if (!binario || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const foto = $$("figure", binario);
  const n = foto.length;
  if (n < 3) return;
  const anello = document.createElement("div");
  anello.className = "anello";
  foto.forEach(f => anello.appendChild(f));
  binario.appendChild(anello);
  binario.classList.add("anello-attivo");

  const passo = 360 / n;
  let angolo = 0, obiettivo = 0, velocita = 0, trascino = null, ultimoTocco = performance.now(), inVista = false, inCorsa = false;

  const frecce = [["prec", "‹", 1, "Foto precedente"], ["succ", "›", -1, "Foto successiva"]].map(([classe, segno, verso, etichetta]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `anello-freccia ${classe}`;
    b.textContent = segno;
    b.setAttribute("aria-label", etichetta);
    b.addEventListener("click", () => { obiettivo = Math.round(angolo / passo) * passo + verso * passo; velocita = 0; ultimoTocco = performance.now(); avvia(); });
    binario.appendChild(b);
    return b;
  });

  const disponi = () => {
    const larghezza = foto[0].offsetWidth || 260;
    const raggio = Math.round(larghezza / (2 * Math.tan(Math.PI / n)) * 1.16);
    binario.style.setProperty("--raggio", `${raggio}px`);
    foto.forEach((f, i) => f.style.setProperty("--angolo", `${i * passo}deg`));
    anello.style.transform = `translateZ(${-raggio}px) rotateY(${angolo}deg)`;
  };
  const disegna = () => {
    const raggio = parseFloat(binario.style.getPropertyValue("--raggio")) || 250;
    anello.style.transform = `translateZ(${-raggio}px) rotateY(${angolo}deg)`;
    foto.forEach((f, i) => {
      const a = (((i * passo + angolo) % 360) + 540) % 360 - 180;   // 0 = davanti
      const vicino = Math.cos(a * Math.PI / 180);
      f.style.opacity = vicino > 0 ? (0.35 + 0.65 * vicino).toFixed(3) : "0";
      f.classList.toggle("davanti", Math.abs(a) < passo / 2);
    });
  };
  const passoAnimazione = ora => {
    if (!trascino) {
      if (Math.abs(velocita) > .05) {
        angolo += velocita;
        velocita *= .93;
        obiettivo = Math.round(angolo / passo) * passo;
      } else {
        velocita = 0;
        if (ora - ultimoTocco > 4200) { obiettivo -= passo; ultimoTocco = ora; }   // gira da sola, una foto alla volta
        angolo += (obiettivo - angolo) * .085;
      }
    }
    disegna();
    if (inVista && !document.hidden) requestAnimationFrame(passoAnimazione);
    else inCorsa = false;
  };
  const avvia = () => { if (!inCorsa && inVista) { inCorsa = true; requestAnimationFrame(passoAnimazione); } };

  binario.addEventListener("pointerdown", evento => {
    if (evento.target.closest(".anello-freccia")) return;
    trascino = { x: evento.clientX, ultimo: evento.clientX, id: evento.pointerId, mosso: false };
    velocita = 0;
    ultimoTocco = performance.now();
  });
  binario.addEventListener("pointermove", evento => {
    if (!trascino || evento.pointerId !== trascino.id) return;
    const dx = evento.clientX - trascino.ultimo;
    if (!trascino.mosso && Math.abs(evento.clientX - trascino.x) > 6) {
      trascino.mosso = true;
      binario.classList.add("trascino");
      try { binario.setPointerCapture(evento.pointerId); } catch (_) {}
    }
    if (!trascino.mosso) return;
    trascino.ultimo = evento.clientX;
    angolo += dx * .32;
    velocita = dx * .32;
    ultimoTocco = performance.now();
  });
  const lascia = evento => {
    if (!trascino) return;
    if (!trascino.mosso) {   // un tocco su una foto laterale la porta davanti
      const toccata = evento.target.closest?.("figure");
      const i = foto.indexOf(toccata);
      if (i >= 0) {
        const a = (((i * passo + angolo) % 360) + 540) % 360 - 180;
        obiettivo = Math.round((angolo - a) / passo) * passo;
      }
    }
    trascino = null;
    binario.classList.remove("trascino");
    ultimoTocco = performance.now();
  };
  binario.addEventListener("pointerup", lascia);
  binario.addEventListener("pointercancel", lascia);

  new IntersectionObserver(voci => {
    inVista = voci.some(v => v.isIntersecting);
    if (inVista) avvia();
  }).observe(binario);
  document.addEventListener("visibilitychange", avvia);
  window.addEventListener("resize", () => { disponi(); disegna(); });
  requestAnimationFrame(() => { disponi(); disegna(); });
  frecce.forEach(b => b.hidden = false);
}

// Campo 3D in apertura: si carica a pagina pronta, solo se il telefono lo regge.
// Furgoncino: entra sfrecciando, frena un attimo nella parte con la foto e riparte.
// Una volta sola, quando si apre la home; mai sopra i titoli.
function setupFurgone() {
  const hero = $(".hero");
  const furgone = $("#furgone");
  if (!hero || !furgone) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || state.view !== "home") { furgone.remove(); return; }

  const misura = () => {
    const larghezza = hero.clientWidth;
    const riquadro = $(".hero-proof", hero);
    const testi = $(".hero-content", hero);
    let w;
    let top;
    if (larghezza <= 980) {
      // telefono: nello spazio libero tra il riquadro KM 0 (in alto) e i testi (in basso)
      const sopra = riquadro.offsetTop + riquadro.offsetHeight + 14;
      const sotto = testi.offsetTop - 10;
      w = Math.max(130, Math.min(210, larghezza * 0.52, (sotto - sopra) * 330 / 175));
      const h = w * 175 / 330;
      top = sopra + Math.max(0, (sotto - sopra - h) / 2);
    } else {
      // computer: nella meta' con la foto, sopra il riquadro KM 0
      w = Math.min(330, Math.max(250, larghezza * 0.22));
      top = riquadro.offsetTop - w * 175 / 330 - 16;
    }
    const sosta = larghezza <= 980 ? (larghezza - w) / 2 : Math.max(24, larghezza * 0.24 - w / 2);
    furgone.style.setProperty("--furgone-w", `${Math.round(w)}px`);
    furgone.style.setProperty("--fuori-sx", `${Math.round(-w * 1.5)}px`);
    furgone.style.setProperty("--sosta", `${Math.round(sosta)}px`);
    furgone.style.setProperty("--fuori-dx", `${Math.round(larghezza + 40)}px`);
    furgone.style.top = `${Math.round(top)}px`;
  };

  let partito = false;
  const parti = () => {
    if (partito) return;
    partito = true;
    if (state.view !== "home" || hero.getBoundingClientRect().bottom < 120) { furgone.remove(); return; }
    misura();
    furgone.classList.add("in-viaggio");
    furgone.addEventListener("animationend", event => { if (event.target === furgone) furgone.remove(); });
  };
  const quandoVisibile = () => {
    if (!document.hidden) { setTimeout(parti, 700); return; }
    document.addEventListener("visibilitychange", function attendi() {
      if (document.hidden) return;
      document.removeEventListener("visibilitychange", attendi);
      setTimeout(parti, 700);
    });
  };
  const foto = $("picture img", hero) || $("img", hero);
  if (foto && !foto.complete) {
    foto.addEventListener("load", quandoVisibile, { once: true });
    foto.addEventListener("error", quandoVisibile, { once: true });
  } else {
    quandoVisibile();
  }
}

function setupCampo3D() {
  const hero = $(".hero");
  if (!hero || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (navigator.connection?.saveData) return;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return;
  const parti = () => import(`./campo3d.js?v=${VERSIONE_SITO}`).then(m => m.avviaCampo3D(hero)).catch(() => {});
  if ("requestIdleCallback" in window) requestIdleCallback(parti, { timeout: 1500 });
  else setTimeout(parti, 700);
}

function setupReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  $$(".reveal").forEach(el => observer.observe(el));
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (!["http:", "https:"].includes(window.location.protocol)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).catch(() => {});
    // e' uscita una versione nuova: rispondo "ho capito" e mi ricarico appena il cliente
    // non sta compilando la consegna o confermando (altrimenti ci riprovo dopo)
    navigator.serviceWorker.addEventListener("message", event => {
      if (!event.data || event.data.tipo !== "nuova-versione") return;
      event.source?.postMessage({ tipo: "ho-capito" });
      ultimoControlloVersione = 0;
      controllaVersione();
    });
  });
}

function openInitialRoute() {
  const params = new URLSearchParams(window.location.search);
  if (params.get(OWNER_QUERY) === OWNER_VALUE || window.location.hash === "#dashboard") {
    navigate("dashboard");
  }
}

function init() {
  $("#versioneSito").textContent = `versione ${VERSIONE_SITO}`;
  window.addEventListener("load", aggiornaPostoAiuto);
  setTimeout(controllaVersione, 4000);
  $("#ordiniChiusiWhatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}`;
  loadLocalOrder();
  loadAdminSettings();
  loadPreserves();
  ripristinaCarrello();
  renderConserve();
  renderConserveCarrello();
  renderOlio();
  renderProducts();
  setupDatesAndTimes();
  setupEvents();
  setupReveal();
  setupInclinazione3D();
  setupGalleria3D();
  setupCampo3D();
  setupFurgone();
  updateSummary();
  renderDashboard();
  if (!importOrderFromHash()) openInitialRoute();
  showDashboardGate();
  registerServiceWorker();
  aggiornaSettimanaDalSito();
}

init();
