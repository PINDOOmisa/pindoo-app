// src/components/CategoryGrid.tsx
"use client";

import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import FeedbackPanel from "./FeedbackPanel";

const DATA = CATEGORIES || [];

export default function CategoryGrid() {
  const items = (DATA || []).filter((c) => c && c.slug);

  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((cat) => (
        <Link
          key={cat.slug}
          href={`/kategorie/${cat.slug}`}
          className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col gap-3 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E7EEF9] flex items-center justify-center text-[#0E3A8A] font-bold text-sm">
              {cat.title?.slice(0, 1) ?? "K"}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#0E3A8A] transition truncate">
                {cat.title}
              </h3>
              <p className="text-xs text-slate-400">
                {(cat.subcategories?.length || 0) > 0
                  ? `${cat.subcategories?.length} podkategorií`
                  : "1 kategorie"}
              </p>
            </div>
            <div className="text-slate-300 group-hover:text-[#0E3A8A] transition">
              →
            </div>
          </div>

          {cat.subtitle ? (
            <p className="text-xs text-slate-500 line-clamp-2">{cat.subtitle}</p>
          ) : null}
        </Link>
      ))}

      {/* poslední kartička */}
      <FeedbackPanel />
    </div>
  );
}
