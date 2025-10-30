"use client";

import Link from "next/link";
import { NORMALIZED_CATEGORIES, CATEGORIES } from "@/data/categories";

const DATA = NORMALIZED_CATEGORIES || CATEGORIES || [];

export default function CategoryGrid() {
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {DATA.map((cat) => (
        <Link
          key={cat.slug}
          href={`/kategorie/${cat.slug}`}
          className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex gap-4 p-4"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#E7EEF9] flex items-center justify-center text-[#0E3A8A] text-lg font-semibold">
            {cat.title?.slice(0, 1) ?? "?"}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#0E3A8A] transition line-clamp-1">
              {cat.title}
            </h3>
            <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">
              {Array.isArray(cat.subcategories) ? cat.subcategories.length : 0} podkategorií
            </p>
            {cat.subtitle ? (
              <p className="text-sm text-slate-500 mt-2 line-clamp-2">{cat.subtitle}</p>
            ) : null}
          </div>
          <div className="self-center text-slate-300 group-hover:text-[#0E3A8A] transition">
            →
          </div>
        </Link>
      ))}

      {/* POVINNÝ FEEDBACK PANEL */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 items-center">
        <img
          src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
          alt="PINDOO"
          className="w-14 h-14 object-contain"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-900">Chybí ti tady nějaká kategorie?</p>
          <p className="text-xs text-slate-500">Napiš mi a přidáme ji do PINDOO.</p>
        </div>
      </div>
    </div>
  );
}
