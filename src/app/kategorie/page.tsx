// src/app/kategorie/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

/* Helpery (stejné jako na detailu, aby slugy seděly) */
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
  return explicit || slugify(catTitle(c)); // stejné jako na detailu
}
function catImage(c: RawCategory): string | null {
  return pick<string | null>(c as any, ["image","img","icon","coverImage","thumbnailUrl"], null) || null;
}

export default function Page() {
  const list = (CATEGORIES as RawCategory[]) || [];

  return (
    <main style={{ maxWidth: 1140, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: "1.875rem", fontWeight: 800, marginBottom: 16, color: "#0f172a" }}>Kategorie</h1>

      {/* grid */}
      <style>{`
        .cats { display:grid; gap:16px; grid-template-columns:repeat(2,minmax(0,1fr)); }
        @media (min-width:640px){ .cats{ grid-template-columns:repeat(3,minmax(0,1fr)); } }
        @media (min-width:1024px){ .cats{ grid-template-columns:repeat(4,minmax(0,1fr)); } }
        .card{ display:block; border:1px solid #e6eaf2; border-radius:16px; padding:16px; background:#fff; text-decoration:none; }
        .ttl{ font-weight:600; margin-bottom:12px; color:#0f172a; }
        .img{ width:100%; height:120px; object-fit:cover; border-radius:12px; display:block; }
        .ph{ width:100%; height:120px; border-radius:12px; background:#f1f5f9; }
      `}</style>

      <div className="cats">
        {list.map((c, i) => {
          const slug = catSlug(c);
          const ttl = catTitle(c) || "Kategorie";
          const img = catImage(c);
          if (!slug) return null;
          return (
            <Link key={`${slug}-${i}`} href={`/kategorie/${slug}`} className="card" prefetch>
              <div className="ttl">{ttl}</div>
              {img ? <img src={img} alt="" className="img" /> : <div className="ph" aria-hidden="true" />}
            </Link>
          );
        })}
      </div>

      {/* povinný feedback panel */}
      <section style={{ marginTop: 24, border: "1px solid #e6eaf2", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
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
