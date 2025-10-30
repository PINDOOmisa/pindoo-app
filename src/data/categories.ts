// src/data/categories.ts

export type Subcategory = {
  title: string;
  slug: string;
  attributes?: any[];
  image?: string | null;
};

export type Category = {
  title: string;
  subtitle?: string | null;
  slug: string;
  image?: string | null;
  subcategories?: Subcategory[];
};

export const CATEGORIES: Category[] = [
  {
    title: "Domácnost & úklid",
    subtitle: "Domácnost & úklid",
    slug: "domacnost-uklid",
    subcategories: [
      { title: "Generální jednorázový úklid", slug: "generalni-jednorazovy-uklid" },
      { title: "Běžný jednorázový úklid", slug: "bezny-jednorazovy-uklid" },
      { title: "Pravidelný úklid", slug: "pravidelny-uklid" },
      { title: "Mytí oken & výloh", slug: "myti-oken-vyloh" },
      { title: "Čištění koberců / čalounění", slug: "cisteni-kobercu-calouneni" },
      { title: "Vyklízení & odvoz odpadu", slug: "vyklizeni-odvoz-odpadu" },
      { title: "Turnover pro Airbnb / krátkodobé ubytování", slug: "turnover-pro-airbnb-kratkodobe-ubytovani" },
      { title: "Domácí pomoc", slug: "domaci-pomoc" }
    ]
  },
  {
    title: "Řemesla a stavební práce",
    subtitle: "Řemesla a stavební práce",
    slug: "remesla-a-stavebni-prace",
    subcategories: [
      { title: "Elektrikář", slug: "elektrikar" },
      { title: "Instalatér & topenář", slug: "instalater-topenar" },
      { title: "Zedník & sádrokarton", slug: "zednik-sadrokarton" },
      { title: "Malíř & lakýrník", slug: "malir-lakyrnik" },
      { title: "Podlahář", slug: "podlahar" },
      { title: "Tesařství & truhlářství", slug: "tesarstvi-truhlarstvi" },
      { title: "Obkladač", slug: "obkladac" },
      { title: "Zámečník & kovovýroba", slug: "zamecnik-kovovyroba" },
      { title: "Pokrývač", slug: "pokryvac" },
      { title: "Kominík", slug: "kominik" },
      { title: "Plynař", slug: "plynar" },
      { title: "Požární ochrana", slug: "pozarni-ochrana" },
      { title: "Tlakové nádoby", slug: "tlakove-nadoby" }
    ]
  },
  {
    title: "Zahrada & exteriér",
    subtitle: "Zahrada & exteriér",
    slug: "zahrada-exterier",
    subcategories: [
      { title: "Sekání trávy & údržba", slug: "sekani-travy-udrzba" },
      { title: "Řez a tvarování dřevin", slug: "rez-a-tvarovani-drevin" },
      { title: "Péče o záhony", slug: "pece-o-zahony" },
      { title: "Zahradní architekt", slug: "zahradni-architekt" },
      { title: "Úklid listí & bioodpad", slug: "uklid-listi-bioodpad" },
      { title: "Pokládka dlažby & chodníky", slug: "pokladka-dlazby-chodniky" },
      { title: "Pergoly & ploty & drobné stavby", slug: "pergoly-ploty-drobne-stavby" },
      { title: "Zimní údržba", slug: "zimni-udrzba" },
      { title: "Studny, čističky & voda na pozemku", slug: "studny-cisticky-voda-na-pozemku" }
    ]
  },
  {
    title: "Krása",
    slug: "krasa",
    subcategories: [
      { title: "Permanentní make-up", slug: "permanentni-make-up" },
      { title: "Kosmetika & pleť", slug: "kosmetika-plet" },
      { title: "Řasy", slug: "rasy" },
      { title: "Kadeřnictví & barber", slug: "kadernictvi-barber" },
      { title: "Vizážistka & líčení", slug: "vizazistka-liceni" },
      { title: "Nehty", slug: "nehty" },
      { title: "Pedikůra", slug: "pedikura" },
      { title: "Péče o tělo", slug: "pece-o-telo" }
    ]
  },
  {
    title: "Zdraví & wellness",
    slug: "zdravi-wellness",
    subcategories: [
      { title: "Výživa & nutriční koučink", slug: "vyziva-nutricni-koucink" },
      { title: "Jóga & Pilates", slug: "joga-pilates" },
      { title: "Osobní trenér", slug: "osobni-trener" },
      { title: "Masáže", slug: "masaze" }
    ]
  },
  {
    title: "Péče o děti",
    slug: "pece-o-deti",
    subcategories: [
      { title: "Jednorázové hlídání", slug: "jednorazove-hlidani" },
      { title: "Pravidelné hlídání", slug: "pravidelne-hlidani" },
      { title: "Odvoz na kroužky", slug: "odvoz-na-krouzky" }
    ]
  },
  {
    title: "Péče o zvířata",
    slug: "pece-o-zvirata",
    subcategories: [
      { title: "Venčení & hlídání psů", slug: "venceni-hlidani-psu" },
      { title: "Hlídání koček", slug: "hlidani-kocek" },
      { title: "Krmení a návštěvy dalších zvířat", slug: "krmeni-a-navstevy-dalsich-zvirat" },
      { title: "Péče o koně a hospodářská zvířata", slug: "pece-o-kone-a-hospodarska-zvirata" },
      { title: "Asistence u veterináře", slug: "asistence-u-veterinare" },
      { title: "Péče o vzhled", slug: "pece-o-vzhled" },
      { title: "Výcvik a socializace", slug: "vycvik-a-socializace" }
    ]
  },
  {
    title: "Auto, moto & doprava",
    slug: "auto-moto-doprava",
    subcategories: [
      { title: "Servis & montáž", slug: "servis-montaz" },
      { title: "Čištění & mytí", slug: "cisteni-myti" },
      { title: "Přeprava", slug: "preprava" }
    ]
  },
  {
    title: "Události & svatby",
    slug: "udalosti-svatby",
    subcategories: [
      { title: "Foto & video", slug: "foto-video" },
      { title: "Hudba & zábava", slug: "hudba-zabava" },
      { title: "Plánování & organizace", slug: "planovani-organizace" },
      { title: "Catering & dorty", slug: "catering-dorty" },
      { title: "Výzdoba & květiny", slug: "vyzdoba-kvetiny" },
      { title: "Místo & pronájmy", slug: "misto-pronajmy" }
    ]
  },
  {
    title: "Foto & video & audio",
    slug: "foto-video-audio",
    subcategories: [
      { title: "Foto", slug: "foto" },
      { title: "Video", slug: "video" },
      { title: "Audio", slug: "audio" }
    ]
  },
  {
    title: "IT & digitální tvorba",
    slug: "it-digitalni-tvorba",
    subcategories: [
      { title: "Grafika & vizuální identita", slug: "grafika-vizualni-identita" },
      { title: "Webdesign & vývoj", slug: "webdesign-vyvoj" },
      { title: "Marketing, obsah & sociální sítě", slug: "marketing-obsah-socialni-site" },
      { title: "AI služby", slug: "ai-sluzby" }
    ]
  },
  {
    title: "Podnikání & administrativa",
    slug: "podnikani-administrativa",
    subcategories: [
      { title: "Virtuální asistence & kancelářské služby", slug: "virtualni-asistence-kancelarske-sluzby" },
      { title: "Účetnictví & fakturace", slug: "ucetnictvi-fakturace" },
      { title: "Právní & obchodní poradenství", slug: "pravni-obchodni-poradenstvi" },
      { title: "Správa e-shopů & kancelářský servis", slug: "sprava-e-shopu-kancelarsky-servis" },
      { title: "Mentoring & školení", slug: "mentoring-skoleni" }
    ]
  },
  {
    title: "Učení & hobby & volný čas",
    slug: "uceni-hobby-volny-cas",
    subcategories: [
      { title: "Kurzy & kroužky", slug: "kurzy-krouzky" },
      { title: "Doučování & příprava", slug: "doucovani-priprava" },
      { title: "Kluby & hry & zájmy", slug: "kluby-hry-zajmy" }
    ]
  },
  {
    title: "Péče o seniory",
    slug: "pece-o-seniory",
    subcategories: [
      { title: "Domácí pomoc", slug: "domaci-pomoc" },
      { title: "Asistence a doprovod", slug: "asistence-a-doprovod" },
      { title: "Doprava", slug: "doprava" }
    ]
  }
];

/**
 * Normalizace – aby localhost i prod fungoval, i když přijde jiný tvar
 */
export const NORMALIZED_CATEGORIES: Category[] = (CATEGORIES || []).map((cat) => ({
  title: cat.title?.trim() || "",
  subtitle: cat.subtitle || null,
  slug: cat.slug?.trim() || "",
  image: cat.image || null,
  subcategories: (cat.subcategories || []).map((sc) => ({
    title: sc.title?.trim() || "",
    slug: sc.slug?.trim() || "",
    image: sc.image || null,
    attributes: sc.attributes || []
  }))
}));
