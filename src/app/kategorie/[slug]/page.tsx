// src/app/kategorie/[slug]/page.tsx
import Link from "next/link";
import catsData, { CATEGORIES } from "@/data/categories";
import SubcategoryGrid from "@/components/SubcategoryGrid";
import FeedbackPanel from "@/components/FeedbackPanel";

type PageProps = {
  params: { slug: string };
};

function norm(v: string | null | undefined) {
  return (v || "").trim().toLowerCase();
}

function toArray(raw: any): any[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.categories)) return raw.categories;
  if (Array.isArray(raw?.data)) return raw.data;
  return [];
}

export default function CategoryDetailPage({ params }: PageProps) {
  const wanted = norm(params.slug);

  // máme dvě možnosti importu (default a pojmenovaný)
  const allCats = toArray(catsData).length ? toArray(catsData) : CATEGORIES;

  const category =
    allCats.find((c: any) => norm(c.slug) === wanted) ||
    allCats.find((c: any) => norm(c.Slug) === wanted) ||
    null;

  if (!category) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-sm text-slate-500 mb-4">
          <Link href="/" className="text-pindo-blue font-semibold">
            Domů
          </Link>{" "}
          / <Link href="/kategorie">Kategorie</Link>
        </p>
        <h1 className="text-3xl font-bold mb-3">Kategorie nenalezena</h1>
        <p className="text-slate-600 mb-4">
          Zkus se vrátit na výpis kategorií a vybrat jinou oblast.
        </p>
        <Link
          href="/kategorie"
          className="inline-flex items-center gap-2 rounded-lg bg-pindo-blue text-white px-4 py-2 text-sm font-semibold"
        >
          Zpět na výpis kategorií
        </Link>

        <div className="mt-10">
          <FeedbackPanel />
        </div>
      </main>
    );
  }

  // tady vytáhneme podkategorie v různých zápisech z Kreezalidu
  const subs: any[] =
    category.subcategories ||
    category.Subcategories ||
    category.children ||
    category.Children ||
    [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* breadcrumbs */}
      <p className="text-sm text-slate-500 mb-4 flex gap-2 items-center">
        <Link href="/" className="text-pindo-blue font-semibold">
          Domů
        </Link>
        <span>/</span>
        <Link href="/kategorie" className="text-slate-500">
          Kategorie
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">
          {category.title || category.name || category.label}
        </span>
      </p>

      <h1 className="text-3xl font-bold mb-2">
        {category.title || category.name || category.label}
      </h1>
      <p className="text-slate-600 mb-6">
        Vyber si z podkategorií v této oblasti.
      </p>

      {Array.isArray(subs) && subs.length > 0 ? (
        // ⬇️ TADY JE TVŮJ TVAR
        <SubcategoryGrid subs={subs} parentSlug={params.slug} />
      ) : (
        <p className="text-slate-400 text-sm">
          V této kategorii zatím nejsou podkategorie.
        </p>
      )}

      <div className="mt-10">
        <FeedbackPanel />
      </div>
    </main>
  );
}

