// src/app/kategorie/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import * as CatMod from "@/data/categories";

// 1) vytáhneme z importu všechny možné pole
function extractAll(mod: any): any[] {
  const buckets: any[] = [];
  if (Array.isArray(mod)) buckets.push(mod);
  if (Array.isArray(mod?.default)) buckets.push(mod.default);
  if (Array.isArray(mod?.categories)) buckets.push(mod.categories);
  if (Array.isArray(mod?.data)) buckets.push(mod.data);
  if (Array.isArray(mod?.default?.categories)) buckets.push(mod.default.categories);
  if (Array.isArray((mod as any).NORMALIZED_CATEGORIES)) {
    buckets.push((mod as any).NORMALIZED_CATEGORIES);
  }
  const arr = buckets.find((b) => Array.isArray(b));
  return arr || [];
}

// 2) normalizace
function norm(v: string | null | undefined): string {
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

// 3) uděláme z kategorie všechny možné slugs
function slugsFrom(cat: any): string[] {
  const c: string[] = [];
  c.push(norm(cat.slug));
  c.push(norm(cat.Slug));
  c.push(norm(cat.title));
  c.push(norm(cat.name));
  c.push(norm(cat.label));
  c.push(norm(cat.Title));
  return Array.from(new Set(c.filter(Boolean)));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const all = extractAll(CatMod);
  const wanted = norm(params.slug);

  // zkusíme najít
  let found: any = null;
  for (const cat of all) {
    const cands = slugsFrom(cat);
    if (cands.includes(wanted)) {
      found = cat;
      break;
    }
  }

  // 🔴 KDYŽ TO NENAŠLO → ukážeme všechny slugs, které fakt máme
  if (!found) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
        <h1 className="text-3xl font-bold">Kategorie nenalezena (debug)</h1>
        <p>Hledal jsem slug z URL: <code>{params.slug}</code></p>
        <p>Takhle vypadají kategorie, které ve skutečnosti máme:</p>
        <div className="bg-slate-50 border rounded-lg p-4 space-y-2">
          {all.map((cat, i) => {
            const label =
              cat.title ||
              cat.name ||
              cat.label ||
              cat.Title ||
              "(bez názvu)";
            const firstSlug = slugsFrom(cat)[0] || "–";
            return (
              <div key={i} className="flex gap-2 items-center">
                <span className="w-8 text-slate-400">{i + 1}.</span>
                <span className="font-semibold">{label}</span>
                <span className="text-slate-500 text-sm">({firstSlug})</span>
              </div>
            );
          })}
        </div>
        <p className="pt-4">
          <Link href="/" className="text-blue-700 underline">
            Zpět na hlavní stránku
          </Link>
        </p>
      </div>
    );
  }

  // 🟢 KDYŽ TO NAŠLO → zkusíme z ní vytáhnout podkategorie a ukázat je
  const subs =
    found.subcategories ||
    found.subCats ||
    found.children ||
    [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div className="text-sm text-slate-500">
        <Link href="/" className="underline">Domů</Link> /{" "}
        <span className="text-slate-900">
          {found.title || found.name || found.label || found.Title || "Kategorie"}
        </span>
      </div>

      <h1 className="text-3xl font-bold">
        {found.title || found.name || found.label || found.Title || "Kategorie"}
      </h1>
      <p className="text-slate-600">Vyber si z podkategorií:</p>

      {subs.length === 0 ? (
        <p className="text-slate-500">Tahle kategorie zatím nemá podkategorie.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subs.map((s: any, i: number) => (
            <div key={i} className="bg-white border rounded-lg p-4">
              <div className="font-semibold">
                {s.title || s.name || s.label || s.Title || `Podkategorie ${i + 1}`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
