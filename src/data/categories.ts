// src/data/categories.ts

export type Subcategory = {
  slug: string;
  title: string;
};

export type Category = {
  slug: string;
  title: string;
  subcategories: Subcategory[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "domacnost-a-uklid",
    title: "Domácnost & úklid",
    subcategories: [
      { slug: "generalni-uklid", title: "Generální jednorázový úklid" },
      { slug: "bezny-uklid", title: "Běžný jednorázový úklid" },
      { slug: "pravidelny-uklid", title: "Pravidelný úklid" },
      { slug: "myti-oken-a-vyloh", title: "Mytí oken & výloh" },
      { slug: "cisteni-kobercu", title: "Čištění koberců / čalounění" },
      { slug: "vyklizeni-a-odvoz", title: "Vyklízení & odvoz odpadu" },
      { slug: "turnover-airbnb", title: "Turnover pro Airbnb / krátkodobé ubytování" },
      { slug: "domaci-pomoc", title: "Domácí pomoc" },
    ],
  },
  {
    slug: "remesla-a-stavebni-prace",
    title: "Řemesla a stavební práce",
    subcategories: [
      { slug: "elektro", title: "Elektro / elektrikář" },
      { slug: "voda-topeni-plyn", title: "Voda / topení / plyn" },
      { slug: "rekonstrukce", title: "Rekonstrukce a stavební práce" },
    ],
  },
  {
    slug: "zahrada-a-exterier",
    title: "Zahrada & exteriér",
    subcategories: [
      { slug: "sekani-travy", title: "Sekání trávy" },
      { slug: "udrzba-zahrady", title: "Pravidelná údržba zahrady" },
      { slug: "strihani-krovi", title: "Stříhání keřů / stromů" },
    ],
  },
  {
    slug: "krasa",
    title: "Krása",
    subcategories: [
      { slug: "permanentni-makeup", title: "Permanentní make-up" },
      { slug: "rasy-a-oboci", title: "Řasy & obočí" },
      { slug: "kosmeticka-pece", title: "Kosmetická péče" },
    ],
  },
  {
    slug: "zdravi-a-wellness",
    title: "Zdraví & wellness",
    subcategories: [
      { slug: "masaze", title: "Masáže" },
      { slug: "fyzioterapie", title: "Fyzioterapie" },
      { slug: "wellness", title: "Wellness / regenerace" },
    ],
  },
  {
    slug: "pece-o-deti",
    title: "Péče o děti",
    subcategories: [
      { slug: "hlidani-deti", title: "Hlídání dětí" },
      { slug: "doucovani", title: "Doučování" },
      { slug: "detske-krouzky", title: "Dětské kroužky" },
    ],
  },
  {
    slug: "pece-o-zvirata",
    title: "Péče o zvířata",
    subcategories: [
      { slug: "hlidani-psu", title: "Hlídání psů / koček" },
      { slug: "venceni-psu", title: "Venčení psů" },
      { slug: "psi-salon", title: "Psí salon / úprava" },
    ],
  },
  {
    slug: "auto-moto-a-doprava",
    title: "Auto, moto & doprava",
    subcategories: [
      { slug: "odtah", title: "Odtah / převoz" },
      { slug: "preprava-osob", title: "Přeprava osob" },
      { slug: "preprava-zasilek", title: "Přeprava zásilek" },
    ],
  },
  {
    slug: "udalosti-a-svatby",
    title: "Události & svatby",
    subcategories: [
      { slug: "svatebni-koordinace", title: "Svatební koordinace" },
      { slug: "catering", title: "Catering" },
      { slug: "akce-foto-video", title: "Foto / video na akci" },
    ],
  },
  {
    slug: "foto-video-a-audio",
    title: "Foto & video & audio",
    subcategories: [
      { slug: "fotograf", title: "Fotograf" },
      { slug: "kameraman", title: "Kameraman" },
      { slug: "strih", title: "Střih / postprodukce" },
    ],
  },
  {
    slug: "podnikani-a-administrativa",
    title: "Podnikání & administrativa",
    subcategories: [
      { slug: "ucetnictvi", title: "Účetnictví" },
      { slug: "virtualni-asistent", title: "Virtuální asistent" },
      { slug: "preklady", title: "Překlady" },
    ],
  },
  {
    slug: "uceni-hobby-a-volny-cas",
    title: "Učení & hobby & volný čas",
    subcategories: [
      { slug: "jazykove-lekce", title: "Jazykové lekce" },
      { slug: "tvorive-kurzy", title: "Tvořivé kurzy" },
      { slug: "sportovni-trener", title: "Sportovní trenér" },
    ],
  },
  {
    slug: "pece-o-seniory",
    title: "Péče o seniory",
    subcategories: [
      { slug: "domaci-pece", title: "Domácí péče" },
      { slug: "doprovod-k-lekari", title: "Doprovod k lékaři" },
    ],
  },
  {
    slug: "it-a-digitalni-tvorba",
    title: "IT & digitální tvorba",
    subcategories: [
      { slug: "weby", title: "Tvorba webu" },
      { slug: "grafika", title: "Grafika / AI grafika" },
      { slug: "socialni-site", title: "Správa sociálních sítí" },
    ],
  },
];

export default CATEGORIES;
