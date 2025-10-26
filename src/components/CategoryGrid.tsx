"use client";

import Link from "next/link";
import Image from "next/image";
import * as CatMod from "@/data/categories";

type Raw = any;
type Cat = { title: string; slug: string; iconUrl?: string | null };

/* ——— bezpečná extrakce z libovolného exportu ——— */
function extractRaw(mod: any): Raw[] {
  const pick =
    (Array.isArray(mod) && mod) ||
    (Array.isArray(mod?.default) && mod.default) ||
    (Array.isArray(mod?.categories) && mod.categories) ||
    (Array.isArray(mod?.default?.categories) && mod.default.categories) ||
    (Array.isArray(mod?.data) && mod.data) ||
    (Array.isArray(mod?.default?.data) && mod.default.data) ||
    Object.values(mod || {}).find((v: any) => Array.isArray(v)) ||
    Object.values(mod?.default || {}).find((v: any) => Array.isArray(v)) ||
    [];
  return (pick as Raw[]) || [];
}

/* ——— normalizace ——— */
const normTitle = (x: Raw) =>
  (x?.title ?? x?.name ?? x?.label ?? x?.CategoryName ?? x?.Title ?? "")
    .toString()
    .trim();

function normSlug(x: Raw, title: string) {
  const s =
    x?.slug ??
    x?.Slug ??
    x?.id ??
    x?.Id ??
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  return s.toString().trim();
}

const normIcon = (x: Raw) => (x?.iconUrl ?? x?.icon ?? x?.image ?? null) || null;

function normalize(raw: Raw): Cat | null {
  const title = normTitle(raw);
  if (!title) return null;
  return { title, slug: normSlug(raw, title), iconUrl: normIcon(raw) };
}

function dedupeKeepOrder(items: Cat[]) {
  const seen = new Set<string>();
  const out: Cat[] = [];
  for (const it of items) {
    const key = (it.slug || it.title).toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(it);
    }
  }
  return out;
}

/* ——— komponenta ——— */
export default function CategoryGrid() {
  const categories = dedupeKeepOrder(
    extractRaw(CatMod).map(normalize).filter(Boolean) as Cat[]
  );

  return (
    <section className="root">
      <div className="head">
        <h2 className="h2">Kategorie</h2>
        <p className="sub">Vyber si oblast a pojďme najít ověřené poskytovatele.</p>
      </div>

      <div className="grid">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/kategorie/${cat.slug}`} className="tile" aria-label={cat.title}>
            <div className="iconBox">
              {cat.iconUrl ? (
                <Image
                  src={cat.iconUrl}
                  alt=""
                  fill
                  sizes="40px"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <span className="iconPlaceholder" aria-hidden />
              )}
            </div>
            <div className="title">{cat.title}</div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        :root {
          --blue: #0e3a8a;
          --ink: #0f172a;
          --border: #e6eaf2;
          --tile-bg: #ffffff;
          --tile-bg-hover: #ffffff;
          --tile-shadow: 0 1px 0 rgba(2, 8, 23, 0.04);
          --tile-shadow-hover: 0 10px 24px rgba(14, 58, 138, 0.06),
            0 2px 6px rgba(14, 58, 138, 0.05);
          --radius: 16px;
        }

        .root {
          width: 100%;
        }
        .head {
          margin-bottom: 18px;
        }
        .h2 {
          margin: 0 0 4px;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--ink);
        }
        .sub {
          margin: 0;
          color: #6b7280;
        }

        /* mřížka dlaždic */
        .grid {
          display: grid;
          gap: 18px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (min-width: 1280px) {
          .grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        /* dlaždice ve stylu Kreezalidu: bílá karta, modrá linka/ikona, pouze název */
        .tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          padding: 18px;
          background: var(--tile-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--tile-shadow);
          color: var(--blue);
          text-decoration: none;
          transition: transform 0.16s ease, box-shadow 0.16s ease,
            border-color 0.16s ease, background 0.16s ease;
        }
        .tile:hover {
          transform: translateY(-2px);
          background: var(--tile-bg-hover);
          box-shadow: var(--tile-shadow-hover);
          border-color: #dfe5f0;
        }
        .tile:focus-visible {
          outline: 3px solid rgba(14, 58, 138, 0.25);
          outline-offset: 2px;
        }

        /* ikonka (nebo placeholder) */
        .iconBox {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--blue);
          display: grid;
          place-items: center;
          overflow: hidden;
          background: transparent;
        }
        .iconPlaceholder {
          width: 16px;
          height: 16px;
          border: 2px solid var(--blue);
          border-radius: 50%;
          opacity: 0.3;
        }

        /* název */
        .title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--blue);
          line-height: 1.2;
        }
      `}</style>
    </section>
  );
}
