// src/app/kategorie/[slug]/page.tsx
import { CATEGORIES, findCategoryBySlug } from "@/data/categories";
import Link from "next/link";

type PageProps = {
  params: {
    slug: string;
  };
};

export const dynamic = "force-dynamic";

export default function CategoryDetailPage({ params }: PageProps) {
  const cat =
    findCategoryBySlug(params.slug) ||
    CATEGORIES.find((c) => c.slug === params.slug);

  if (!cat) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-2xl font-semibold mb-3">Kategorie nenalezena</h1>
        <p className="text-slate-500">
          Zkus se vrátit zpět na přehled kategorií.
        </p>
        <Link
          href="/kategorie"
          className="inline-block mt-4 text-[#0E3A8A] font-medium"
        >
          ← Zpět na kategorie
        </Link>
      </div>
    );
  }

  const subs = cat.subcategories || [];

  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            Kategorie
          </p>
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">
            {cat.title}
          </h1>
          {cat.subtitle ? (
            <p className="text-slate-500">{cat.subtitle}</p>
          ) : null}
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subs.map((sub) => (
            <div
              key={sub.slug}
              className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col"
            >
              <div className="bg-[#0E3A8A] text-white text-sm font-semibold px-4 py-3 rounded-t-xl">
                {sub.title}
              </div>
              <div className="p-4 text-sm text-slate-500">
                Podkategorie služby v rámci {cat.title}.
              </div>
            </div>
          ))}

          <div className="bg-white rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 p-5 text-center">
            <p className="text-sm font-semibold text-slate-900">
              Chybí ti podkategorie?
            </p>
            <p className="text-xs text-slate-500">
              Napiš mi a přidáme ji.
            </p>
            <img
              src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
              alt="PINDOO"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        <Link
          href="/kategorie"
          className="inline-block text-sm text-[#0E3A8A] font-medium"
        >
          ← Zpět na kategorie
        </Link>
      </div>
    </div>
  );
}
