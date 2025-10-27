// src/app/kategorie/[slug]/[...subslug]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

import * as CatMod from "@/data/categories";
import Link from "next/link";
import type { Metadata } from "next";

type Raw = any;

/* utilitky (stejné jako na [slug]) */
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
function subsOf(raw: Raw): Raw[] {
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
function subTitle(x: Raw) {
  return (x?.title ?? x?.name ?? x?.label ?? x?.Title ?? "").toString().trim() || "Bez názvu";
}
function findCategoryBySlug(slug: string) {
  const all = extractRaw(CatMod);
  for (const raw of all) {
    const t = normTitle(raw);
    const s = normSlug(raw, t);
    if (s === slug) return { raw, title: t, slug: s };
  }
  return null;
}
function findSubBySlug(parentRaw: Raw, subslug: string) {
  const subs = subsOf(parentRaw);
  for (const s of subs) {
    const t = subTitle(s);
    const ss = normSlug(s, t);
    if (ss === subslug) return { raw: s, title: t, slug: ss };
  }
  return null;
}

type Params = { slug: string; subslug: string[] };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const primarySub = params.subslug?.[0] ?? "";
  const cat = findCategoryBySlug(params.slug);
  const sub = cat ? findSubBySlug(cat.raw, primarySub) : null;
  const catTitle = cat?.title ?? params.slug;
  const subTitleTxt = (sub?.title ?? primarySub) || "Podkategorie"; // ← závorky
  return {
    title: `${subTitleTxt} – ${catTitle} | PINDOO`,
    description: `Najdeme ti ověřené poskytovatele pro „${subTitleTxt}“ v kategorii „${catTitle}“.`,
  };
}

export default async function SubcategoryCatchAll({ params }: { params: Params }) {
  const primarySub = params.subslug?.[0] ?? "";
  const cat = findCategoryBySlug(params.slug);
  const sub = cat ? findSubBySlug(cat.raw, primarySub) : null;

  const catTitleTxt = cat?.title ?? params.slug;
  const subTitleTxt = (sub?.title ?? primarySub) || "Podkategorie"; // ← závorky

  return (
    <main style={{ maxWidth: "1140px", margin: "0 auto", padding: "24px 16px" }}>
      <nav style={{ marginBottom: 8, fontSize: ".95rem" }}>
        <Link href="/kategorie" style={{ color: "#0E3A8A", textDecoration: "underline" }}>
          Kategorie
        </Link>
        <span> / </span>
        <Link href={`/kategorie/${params.slug}`} style={{ color: "#0E3A8A", textDecoration: "underline" }}>
          {catTitleTxt}
        </Link>
        <span> / </span>
        <span style={{ color: "#0f172a", fontWeight: 600 }}>{subTitleTxt}</span>
      </nav>

      <h1 style={{ margin: 0, fontSize: "1.9rem", fontWeight: 800, color: "#0f172a" }}>{subTitleTxt}</h1>
      <p style={{ marginTop: 8, color: "#475569" }}>
        Zástupná stránka pro „{subTitleTxt}“. Sem napojíme výpis poskytovatelů / lead formulář.
      </p>

      <section style={{ marginTop: 16, padding: 16, background: "#fff", border: "1px solid #e6eaf2", borderRadius: 16 }}>
        <div style={{ padding: 16, border: "1px dashed #cbd5e1", borderRadius: 12, textAlign: "center", color: "#475569" }}>
          Bude zde filtr a karty poskytovatelů.
        </div>

        <div style={{ marginTop: 16, border: "1px solid #e6eaf2", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
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
