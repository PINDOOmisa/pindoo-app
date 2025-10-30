"use client";

import Link from "next/link";
import Image from "next/image";
import * as CatMod from "@/data/categories";

/* ===== 1) vytažení syrových dat ===== */
type RawCat = any;
type Cat = {
  title: string;
  slug: string;
  iconUrl?: string | null;
};

function extractRaw(mod: any): RawCat[] {
  // zkusíme najít pole kategorií v několika možných větvích
  const candidates: any[] = [];
  if (Array.isArray(mod)) candidates.push(mod);
  if (Array.isArray(mod?.default)) candidates.push(mod.default);
  if (Array.isArray(mod?.categories)) candidates.push(mod.categories);
  if (Array.isArray(mod?.default?.categories)) candidates.push(mod.default.categories);
  if (Array.isArray(mod?.data)) candidates.push(mod.data);
  if (Array.isArray(mod?.default?.data)) candidates.push(mod.default.data);

  // pokud nic z toho, zkusíme projít hodnoty objektu
  const fromValues =
    Object.values(mod || {}).find((v: any) => Array.isArray(v)) ||
    Object.values(mod?.default || {}).find((v: any) => Array.isArray(v));

  if (fromValues) candidates.push(fromValues);

  const found = candidates.find((v) => Array.isArray(v));
  return (found as RawCat[]) || [];
}

/* ===== 2) normalizace ===== */
function toTitle(x: RawCat): string {
  return (
    x?.title ??
    x?.name ??
    x?.label ??
    x?.Title ??
    x?.CategoryName ??
    ""
  )
    .toString()
    .trim();
}

function toSlug(x: RawCat, title: string): string {
  const base =
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

  return base.toString().trim();
}

function toIcon(x: RawCat): string | null {
  return (
    x?.iconUrl ??
    x?.icon ??
    x?.image ??
    x?.img ??
    x?.thumbnailUrl ??
    null
  );
}

function normalize(raw: RawCat): Cat | null {
  const title = toTitle(raw);
  if (!title) return null;
  return {
    title,
    slug: toSlug(raw, title),
    iconUrl: toIcon(raw),
  };
}

function dedupe(cats: Cat[]): Cat[] {
  const seen = new Set<string>();
  const out: Cat[] = [];
  for (const c of cats) {
    const key = (c.slug || c.title).toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(c);
    }
  }
  return out;
}

/* ===== 3) komponenta ===== */
export default function CategoryGrid() {
  const raw = extractRaw(CatMod);
  const norm = raw.map(normalize).filter(Boolean) as Cat[];
  const categories = dedupe(norm);

  return (
    <section className="pindo-cats">
      <div className="pindo-cats__head">
        <h2>Kategorie</h2>
        <p>Vyber si oblast a pojďme najít ověřené poskytovatele.</p>
      </div>

      <div className="pindo-cats__grid">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kategorie/${cat.slug}`}
            className="pindo-cats__tile"
            aria-label={cat.title}
          >
            <div className="pindo-cats__iconwrap">
              {cat.iconUrl ? (
                <div className="pindo-cats__imgbox">
                  {/* POZOR: žádné onError, Next to při buildu nemá rád */}
                  <Image
                    src={cat.iconUrl}
                    alt={cat.title}
                    fill
                    sizes="56px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ) : (
                <span className="pindo-cats__placeholder" aria-hidden />
              )}
            </div>
            <div className="pindo-cats__title">{cat.title}</div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .pindo-cats {
          width: 100%;
          background: #f7f7f9;
          border-radius: 28px;
          border: 1px solid rgba(226, 232, 240, 0.7);
          padding: 20px 16px 28px;
          margin: 0 auto;
          max-width: 1140px;
        }
        .pindo-cats__head {
          margin-bottom: 16px;
        }
        .pindo-cats__head h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
        }
        .pindo-cats__head p {
          margin: 4px 0 0;
          color: #6b7280;
        }
        .pindo-cats__grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        @media (min-width: 640px) {
          .pindo-cats__grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 768px) {
          .pindo-cats__grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .pindo-cats__grid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }
        }

        .pindo-cats__tile {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 18px 14px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #0e3a8a;
          transition: 0.15s ease;
          box-shadow: 0 1px 0 rgba(2, 8, 23, 0.04);
          min-height: 135px;
        }
        .pindo-cats__tile:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(14, 58, 138, 0.06), 0 2px 6px rgba(14, 58, 138, 0.05);
          border-color: #dfe5f0;
        }
        .pindo-cats__iconwrap {
          width: 56px;
          height: 56px;
          border-radius: 999px;
          border: 2px solid #0e3a8a;
          display: grid;
          place-items: center;
          background: #fff;
        }
        .pindo-cats__imgbox {
          position: relative;
          width: 40px;
          height: 40px;
        }
        .pindo-cats__placeholder {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          border: 2px solid #0e3a8a;
          opacity: 0.4;
        }
        .pindo-cats__title {
          text-align: center;
          font-weight: 600;
          line-height: 1.2;
        }
      `}</style>
    </section>
  );
}
