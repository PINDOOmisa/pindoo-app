// src/app/kategorie/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

import * as CatMod from "@/data/categories";
import Link from "next/link";
import { notFound } from "next/navigation";

type Raw = any;

/* ===== utilitky tolerantní k různým strukturám ===== */
function extractRaw(mod: any): Raw[] {
  const candidates: any[] = [];
  if (Array.isArray(mod)) candidates.push(mod);
  if (Array.isArray(mod?.default)) candidates.push(mod.default);
  if (Array.isArray(mod?.categories)) candidates.push(mod.categories);
  if (Array.isArray(mod?.default?.categories)) candidates.push(mod.default.categories);
  if (Array.isArray(mod?.data)) candidates.push(mod.data);
  if (Array.isArray(mod?.default?.data)) candidates.push(mod.default.data);
  const found =
    candidates.find((v) => Array.isArray(v)) ||
    Object.values(mod || {}).find((v: any) => Array.isArray(v)) ||
    Object.values(mod?.default || {}).find((v: any) => Array.isArray(v)) ||
    [];
  return (found as Raw[]) || [];
}

const normTitle = (x: Raw) =>
  (x?.title ?? x?.name ?? x?.label ?? x?.CategoryName ?? x?.Title ?? "").toString().trim();

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normSlug(x: Raw, title: string) {
  const s = x?.slug ?? x?.Slug ?? x?.id ?? x?.Id ?? slugify(title);
  return s.toString().trim();
}

function extractSubcats(raw: Raw): Raw[] {
  const c =
    raw?.subcategories ??
    raw?.subcategory ??
    raw?.children ??
    raw?.subs ??
    raw?.items ??
    raw?.Subcategories ??
    raw?.Children ??
    raw?.Items ??
    null;
  if (Array.isArray(c)) return c;
  if (c && typeof c === "object") return Object.values(c) as Raw[];
  return [];
}

function getImageUrl(x: Raw): string | null {
  return (
    x?.image ??
    x?.img ??
    x?.photo ??
    x?.thumbnailUrl ??
    x?.thumb ??
    x?.cover ??
    x?.coverImage ??
    x?.iconUrl ??
    x?.icon ??
    null
  ) || null;
}

/* ===== stránka ===== */
export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const list = extractRaw(CatMod);
  const found = list
    .map((x) => {
      const title = normTitle(x);
      const slug = normSlug(x, title);
      return { raw: x, title, slug };
    })
    .find((c) => c.slug === params.slug);

  if (!found) {
    return notFound();
  }

  const subs = extractSubcats(found.raw);

  return (
    <main style={{ maxWidth: "1140px", margin: "0 auto", padding: "24px 16px" }}>
      {/* Zpět na kategorie */}
      <div style={{ marginBottom: 8 }}>
        <Link href="/kategorie" style={{ color: "#0E3A8A", textDecoration: "underline" }}>
          ← Zpět na kategorie
        </Link>
      </div>

      {/* H1 */}
      <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 800, color: "#0f172a" }}>
        {found.title}
      </h1>
      <div style={{ height: 12 }} />

      {/* Grid podkategorií – pouze třídy scg-* (styly v globals.css) */}
      <div className="scg-wrap">
        <div className="scg-grid">
          {subs.map((s: any) => {
            const t =
              (s?.title ?? s?.name ?? s?.label ?? s?.Title ?? "").toString().trim() || "Bez názvu";
            const subSlug = normSlug(s, t);
            const img = getImageUrl(s);

            return (
              <Link
                key={subSlug}
                href={`/kategorie/${found.slug}/${subSlug}`}
                className="scg-card"
                prefetch
              >
                <div className="scg-head">{t}</div>
                {img ? (
                  <img src={img} alt="" className="scg-img" />
                ) : (
                  <div className="scg-img scg-img--placeholder" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
