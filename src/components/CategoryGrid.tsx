"use client";

import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export default function CategoryGrid() {
  // bereme jen to, co má title a slug
  const cats = (CATEGORIES || []).filter(
    (c) => c && c.title && c.slug
  );

  return (
    <section className="home-cats">
      <div className="home-cats-head">
        <p className="home-cats-tag">KATEGORIE</p>
        <h2>Vyber si oblast, kterou chceš řešit</h2>
      </div>
      <div className="home-cats-grid">
        {cats.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kategorie/${cat.slug}`}
            className="home-cat"
          >
            <div className="home-cat-icon" aria-hidden />
            <div className="home-cat-title">{cat.title}</div>
            <div className="home-cat-sub">
              {(cat.subcategories?.length || 0) > 0
                ? `${cat.subcategories?.length} podkategorií`
                : "Zobrazit"}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
