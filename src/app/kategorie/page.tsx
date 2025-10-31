// src/app/kategorie/[slug]/page.tsx
import Link from "next/link";
import CATEGORIES from "@/data/categories";

type PageProps = {
  params: { slug: string };
};

// helper – vezme první nenulovou hodnotu z variant
function pick(obj: any, keys: string[], fallback: string = ""): string {
  for (const k of keys) {
    if (obj && typeof obj[k] === "string" && obj[k].trim() !== "") {
      return obj[k].trim();
    }
  }
    return fallback;
}

// najdu kategorii podle slug
function findCategoryBySlug(all: any[], slug: string) {
  // zkusíme přes slug
  const bySlug = all.find((c: any) => {
    const s =
      c.slug ||
      c.Slug ||
      c.SLUG ||
      (typeof c.name === "string" ? c.name.toLowerCase().replace(/\s+/g, "-") : "");
    return s === slug;
  });
  if (bySlug) return bySlug;

  // fallback – některé exporty nemají slug, ale mají title
  const byTitle = all.find((c: any) => {
    const title =
      c.title ||
      c.Title ||
      c.name ||
      c.label;
    if (!title || typeof title !== "string") return false;
    const norm = title.toLowerCase().replace(/\s+/g, "-");
    return norm === slug;
  });

  return byTitle || null;
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  // CATEGORIES může být různě zanořený, tak ho rozbalíme
  const raw = Array.isArray(CATEGORIES)
    ? CATEGORIES
    : Array.isArray((CATEGORIES as any).default)
    ? (CATEGORIES as any).default
    : Array.isArray((CATEGORIES as any).categories)
    ? (CATEGORIES as any).categories
    : Array.isArray((CATEGORIES as any).data)
    ? (CATEGORIES as any).data
    : [];

  const category = findCategoryBySlug(raw, slug);

  // když nic – ukážeme ptáčka
  if (!category) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Kategorie nenalezena</h1>
        <p className="mb-4">Zkus se vrátit na výpis kategorií a vybrat jinou oblast.</p>
        <Link href="/kategorie" className="text-blue-700 underline">
          Zpět na hlavní stránku
        </Link>
        <div className="mt-10 flex items-center gap-6">
          <img
            src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
            alt="PINDOO"
            style={{ width: 140, height: "auto" }}
          />
          <div>
            <p className="font-semibold">Chybí ti tu nějaká kategorie nebo podkategorie?</p>
            <p className="text-slate-500 text-sm">
              Dej mi vědět a doplním ji do PINDOO. Tvoříme to pro tebe. 💛
            </p>
          </div>
        </div>
      </div>
    );
  }

  // vytáhneme podkategorie – v tvých souborech se to jmenovalo různě
  const subs: any[] =
    category.subcategories ||
    category.subcategory ||
    category.children ||
    category.items ||
    [];

  const catTitle = pick(category, ["title", "Title", "name", "label"], "Kategorie");

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* breadcrumb */}
      <p className="text-sm text-slate-500 mb-4">
        <Link href="/">Domů</Link> /{" "}
        <Link href="/kategorie" className="hover:underline">
          Kategorie
        </Link>{" "}
        / <span className="text-slate-900">{catTitle}</span>
      </p>

      <h1 className="text-3xl font-bold mb-2">{catTitle}</h1>
      <p className="text-slate-600 mb-6">Vyber si z podkategorií v této oblasti.</p>

      {/* pokud nejsou podkategorie */}
      {(!subs || subs.length === 0) && (
        <p className="text-slate-400 italic">Tahle kategorie zatím nemá podkategorie.</p>
      )}

      {/* GRID PODKATEGORIÍ – stejně jako jsi chtěla */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {subs.map((s: any, i: number) => {
          const subTitle = pick(s, ["title", "Title", "name", "label"], `Podkategorie ${i + 1}`);
          // cílovou URL zatím nemáme – tak to necháme jako # nebo budoucí /kategorie/[slug]/[subslug]
          return (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col"
            >
              <div className="bg-[#0E3A8A] text-white text-center py-3 font-semibold">
                {subTitle}
              </div>
              <div className="h-36 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                Obrázek podkategorie
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-slate-500 text-sm mb-0">Vyplnit poptávku →</p>
                <button className="text-sm font-semibold text-[#0E3A8A]">Otevřít →</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* závěrečný feedback panel – jak chceš mít vždy */}
      <div className="mt-10 flex items-center gap-6 bg-white rounded-2xl border border-slate-200 p-5">
        <img
          src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
          alt="PINDOO ptáček"
          className="w-24 h-auto"
        />
        <div>
          <p className="font-semibold mb-1">Chceš jinak zobrazit podkategorie?</p>
          <p className="text-sm text-slate-500">
            Dej mi vědět a upravím to – karty, obrázky, ikonky, cokoliv budeš chtít.
          </p>
        </div>
      </div>
    </div>
  );
}
