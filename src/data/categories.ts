// src/data/categories.ts

// DOČASNÁ data – jen aby fungoval /kategorie/[slug]
const CATEGORIES = [
  {
    slug: "domacnost-uklid",
    title: "Domácnost & úklid",
    subcategories: [
      { title: "Generální úklid" },
      { title: "Běžný úklid" },
      { title: "Mytí oken" },
      { title: "Úklid po rekonstrukci" },
    ],
  },
  {
    slug: "remesla-a-stavebni-prace",
    title: "Řemesla a stavební práce",
    subcategories: [
      { title: "Elektrikář" },
      { title: "Instalatér" },
      { title: "Sádrokartony" },
      { title: "Malování a tapety" },
    ],
  },
  {
    slug: "zahrada-exterier",
    title: "Zahrada & exteriér",
    subcategories: [
      { title: "Sekání trávy" },
      { title: "Péče o záhony" },
      { title: "Zahradní architekt" },
      { title: "Zimní údržba" },
    ],
  },
];

export default CATEGORIES;
