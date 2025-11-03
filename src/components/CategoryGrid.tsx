// src/components/CategoryGrid.tsx
"use client";

import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export default function CategoryGrid() {
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/oblasti/${cat.slug}`}
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
  );
}
