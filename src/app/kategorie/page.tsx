// src/app/kategorie/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import * as CatMod from "@/data/categories";
import SubcategoryGrid from "@/components/SubcategoryGrid";

// 1) pomocné typy
type MaybeString = string | null | undefined;
type RawCategory = {
  slug?: MaybeString;
  Slug?: MaybeString;
  title?: MaybeString;
  name?: MaybeString;
  label?: MaybeString;
  Title?: MaybeString;
  image?: MaybeString;
  img?: MaybeString;
  icon?: MaybeString;
  coverImage?: MaybeString;
  thumbnailUrl?: MaybeString;
  subcategories?: any[];
  subCats?: any[];
  children?: any[];
};

// 2) vytáhneme z importu to, co tam je
function extractAllCategories(mod: any): RawCategory[] {
  const buckets: any[] = [];

  if (Array.isArray(mod)) buckets.push(mod);
  if (Array.isArray(mod?.default)) buckets.push(mod.default);
  if (Array.isArray(mod?.categories)) buckets.push(mod.categories);
  if (Array.isArray(mod?.data)) buckets.push(mod.data);
  if (Array.isArray(mod?.default?.categories)) buckets.push(mod.default.categories);
  if (Array.isArray(mod?.default?.data)) buckets.push(mod.default.data);

  // některé naše předchozí verze měly NORMALIZED_CATEGORIES
  if (Array.isArray((mod as any).NORMALIZED_CATEGORIES)) {
    buckets.push((mod as any).NORMALIZED_CATEGORIES);
  }

  const firstArray = buckets.find((b) => Array.isArray(b));
  return (firstArray as RawCategory[]) || [];
}

// 3) normalizace stringu (domácnost & úklid -> domacnost-uklid)
function norm(v: MaybeString): string {
  if (!v) return "";
  return v
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 4) z jedné kategorie uděláme "hromadu možných slugů"
function candidatesFromCat(cat: RawCategory): string[] {
  const c: string[] = [];
  c.push(norm(cat.slug));
  c.push(norm(cat.Slug));
  c.push(norm(cat.title));
  c.push(norm(cat.name));
  c.push(norm(cat.label));
  c.push(norm(cat.Title));
  return Array.from(new Set(c.filter(Boolean)));
}

// 5) najdeme kategorii podle url slugu
function findCategoryBySlug(all: RawCategory[], slugFromUrl: string): RawCategory | null {
  const target = norm(slugFromUrl);

  for (const cat of all) {
    const cands = candidatesFromCat(cat);
    if (cands.includes(target)) {
      return cat;
    }
  }
  return null;
}

// 6) z kategorie vytáhneme podkategorie, ať už jsou pojmenované jakkoliv
function extractSubcategories(cat: RawCategory | null): any[] {
  if (!cat) return [];
  return (
    cat.subcategories ||
    cat.subCats ||
    cat.children ||
    []
  );
}

// 7) samotná stránka
export default async function CategoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // všechny kategorie z importu
  const ALL = extractAllCategories(CatMod);
  // zkusíme najít podle url
  const active = findCategoryBySlug(ALL, params.slug);
  const subs = extractSubcategories(active);

  // DEBUG VARIANTA: když nenašlo, ukážeme, jaké slugs vlastně existují
  if (!active) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Kategorie nenalezena</h1>
        <p className="mb-6">
          Hledal jsem slug: <code>{params.slug}</code>
        </p>
        <p className="mb-4">
          Tyhle kategorie ale v datech opravdu jsou (podle všeho, co jsme importovali):
        </p>
        <ul className="list-disc pl-6 space-y-1">
          {ALL.map((c, i) => {
            const cand = candidatesFromCat(c)[0] || "(bez názvu)";
            const label =
              c.title ||
              c.name ||
              c.label ||
              c.Title ||
              cand;
            return (
              <li key={i}>
                {label} <span className="text-slate-500">({cand})</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-8">
          <Link href="/" className="text-blue-700 underline">
            Zpět na hlavní stránku
          </Link>
        </p>
      </div>
    );
  }

  // Když kategorie existuje, ale nemá subkategorie – dáme hlášku
  const title =
    active.title || active.name || active.label || active.Title || "Kategorie";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* breadcrumb */}
      <div className="text-sm text-slate-500 mb-4">
        <Link href="/" className="underline">
          Domů
        </Link>{" "}
        / <span className="text-slate-900">{title}</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-slate-600 mb-6">
        Vyber si z podkategorií v této oblasti.
      </p>

      {/* pokud máme subkategorie, zobrazíme náš grid */}
      {subs && subs.length > 0 ? (
        <SubcategoryGrid items={subs} parentSlug={params.slug} />
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">
            V této kategorii zatím nejsou podkategorie.
          </h2>
          <p className="text-slate-600 mb-4">
            Dej mi vědět a doplníme ji do PINDOO. 💛
          </p>
          <Link href="/" className="text-blue-700 underline">
            Zpět na hlavní stránku
          </Link>
        </div>
      )}
    </div>
  );
}

