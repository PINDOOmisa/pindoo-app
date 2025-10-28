// src/app/kategorie/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";

/** ---- Typy + helpery ---- */
type MaybeString = string | null | undefined;
type RawCategory = {
  slug?: MaybeString; Slug?: MaybeString;
  title?: MaybeString; name?: MaybeString; label?: MaybeString; Title?: MaybeString;
  image?: MaybeString; img?: MaybeString; icon?: MaybeString; coverImage?: MaybeString; thumbnailUrl?: MaybeString;
};

function pick<T = any>(obj: Record<string, any>, keys: string[], fallback: T): T {
  for (const k of keys) if (obj && obj[k] != null) return obj[k] as T;
  return fallback;
}
function slugify(input: string): string {
  return (input || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}
function catTitle(c: RawCategory): string {
  return String(pick<string>(c as any, ["title","name","label","Title"], "") || "").trim();
}
function catSlug(c: RawCategory): string {
  const explicit = String(pick<string>(c as any, ["slug","Slug"], "") || "").trim();
  return explicit || slugify(catTitle(c));
}
function catImageFromData(c: RawCategory): string | null {
  return pick<string | null>(c as any, ["image","img","icon","coverImage","thumbnailUrl"], null) || null;
}

/** Ikona kategorie — vždy vyrenderuje <img> do vyhrazeného boxu  */
function CategoryIcon({ slug, alt, dataUrl }: { slug: string; alt: string; dataUrl?: string | null }) {
  // 1) pokud přišla absolutní/externí URL z dat, zkusíme ji rovnou
  const initial = dataUrl || `/img/categories/${slug}.jpg`;

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <div className="icon-wrap" aria-hidden="true">
      <img
        src={initial}
        alt={alt}
        loading="lazy"
        className="icon-img"
        onError={(e) => {
          const t = e.currentTarget as HTMLImageElement;
          const tried = (t.dataset.tried || "").split(",").filter(Boolean);
          const order = dataUrl ? [] : ["png", "webp", "jpeg"]; // když je externí URL, neskáčeme na lokální fallbacky
          const next = order.find((ext) => !tried.includes(ext));

          if (next) {
            t.dataset.tried = [...tried, next].join(",");
            t.src = `/img/categories/${slug}.${next}`;
            return;
          }

          // poslední, vždy dostupný zobrazitelný placeholder (bez souboru v repu)
          t.src =
            'data:image/svg+xml;utf8,' +
            encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120">
                <rect width="200" height="120" rx="12" fill="#F1F5F9"/>
                <g fill="#94A3B8">
                  <circle cx="60" cy="60" r="20"/>
                  <rect x="95" y="40" width="60" height="40" rx="6"/>
                </g>
              </svg>`
            );
        }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Kategorie | PINDOO",
  description: "Vyber si oblast služeb a proklikni se do subkategorií.",
};

export default function Page() {
  const list = (CATEGORIES as RawCategory[]) || [];

  return (
    <main style={{ maxWidth: 1140, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: "1.875rem", fontWeight: 800, marginBottom: 16, color: "#0f172a" }}>
        Kategorie
      </h1>

      <style>{`
        .cats { display:grid; gap:16px; grid-template-columns:repeat(2,minmax(0,1fr)); }
        @media (min-width:640px){ .cats{ grid-template-columns:repeat(3,minmax(0,1fr)); } }
        @media (min-width:1024px){ .cats{ grid-template-columns:repeat(4,minmax(0,1fr)); } }

        .tile{
          display:flex; flex-direction:column; justify-content:flex-start; align-items:stretch;
          gap:10px; padding:16px; background:#fff; border:1px solid #e6eaf2; border-radius:16px;
          text-decoration:none; box-shadow:0 0 0 0 rgba(0,0,0,0);
          transition: box-shadow .15s ease, transform .15s ease, border-color .15s ease;
        }
        .tile:hover{ transform: translateY(-2px); box-shadow:0 8px 20px rgba(14,58,138,0.08); border-color:#dbe2ee; }

        /* VYHRAZENÝ PROSTOR PRO IKONU — vždy má výšku, takže se mřížka nerozsype */
        .icon-wrap{
          width:100%;
          height:120px;
          background:#f8fafc;
          border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          overflow:hidden;
        }
        .icon-img{
          max-width:90%;
          max-height:90%;
          object-fit:contain;
          display:block;
        }

        .ttl{ font-weight:700; color:#0f172a; line-height:1.25; }
        .sub{ color:#64748b; font-size:12px; line-height:1.2; } /* volitelný podtitulek */
      `}</style>

      <div className="cats">
        {list.map((c, i) => {
          const slug = catSlug(c);
          const ttl = catTitle(c) || "Kategorie";
          const imgFromData = catImageFromData(c); // pokud někde bude externí URL/icon

          if (!slug) return null;

          return (
            <Link key={`${slug}-${i}`} href={`/kategorie/${slug}`} className="tile">
              <CategoryIcon slug={slug} alt={ttl} dataUrl={imgFromData ?? undefined} />
              <div className="ttl">{ttl}</div>
            </Link>
          );
        })}
      </div>

      {/* feedback panel (projektová konstanta) */}
      <section
        style={{
          marginTop: 24,
          border: "1px solid #e6eaf2",
          borderRadius: 16,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </section>
    </main>
  );
}
