// src/data/categories.ts
// PINDOO – sjednocený zdroj kategorií + podkategorií (podle exportu z Kreezalidu)
// Tuhle verzi používej všude, ať se to už nerozjede.

export const CATEGORIES = [
  {
    slug: "domacnost-a-uklid",
    title: "Domácnost & úklid",
    subcategories: [
      { slug: "generalni-jednorazovy-uklid", title: "Generální jednorázový úklid" },
      { slug: "bezny-jednorazovy-uklid", title: "Běžný jednorázový úklid" },
      { slug: "pravidelny-uklid", title: "Pravidelný úklid" },
      { slug: "myti-oken-a-vyloh", title: "Mytí oken & výloh" },
      { slug: "cisteni-kobercu-a-calouneni", title: "Čištění koberců / čalounění" },
      { slug: "vyklizeni-a-odvoz-odpadu", title: "Vyklízení & odvoz odpadu" },
      { slug: "turnover-pro-airbnb", title: "Turnover pro Airbnb / krátkodobé ubytování" },
      { slug: "domaci-pomoc", title: "Domácí pomoc" },
    ],
  },
  {
    slug: "remesla-a-stavebni-prace",
    title: "Řemesla a stavební práce",
    subcategories: [
      { slug: "elektrikar", title: "Elektrikář" },
      { slug: "instalater-a-topenar", title: "Instalatér & topenář" },
      { slug: "zednik-a-sadrokarton", title: "Zedník & sádrokarton" },
      { slug: "malir-a-lakyrnik", title: "Malíř & lakýrník" },
      { slug: "podlahar", title: "Podlahář" },
      { slug: "tesarstvi-a-truhlarstvi", title: "Tesařství & truhlářství" },
      { slug: "zamecnik-a-kovovyroba", title: "Zámečník & kovovýroba" },
      { slug: "pokryvac", title: "Pokrývač" },
      { slug: "kominik", title: "Kominík" },
      { slug: "plynar", title: "Plynař" },
      { slug: "pozarni-ochrana", title: "Požární ochrana" },
    ],
  },
  {
    slug: "zahrada-a-exterier",
    title: "Zahrada & exteriér",
    subcategories: [
      { slug: "sekani-travy-a-udrzba", title: "Sekání trávy & údržba" },
      { slug: "rez-a-tvarovani-drevin", title: "Řez a tvarování dřevin" },
      { slug: "pece-o-zahony", title: "Péče o záhony" },
      { slug: "zahradni-architekt", title: "Zahradní architekt" },
      { slug: "uklid-listi-a-bioodpadu", title: "Úklid listí & bioodpad" },
      { slug: "pokladka-dlazby-a-chodniku", title: "Pokládka dlažby & chodníky" },
      { slug: "pergoly-ploty-a-drobne-stavby", title: "Pergoly & ploty & drobné stavby" },
      { slug: "zimni-udrzba", title: "Zimní údržba" },
    ],
  },
  {
    slug: "krasa",
    title: "Krása",
    subcategories: [
      { slug: "permanentni-makeup", title: "Permanentní make-up" },
      { slug: "kosmetika", title: "Kosmetika" },
      { slug: "lasery-a-peelingy", title: "Lasery & peelingy" },
      { slug: "masaze", title: "Masáže" },
      { slug: "vlasy-a-kadernictvi", title: "Vlasy & kadeřnictví" },
      { slug: "nehty-a-manikura", title: "Nehty & manikúra" },
    ],
  },
  {
    slug: "zdravi-a-wellness",
    title: "Zdraví & wellness",
    subcategories: [
      { slug: "fyzioterapie", title: "Fyzioterapie" },
      { slug: "masaze-terapeuticke", title: "Terapeutické masáže" },
      { slug: "nutricni-poradenstvi", title: "Nutriční poradenství" },
      { slug: "mentoring-a-koucink", title: "Mentoring & koučink" },
    ],
  },
  {
    slug: "pece-o-deti",
    title: "Péče o děti",
    subcategories: [
      { slug: "hlidani-deti", title: "Hlídání dětí" },
      { slug: "doucovani-deti", title: "Doučování dětí" },
      { slug: "asistence-pro-deti", title: "Asistence pro děti" },
    ],
  },
  {
    slug: "pece-o-zvirata",
    title: "Péče o zvířata",
    subcategories: [
      { slug: "hlidani-psu-a-kocek", title: "Hlídání psů a koček" },
      { slug: "venic-psu", title: "Venič psů" },
      { slug: "vycvik-a-socializace", title: "Výcvik & socializace" },
      { slug: "pece-o-srst", title: "Péče o srst" },
    ],
  },
  {
    slug: "auto-moto-a-doprava",
    title: "Auto, moto & doprava",
    subcategories: [
      { slug: "odtah-a-prevoz", title: "Odtah & převoz" },
      { slug: "preprava-osob", title: "Přeprava osob" },
      { slug: "myti-a-detailing", title: "Mytí & detailing" },
    ],
  },
  {
    slug: "udalosti-a-svatby",
    title: "Události & svatby",
    subcategories: [
      { slug: "svatebni-makeup-a-vlasy", title: "Svatební make-up & vlasy" },
      { slug: "organizace-akci", title: "Organizace akcí" },
      { slug: "catering", title: "Catering" },
    ],
  },
  {
    slug: "foto-video-a-audio",
    title: "Foto & video & audio",
    subcategories: [
      { slug: "fotograf", title: "Fotograf" },
      { slug: "videotvorba", title: "Videotvorba" },
      { slug: "strih-a-postprodukce", title: "Střih & postprodukce" },
    ],
  },
  {
    slug: "podnikani-a-administrativa",
    title: "Podnikání & administrativa",
    subcategories: [
      { slug: "ucetnictvi", title: "Účetnictví" },
      { slug: "administrativni-vypomoc", title: "Administrativní výpomoc" },
      { slug: "preklady-a-tlumoceni", title: "Překlady & tlumočení" },
    ],
  },
  {
    slug: "uceni-hobby-a-volny-cas",
    title: "Učení & hobby & volný čas",
    subcategories: [
      { slug: "vyuka-jazyku", title: "Výuka jazyků" },
      { slug: "hudebni-vyuka", title: "Hudební výuka" },
      { slug: "sportovni-trener", title: "Sportovní trenér" },
    ],
  },
  {
    slug: "pece-o-seniory",
    title: "Péče o seniory",
    subcategories: [
      { slug: "doprovod-k-lekari", title: "Doprovod k lékaři" },
      { slug: "domaci-pece", title: "Domácí péče" },
    ],
  },
  {
    slug: "it-a-digitalni-tvorba",
    title: "IT & digitální tvorba",
    subcategories: [
      { slug: "tvorba-webu", title: "Tvorba webu" },
      { slug: "grafika-a-branding", title: "Grafika & branding" },
      { slug: "sprava-socialnich-siti", title: "Správa sociálních sítí" },
    ],
  },
];

// ⬇️ kvůli tomu, že máš v projektu dvě různé varianty importu
export default CATEGORIES;
