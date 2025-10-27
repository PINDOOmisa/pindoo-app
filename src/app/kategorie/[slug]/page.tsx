// src/app/kategorie/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/data/categories"; // ← uprav cestu/export podle svého projektu

// ——— Typy (volitelně přísné, ale tolerantní na různé názvy polí) ———
type MaybeString = string | null | undefined;
type RawSub = {
  title?: MaybeString;
  name?: MaybeString;
  label?: MaybeString;
  Title?: MaybeString;

  slug?: MaybeString;
  Slug?: MaybeString;

  image?: MaybeString;
  img?: MaybeString;
  photo?: MaybeString;
  thumbnailUrl?: MaybeString;
  thumb?: MaybeString;
  cover?: MaybeString;
  coverImage?: MaybeString;
  iconUrl?: MaybeString;
  icon?: MaybeString;
};

type RawCategory = {
  slug?: string;
  Slug?: string;
  title?: string;
  name?: string;
  label?: string;
  Title?: string;
  subcategories?: RawSub[];
  subCats?: RawSub[];
  subs?: RawSub[];
  children?: RawSub[];
};

function pick<T = any>(obj: Record<string, any>, keys: string[], fallback: T): T {
  for (const k of keys) {
    if (obj && obj[k] != null) return obj[k] as T;
  }
  return fallback;
}

// ——— Pomocné: diakritika → slug ———
function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Vrátí slug subkategorie: preferuje existující slug, jinak vytvoří z title.
function normSlug(sub: RawSub, title: string): string {
  const explicit = pick<string>(sub as any, ["slug", "Slug"], "").trim();
  return explicit || slugify(title);
}

// ——— Odvození title/slug/image z různých schémat ———
function subTitle(s: RawSub): string {
  const t = pick<string>(s as any, ["title", "name", "label", "Title"], "").toString().trim();
  return t || "Bez názvu";
}
function subImage(s: RawSub): string | null {
  return (
    pick<string | null>(s as any, ["image", "img", "photo", "thumbnailUrl", "thumb", "cover", "coverImage", "iconUrl", "icon"], null) ||
    null
  );
}
function catTitle(c: RawCategory): string {
  return (pick<string>(c as any, ["title", "name", "label", "Title"], "") || "").toString().trim();
}
function catSlug(c: RawCategory): string {
  return (pick<string>(c as any, ["slug", "Slug"], "") || "").toString().trim();
}
function catSubs(c: RawCategory): RawSub[] {
  return (pick<RawSub[]>(c as any, ["subcategories", "subCats", "subs", "children"], []) || []) as RawSub[];
}

// ——— Metadata (volitelné) ———
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const found = (categories as RawCategory[]).find((c) => catSlug(c) === params.slug);
  const title = found ? `${catTitle(found)} | PINDOO` : "PINDOO";
  return {
    title,
    description:
      found ? `Vyber si z přehledu subkategorií v oblasti „${catTitle(found)}“. Najdeme ti ověřené poskytovatele.` : "Přehled subkategorií",
  };
}

// ——— Stránka ———
export default async function Page({ params }: { params: { slug: string } }) {
  const all = (categories as RawCategory[]) || [];
  const found = all.find((c) => catSlug(c) === params.slug);

  if (!found) return notFound();

  const subs = catSubs(found);
  const parentSlug = catSlug(found);
  const parentTitle = catTitle(found);

  return (
    <main style={{ maxWidth: "1140px", margin: "0 auto", padding: "24px 16px" }}>
      {/* Zpět na kategorie */}
      <div style={{ marginBottom: 8 }}>
        <Link href="/kategorie" style={{ color: "#0E3A8A", textDecoration: "underline" }}>
          ← Zpět na kategorie
        </Link>
      </div>

      {/* H1 */}
      <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 800, color: "#0f172a" }}>{parentTitle}</h1>
      <div style={{ height: 12 }} />

      {/* Grid subkategorií */}
      <div className="scg-wrap">
        <div className="scg-grid">
          {subs.map((s, i) => {
            const t = subTitle(s);
            const subSlug = normSlug(s, t);
            const img = subImage(s);

            return (
              <Link key={`${subSlug}-${i}`} href={`/kategorie/${parentSlug}/${subSlug}`} className="scg-card">
                <div className="scg-head">{t}</div>
                {img ? <img src={img} alt="" className="scg-img" /> : <div className="scg-img scg-img--placeholder" aria-hidden="true" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Feedback panel (viz trvalý požadavek) */}
      <section
        aria-labelledby="pindo-feedback-title"
        style={{
          marginTop: 24,
          border: "1px solid #e6eaf2",
          borderRadius: 16,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <div style={{ display: "grid", gap: 0, gridTemplateColumns: "1fr", alignItems: "center" }}>
          <img
            src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
            alt=""
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </section>
    </main>
  );
}
