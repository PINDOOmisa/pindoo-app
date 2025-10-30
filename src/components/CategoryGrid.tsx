// src/components/CategoryGrid.tsx
"use client";

import Link from "next/link";
import { NORMALIZED_CATEGORIES } from "@/data/categories";

export default function CategoryGrid() {
  const data = NORMALIZED_CATEGORIES || [];

  return (
    <section className="bg-[#F9FAFB] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
          Kategorie
        </p>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Vyber si oblast, kterou chceš řešit
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategorie/${cat.slug}`}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-3 items-center text-center py-5 px-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E7EEF9] border border-[#D7E2F5] flex items-center justify-center text-sm font-semibold text-slate-700">
                {cat.title?.charAt(0) ?? "?"}
              </div>
              <div>
                <h3 className="text-slate-900 font-semibold leading-tight">
                  {cat.title}
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  {(cat.subcategories || []).length} podkategorií
                </p>
              </div>
              <div className="mt-auto text-[#0E3A8A] text-xs font-medium group-hover:underline">
                Otevřít →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
