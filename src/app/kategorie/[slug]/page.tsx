// src/app/kategorie/[slug]/page.tsx
import Link from "next/link";
import FeedbackPanel from "@/components/FeedbackPanel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ⬇️ záměrně přímo tady – aby to Vercel vzal i kdyby se mu nelíbilo /src/data/categories.ts
const CATEGORIES = [
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
      { slug: "elektrikar", title: "Elektro / elektrikář" },
      { slug: "voda-topeni", title: "Voda / topení / plyn" },
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
      { slug: "kosmetika", title: "Kosmetická péče" },
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
      { slug: "foto-video", title: "Foto / video na akci" },
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
      { slug: "doprovod", title: "Doprovod k lékaři" },
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

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const wanted = (params.slug || "").toLowerCase();
  const category =
    CATEGORIES.find((c) => (c.slug || "").toLowerCase() === wanted) || null;

  if (!category) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-sm text-slate-500 mb-4">
          <Link href="/" className="text-pindo-blue font-semibold">
            Domů
          </Link>{" "}
          / Kategorie
        </p>
        <h1 className="text-3xl font-bold mb-3">Kategorie nenalezena</h1>
        <p className="text-slate-600 mb-6">
          Zkus se vrátit na výpis kategorií a vybrat jinou oblast.
        </p>
        <FeedbackPanel />
      </main>
    );
  }

  const subs = Array.isArray(category.subcategories) ? category.subcategories : [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-sm text-slate-500 mb-5 flex gap-2 items-center">
        <Link href="/" className="text-pindo-blue font-semibold">
          Domů
        </Link>
        <span>/</span>
        <Link href="/kategorie" className="text-slate-400">
          Kategorie
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-700">{category.title}</span>
      </div>

      <header className="mb-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">{category.title}</h1>
        <p className="text-slate-600">
          Vyber si z podkategorií v této oblasti.
        </p>
      </header>

      {subs.length > 0 ? (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {subs.map((sub) => (
            <div
              key={sub.slug}
              className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 flex flex-col gap-2"
            >
              <div className="text-base font-semibold text-slate-900">
                {sub.title}
              </div>
              <div className="text-xs text-slate-500">
                Upřesni tohle v poptávce a ukážeme ti vhodné profíky.
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-sm">
          Tahle kategorie zatím nemá podkategorie.
        </p>
      )}

      <div className="mt-10">
        <FeedbackPanel />
      </div>
    </main>
  );
}
