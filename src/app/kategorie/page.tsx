// src/app/kategorie/page.tsx
import Link from "next/link";
import { NORMALIZED_CATEGORIES } from "@/data/categories";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function CategoriesPage() {
  const cats = NORMALIZED_CATEGORIES || [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Všechny kategorie</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cats.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kategorie/${cat.slug}`}
            className="border border-slate-100 rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold mb-1 text-slate-900">{cat.title}</h2>
            <p className="text-xs text-slate-400 mb-2">
              {(cat.subcategories || []).length} podkategorií
            </p>
            <p className="text-sm text-slate-500">
              {cat.subtitle || "Služby v této oblasti."}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
