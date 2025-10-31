// src/data/categories.ts

// Tohle je miniverze – jen aby Next nezkolaboval.
// Později to napojíme na tvoje CSV/XLSX z Kreezalidu.

const CATEGORIES = [
  {
    slug: "domacnost-a-uklid",
    title: "Domácnost & úklid",
    subcategories: [
      { slug: "generalni-uklid", title: "Generální jednorázový úklid" },
      { slug: "bezny-uklid", title: "Běžný jednorázový úklid" },
      { slug: "pravidelny-uklid", title: "Pravidelný úklid" },
    ],
  },
  {
    slug: "remesla-a-stavebni-prace",
    title: "Řemesla a stavební práce",
    subcategories: [
      { slug: "elektrikar", title: "Elektro" },
      { slug: "vodar", title: "Voda / topení" },
    ],
  },
  {
    slug: "zahrada-a-exterier",
    title: "Zahrada & exteriér",
    subcategories: [
      { slug: "sekani-travy", title: "Sekání trávy" },
    ],
  },
];

export default CATEGORIES;
