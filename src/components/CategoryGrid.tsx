// src/components/CategoryGrid.tsx
"use client";

import Link from "next/link";
import { NORMALIZED_CATEGORIES } from "@/data/categories";

export default function CategoryGrid() {
  const categories = NORMALIZED_CATEGORIES;

  return (
    <div className="w-full">
      {/* GRID */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kategorie/${cat.slug}`}
            className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col gap-3 p-4 min-h-[140px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#E7EEF9] flex items-center justify-center text-[#0E3A8A] text-lg font-bold">
                {cat.title.slice(0, 1)}
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900 group-hover:text-[#0E3A8A] transition">
                  {cat.title}
                </h2>
                {cat.subcategories?.length ? (
                  <p className="text-xs text-slate-500">
                    {cat.subcategories.length} podkategorií
                  </p>
                ) : null}
              </div>
            </div>
            {cat.subtitle ? (
              <p className="text-sm text-slate-500 line-clamp-2">{cat.subtitle}</p>
            ) : cat.description ? (
              <p className="text-sm text-slate-500 line-clamp-2">{cat.description}</p>
            ) : (
              <p className="text-sm text-slate-400">Klikni pro detaily…</p>
            )}
          </Link>
        ))}
      </div>

      {/* FEEDBACK PANEL */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-5 flex flex-col md:flex-row gap-5 items-center">
        <img
          src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
          alt="Pindo feedback"
          className="w-20 h-20 object-contain"
        />
        <div className="flex-1">
          <p className="text-slate-800 font-medium">Chybí ti tu nějaká kategorie nebo služba?</p>
          <p className="text-slate-500 text-sm">Napiš mi a přidáme ji do PINDOO.</p>
        </div>
      </div>
    </div>
  );
}
