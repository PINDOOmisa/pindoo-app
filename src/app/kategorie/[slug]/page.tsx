// src/app/kategorie/[slug]/page.tsx
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

type PageProps = {
  params: {
    slug: string;
  };
};

// tolerantní helper – někde máme title, někde subtitle
function getName(cat: any): string {
  return cat?.title || cat?.name || cat?.label || "Kategorie";
}

export default function CategoryDetailPage({ params }: PageProps) {
  const slug = params.slug;
  // najdi kategorii podle slugu
  const category =
    CATEGORIES.find(
      (c) =>
        c.slug === slug ||
        c.Slug === slug ||
        (typeof c.slug === "string" &&
          c.slug.toLowerCase() === slug.toLowerCase())
    ) || null;

  if (!category) {
    return (
      <div className="min-h-[50vh] max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-3">Kategorie nenalezena</h1>
        <p className="mb-6">Zkus se vrátit na výpis kategorií.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E3A8A] text-white text-sm font-medium"
        >
          ← Zpět na hlavní stránku
        </Link>
      </div>
    );
  }

  const subcats = Array.isArray(category.subcategories)
    ? category.subcategories
    : [];

  return (
    <div className="min-h-[60vh] bg-[#F7F7F9] pb-16">
      {/* horní pás */}
      <div className="bg-white border-b border-[#E6EAF2] mb-8">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <p className="text-sm text-slate-500 mb-2">
            <Link href="/" className="text-[#0E3A8A] hover:underline">
              Domů
            </Link>{" "}
            / {getName(category)}
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            {getName(category)}
          </h1>
          <p className="text-slate-500 mt-2">
            Vyber si z podkategorií v této oblasti.
          </p>
        </div>
      </div>

      {/* mřížka podkategorií */}
      <div className="max-w-5xl mx-auto px-4">
        {subcats.length === 0 ? (
          <p className="text-slate-500">
            Tato kategorie zatím nemá podkategorie.
          </p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {subcats.map((sub: any, idx: number) => {
              const subSlug =
                sub.slug ||
                sub.Slug ||
                (typeof sub.title === "string"
                  ? sub.title.toLowerCase().replace(/\s+/g, "-")
                  : `sub-${idx}`);
              return (
                <div
                  key={subSlug}
                  className="bg-white border border-[#E6EAF2] rounded-xl overflow-hidden shadow-sm flex flex-col"
                >
                  {/* obrázek / placeholder */}
                  <div className="h-36 bg-gradient-to-b from-[#E7EEF9] to-white flex items-center justify-center">
                    <span className="text-[#0E3A8A] font-semibold text-sm">
                      Obrázek podkategorie
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col gap-3">
                    <h2 className="text-[#0E3A8A] font-semibold text-base leading-snug">
                      {sub.title || sub.name || "Podkategorie"}
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Sem pak dáme popis / atributy.
                    </p>
                    <div className="mt-auto">
                      <Link
                        href={`/vytvoreni-poptavky?category=${slug}&sub=${subSlug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#0E3A8A]"
                      >
                        Vyplnit poptávku →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* tvoje povinná patička s feedback panelem */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="bg-white border border-[#E6EAF2] rounded-2xl p-5 flex gap-4 items-center">
          <img
            src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
            alt="PINDOO feedback"
            className="w-16 h-16 rounded-xl object-cover bg-[#F7F7F9]"
          />
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900">
              Chybí ti tu něco?
            </h3>
            <p className="text-sm text-slate-500">
              Napiš nám, podkategorii přidáme do PINDOO.
            </p>
          </div>
          <Link
            href="/napoveda"
            className="px-4 py-2 rounded-lg bg-[#0E3A8A] text-white text-sm font-medium"
          >
            Napsat
          </Link>
        </div>
      </div>
    </div>
  );
}
