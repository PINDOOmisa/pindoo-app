// src/components/CategoryGrid.tsx
"use client";

import Link from "next/link";
import CATEGORIES from "@/data/categories";

export default function CategoryGrid() {
  const data = Array.isArray(CATEGORIES) ? CATEGORIES : [];

  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {data.map((cat: any) => (
        <Link
          key={cat.slug}
          href={`/kategorie/${cat.slug}`}
          className="group bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-5 flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-md transition"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100" />
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-pindo">
            {cat.title || "Kategorie"}
          </h3>
          <p className="text-xs text-slate-500">
            {(cat.subcategories?.length || 0) > 0
              ? `${cat.subcategories.length} podkategorií`
              : "Zatím bez podkategorií"}
          </p>
        </Link>
      ))}
    </div>
  );
}
