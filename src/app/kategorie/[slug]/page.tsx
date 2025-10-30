// src/app/kategorie/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = params;

  // 1) NAČTEME DATA AŽ UVNITŘ FUNKCE → Vercel to líp zkousne
  let categories: any[] = [];
  try {
    const mod = await import("../../../data/categories");
    // máme tam exporty CATEGORIES i NORMALIZED_CATEGORIES, vezmeme ten náš
    categories = mod.NORMALIZED_CATEGORIES || mod.CATEGORIES || [];
  } catch (err) {
    // když se data nenačtou, ukážeme fallback
    return (
      <div className="min-h-screen bg-[#F7F7F9] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-10 max-w-lg w-full text-center">
          <h1 className="text-2xl font-semibold text-slate-900 mb-3">
            Kategorie se nepodařilo načíst
          </h1>
          <p className="text-slate-500 mb-6">
            Zkus to prosím znovu, nebo přejdi na seznam kategorií.
          </p>
          <Link
            href="/kategorie"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#0E3A8A] text-white hover:bg-[#0c2f6d] transition"
          >
            Zpět na kategorie
          </Link>
        </div>
      </div>
    );
  }

  const category =
    categories.find((c) => c.slug === slug) ||
    categories.find((c) => c.slug?.toLowerCase() === slug.toLowerCase());

  if (!category) {
    return (
      <div className="min-h-screen bg-[#F7F7F9] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-10 max-w-lg w-full text-center">
          <h1 className="text-2xl font-semibold text-slate-900 mb-3">
            Kategorie nebyla nalezena
          </h1>
          <p className="text-slate-500 mb-6">
            Možná jsme ji přejmenovali, nebo je ještě prázdná.
          </p>
          <Link
            href="/kategorie"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#0E3A8A] text-white hover:bg-[#0c2f6d] transition"
          >
            Zpět na kategorie
          </Link>
        </div>
      </div>
    );
  }

  const subs = Array.isArray(category.subcategories) ? category.subcategories : [];

  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      {/* HLAVIČKA */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-slate-400 tracking-wide mb-1">Kategorie</p>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">{category.title}</h1>
          {category.subtitle ? (
            <p className="text-slate-500 max-w-2xl">{category.subtitle}</p>
          ) : category.description ? (
            <p className="text-slate-500 max-w-2xl">{category.description}</p>
          ) : null}
        </div>
        <Link
          href="/kategorie"
          className="hidden sm:inline-flex text-sm text-[#0E3A8A] hover:underline"
        >
          ← Zpět na všechny kategorie
        </Link>
      </div>

      {/* PODKATEGORIE */}
      <div className="max-w-6xl mx-auto px-4 pb-14">
        {subs.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {subs.map((sub: any) => (
              <div
                key={sub.slug}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E7EEF9] flex items-center justify-center text-[#0E3A8A] text-sm font-semibold">
                    {sub.title?.slice(0, 1)}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">{sub.title}</h2>
                  </div>
                </div>
                <button className="mt-auto inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-[#0E3A8A] text-white text-xs hover:bg-[#0c2f6d] transition">
                  Vybrat
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-slate-500">
            Tato kategorie zatím nemá podkategorie.
          </div>
        )}
      </div>

      {/* FEEDBACK PANEL */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col md:flex-row gap-5 items-center">
          <img
            src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
            alt="Pindo feedback"
            className="w-20 h-20 object-contain"
          />
          <div className="flex-1">
            <p className="text-slate-800 font-medium">Chceš, aby to vypadalo jako v Kreezalidu?</p>
            <p className="text-slate-500 text-sm">Napiš mi, doplníme ikonky i popisky.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
