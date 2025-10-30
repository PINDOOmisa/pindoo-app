// src/app/kategorie/[slug]/page.tsx
import { notFound } from "next/navigation";
import * as CatMod from "@/data/categories";

type Raw = any;

function extractAll(mod: any): Raw[] {
  const arrs: any[] = [];
  if (Array.isArray(mod)) arrs.push(mod);
  if (Array.isArray(mod?.default)) arrs.push(mod.default);
  if (Array.isArray(mod?.categories)) arrs.push(mod.categories);
  const found = arrs.find((a) => Array.isArray(a));
  return (found as Raw[]) || [];
}

export default function CategoryDetail({ params }: { params: { slug: string } }) {
  const all = extractAll(CatMod);
  const item =
    all.find((x) => x?.slug === params.slug || x?.Slug === params.slug) ??
    all.find((x) => {
      const t = (x?.title ?? x?.name ?? "").toString().trim().toLowerCase();
      return (
        t
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") === params.slug
      );
    });

  if (!item) {
    notFound();
  }

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      <h1>{item.title ?? item.name ?? "Kategorie"}</h1>
      <p>Sem pak dáme subkategorie jako dlaždice.</p>
    </main>
  );
}
