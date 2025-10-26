import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-6">Kategorie služeb</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/kategorie/${c.slug}`}
            className="block rounded-2xl border p-5 hover:shadow transition"
          >
            <div className="h-10 w-10 rounded-lg bg-gray-100 mb-3" />
            <div className="text-lg font-semibold">{c.title}</div>
            {c.subtitle && (
              <div className="text-sm text-gray-500 mt-1">{c.subtitle}</div>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
