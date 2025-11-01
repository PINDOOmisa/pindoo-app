// src/app/kategorie/page.tsx
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import FeedbackPanel from "@/components/FeedbackPanel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function CategoriesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* 💛 TEST LUMÍR: když tohle vidíš, máš správný soubor */}
      <p className="text-[11px] text-slate-400 mb-2">
        (PINDOO / kategorie – verze s dlaždicemi)
      </p>

      <nav className="text-sm text-slate-500 mb-6 flex gap-2 items-center">
        <Link href="/" className="text-pindo-blue font-semibold">
          Domů
        </Link>
        <span>/</span>
        <span className="text-slate-400">Kategorie</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">Kategorie</h1>
      <p className="text-slate-600 mb-8">
        Vyber si oblast, kterou potřebuješ. Podle toho ti pak najdeme poskytovatele.
      </p>

      {/* GRID DLAŽDIC */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kategorie/${cat.slug}`}
            className="rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition p-5 flex flex-col gap-2"
          >
            <div className="text-base font-semibold text-slate-900">
              {cat.title}
            </div>
            <div className="text-xs text-slate-500">
              {Array.isArray(cat.subcategories)
                ? `${cat.subcategories.length} podkategorií`
                : "Podkategorie se připravují"}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <FeedbackPanel />
      </div>
    </main>
  );
}
