// src/app/kategorie/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/data/categories";

/* ========= Typy a pomocné funkce (tolerantní na různá schémata) ========= */
type MaybeString = string | null | undefined;

type RawSub = {
  title?: MaybeString; name?: MaybeString; label?: MaybeString; Title?: MaybeString;
  slug?: MaybeString;  Slug?: MaybeString;
  image?: MaybeString; img?: MaybeString; photo?: MaybeString; thumbnailUrl?: MaybeString;
  thumb?: MaybeString; cover?: MaybeString; coverImage?: MaybeString; iconUrl?: MaybeString; icon?: MaybeString;
};

type RawCategory = {
  slug?: MaybeString; Slug?: MaybeString;
  title?: MaybeString; name?: MaybeString; label?: MaybeString; Title?: MaybeString;
  subcategories?: RawSub[]; subCats?: RawSub[]; subs?: RawSub[]; children?: RawSub[];
};

function pick<T = any>(obj: Record<string, any>, keys: string[], fallback: T): T {
  for (const k of keys) if (obj && obj[k] != null) return obj[k] as T;
  return fallback;
}

function slugify(input: string): string {
  return (input || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // odstraní diakritiku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function subTitle(s: RawSub): string {
  const t = String(pick<string>(s as any, ["title", "name", "label", "Title"], "") || "").trim();
  return t || "Bez názvu";
}
function subImage(s: RawSub): string | null {
  return (
    pick<string | null>(s as any, ["image", "img", "photo", "thumbnailUrl", "thumb", "cover", "coverImage", "iconUrl", "icon"], null) ||
    null
  );
}
function normSubSlug(s: RawSub, title: string): string {
  const explicit = String(pick<string>(s as any, ["slug", "Slug"], "") || "").trim();
  return explicit || slugify(title);
}

function catTitle(c: RawCategory): string {
  return String(pick<string>(c as any, ["title", "name", "label", "Title"], "") || "").trim();
}
function catSlug(c: RawCategory): string {
  const explicit = String(pick<string>(c as any, ["slug", "Slug"], "") || "").trim();
  return explicit || slugify(catTitle(c)); // fallback na slug z názvu → konzistentní s listem
}
function catSubs(c: RawCategory): RawSub[] {
  return (pick<RawSub[]>(c as any, ["subcategories", "subCats", "subs", "children"], []) || []) as RawSub[];
}

/* ========= Metadata ========= */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const list = (categories as RawCategory[]) || [];
  const found = list.find((c) => catSlug(c) === params.slug);
  const title = found ? `${catTitle(found)} | PINDOO` : "PINDOO";
  const description = found
    ? `Vyber si z přehledu subkategorií v oblasti „${catTitle(found)}“. Najdeme ti ověřené poskytovatele.`
    : "Přehled subkategorií";
  return { title, description };
}

/* ========= Stránka ========= */
export default async function Page({ params }: { params: { slug: string } }) {
  const all = (categories as RawCategory[]) || [];
  const found = all.find((c) => catSlug(c) === params.slug);
  if (!found) return notFound();

  const parentTitle = catTitle(found);
  const parentSlug = catSlug(found);
  const subs = catSubs(found);

  return (
    <main style={{ maxWidth: 1140, margin: "0 auto", padding: "24px 16px" }}>
      {/* Zpět */}
      <div style={{ marginBottom: 12 }}>
        <Link href="/kategorie" style={{ color: "#0E3A8A", textDecoration: "underline" }}>
          ← Zpět na kategorie
        </Link>
      </div>

      {/* H1 */}
      <h1 style={{ margin: 0, fontSize: "1.75rem", lineHeight: 1.25, fontWeight: 800, color: "#0f172a" }}>
        {parentTitle}
      </h1>

      {/* Grid subkategorií */}
      <div
        style={{
          marginTop: 16,
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        {/* breakpoints pouze přes inline CSS (simple) */}
        <style>{`
          @media (min-width: 640px){ .subs-grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
          @media (min-width: 1024px){ .subs-grid { grid-template-columns: repeat(4, minmax(0,1fr)); } }
        `}</style>
        <div className="subs-grid" style={{ display: "grid", gap: 16 }}>
          {subs.map((s, i) => {
            const t = subTitle(s);
            const subSlug = normSubSlug(s, t);
            const img = subImage(s);

            return (
              <Link
                key={`${subSlug}-${i}`}
                href={`/kategorie/${parentSlug}/${subSlug}`}
                style={{
                  display: "block",
                  border: "1px solid #e6eaf2",
                  borderRadius: 16,
                  padding: 16,
                  background: "#fff",
                  textDecoration: "none",
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 12, color: "#0f172a" }}>{t}</div>
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img}
                    alt=""
                    style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 12, display: "block" }}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    style={{
                      width: "100%",
                      height: 120,
                      borderRadius: 12,
                      background: "#f1f5f9",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Feedback panel (požadavek: vždy přidávat) */}
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
