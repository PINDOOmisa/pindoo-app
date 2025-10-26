"use client";

import Link from "next/link";
import Image from "next/image";

type Raw = any;
export type Subcat = { title: string; slug: string; iconUrl?: string | null };

function normTitle(x: Raw) {
  return (
    x?.title ?? x?.name ?? x?.label ?? x?.CategoryName ?? x?.Title ?? ""
  )
    .toString()
    .trim();
}
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

function normalize(raw: Raw): Subcat | null {
  const title = normTitle(raw);
  if (!title) return null;
  return { title, slug: normSlug(raw, title), iconUrl: normIcon(raw) };
}
function dedupe(items: Subcat[]) {
  const seen = new Set<string>();
  const out: Subcat[] = [];
  for (const it of items) {
    const key = (it.slug || it.title).toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(it);
    }
  }
  return out;
}

export default function SubcategoryGrid({
  categorySlug,
  items,
}: {
  categorySlug: string;
  items: Raw[] | undefined | null;
}) {
  const subs = dedupe(
    (Array.isArray(items) ? items : [])
      .map(normalize)
      .filter(Boolean) as Subcat[]
  );

  if (subs.length === 0) {
    return (
      <div className="empty">
        Zatím tu nemáme podkategorie.
        <style jsx>{`
          .empty {
            padding: 16px;
            border: 1px dashed #e5e7eb;
            border-radius: 14px;
            color: #6b7280;
            background: #fff;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="wrap">
      <div className="grid">
        {subs.map((s) => (
          <Link
            key={s.slug}
            href={`/kategorie/${categorySlug}/${s.slug}`}
            className="tile"
            aria-label={s.title}
          >
            <div className="iconBox">
              {s.iconUrl ? (
                <Image
                  src={s.iconUrl}
                  alt=""
                  fill
                  sizes="40px"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <span className="iconDot" aria-hidden />
              )}
            </div>
            <div className="title">{s.title}</div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        :root {
          --blue: #0e3a8a;
          --border: #e6eaf2;
          --tile-bg: #ffffff;
          --tile-shadow: 0 1px 0 rgba(2, 8, 23, 0.04);
          --tile-shadow-hover: 0 10px 24px rgba(14, 58, 138, 0.06),
            0 2px 6px rgba(14, 58, 138, 0.05);
          --radius: 14px;
        }
        .wrap {
          background: #f6f7fb;
          border: 1px solid rgba(226, 232, 240, 0.7);
          border-radius: 22px;
          padding: 18px 0;
        }
        .grid {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 16px;
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(2, 1fr);
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
        .tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 110px;
          padding: 16px;
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
          box-shadow: var(--tile-shadow-hover);
          border-color: #dfe5f0;
        }
        .iconBox {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--blue);
          display: grid;
          place-items: center;
          overflow: hidden;
          background: #fff;
        }
        .iconDot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--blue);
          opacity: 0.3;
        }
        .title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--blue);
          line-height: 1.2;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
