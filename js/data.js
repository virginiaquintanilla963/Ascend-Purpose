// ============================================================
// PymeAscend – Datos de productos
// ============================================================

const COLORS = {
  tierra: [
    { id: "cafe",       name: "Café",      hex: "#6B5344" },
    { id: "olivo",      name: "Verde Olivo", hex: "#6B7A5A" },
    { id: "beige",      name: "Beige",     hex: "#D4C5A9" },
    { id: "negro",      name: "Negro",     hex: "#1A1A1A" },
  ],
  pastel: [
    { id: "calipso",    name: "Calipso",   hex: "#7EC8C8" },
    { id: "amarillo",   name: "Amarillo",  hex: "#F5D76E" },
    { id: "rosado",     name: "Rosado",    hex: "#F4A7B9" },
  ]
};

const TALLAS_POLERON  = ["S", "M", "L", "XL"];
const TALLAS_BUZO     = ["36", "38", "40", "42"];

// Precio base (puedes cambiarlos)
const PRECIO_POLERON  = 19990;
const PRECIO_BUZO     = 17990;

// Genera items de poleron por grupo de color
function buildPolerones(grupo) {
  return COLORS[grupo].map(color => ({
    id:       `poleron-${color.id}`,
    tipo:     "poleron",
    nombre:   `Poleron ${color.name}`,
    color:    color,
    grupo:    grupo,
    tallas:   TALLAS_POLERON,
    precio:   PRECIO_POLERON,
    emoji:    "🧥",
    descripcion: `Poleron de composicion 70% algodón y 30% poliester en color ${color.name}. Confección de calidad, amplio y cómodo.`,
  }));
}

function buildBuzos(grupo) {
  return COLORS[grupo].map(color => ({
    id:       `buzo-${color.id}`,
    tipo:     "buzo",
    nombre:   `Pantalón Buzo ${color.name}`,
    color:    color,
    grupo:    grupo,
    tallas:   TALLAS_BUZO,
    precio:   PRECIO_BUZO,
    emoji:    "👖",
    descripcion: `Pantalón de buzo en color ${color.name}. Elástico en cintura, corte cómodo para el día a día.`,
  }));
}

const ACCESORIOS = [
  {
    id: "acc-gorro",
    nombre: "Gorro Tejido",
    precio: 8990,
    emoji: "🧢",
    descripcion: "Gorro de punto, abrigado y en colores neutros que combinan con todo.",
    disponible: true,
  },
  {
    id: "acc-bufanda",
    nombre: "Bufanda Polar",
    precio: 7990,
    emoji: "🧣",
    descripcion: "Bufanda suave y larga en polar de alta densidad.",
    disponible: true,
  },
  {
    id: "acc-mochila",
    nombre: "Mochila Básica",
    precio: 24990,
    emoji: "🎒",
    descripcion: "Mochila ligera de 20L con compartimiento acolchado para notebook.",
    disponible: true,
  },
  {
    id: "acc-medias",
    nombre: "Pack Medias x3",
    precio: 4990,
    emoji: "🧦",
    descripcion: "Pack de 3 pares de medias de algodón con licra. Tallas S–L.",
    disponible: true,
  },
  {
    id: "acc-cinturon",
    nombre: "Cinturón Elástico",
    precio: 6990,
    emoji: "🪢",
    descripcion: "Cinturón elástico unisex con hebilla metálica, ajustable.",
    disponible: true,
  },
  {
    id: "acc-bolso",
    nombre: "Bolso Tote",
    precio: 12990,
    emoji: "👜",
    descripcion: "Bolso tipo tote de canvas resistente, gran capacidad.",
    disponible: true,
  },
];

window.PYMEDATA = {
  polerones: {
    tierra: buildPolerones("tierra"),
    pastel: buildPolerones("pastel"),
  },
  buzos: {
    tierra: buildBuzos("tierra"),
    pastel: buildBuzos("pastel"),
  },
  accesorios: ACCESORIOS,
};
