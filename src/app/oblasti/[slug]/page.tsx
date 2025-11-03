// src/app/oblasti/[slug]/page.tsx
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import SubcategoryGrid from "@/components/SubcategoryGrid";
import FeedbackPanel from "@/components/FeedbackPanel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function OblastDetailPage({ params }: { params: { slug: string } }) {
  const wanted = (params.slug || "").toLowerCase();
  const category =
    CATEGORIES.find((c) => (c.slug || "").toLowerCase() === wanted) || null;

  if (!category) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-sm text-slate-500 mb-4 flex gap-2 items-center">
          <Link href="/" className="text-pindo-blue font-semibold">
            Domů
          </Link>
          <span>/</span>
          <Link href="/oblasti" className="text-slate-400">
            Oblasti
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Nenalezena</span>
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
      <nav className="text-sm text-slate-500 mb-4 flex gap-2 items-center">
        <Link href="/" className="text-pindo-blue font-semibold">
          Domů
        </Link>
        <span>/</span>
        <Link href="/oblasti" className="text-slate-400">
          Oblasti
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">
          {category.title}
        </span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">{category.title}</h1>
      <p className="text-slate-600 mb-6">
        Vyber si z podkategorií v této oblasti.
      </p>

      {subs.length > 0 ? (
        <SubcategoryGrid subs={subs} />
      ) : (
        <p className="text-slate-400 text-sm">
          Tahle kategorie zatím nemá podkategorie.
        </p>
      )}

      <FeedbackPanel />
    </main>
  );
}
