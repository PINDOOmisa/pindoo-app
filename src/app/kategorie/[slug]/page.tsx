import * as CatMod from "@/data/categories";
import Link from "next/link";
import SubcategoryGrid from "@/components/SubcategoryGrid";

type Raw = any;

function extractRaw(mod: any): Raw[] {
  const pick =
    (Array.isArray(mod) && mod) ||
    (Array.isArray(mod?.default) && mod.default) ||
    (Array.isArray(mod?.categories) && mod.categories) ||
    (Array.isArray(mod?.default?.categories) && mod.default.categories) ||
    (Array.isArray(mod?.data) && mod.data) ||
    (Array.isArray(mod?.default?.data) && mod.default.data) ||
    Object.values(mod || {}).find((v: any) => Array.isArray(v)) ||
    Object.values(mod?.default || {}).find((v: any) => Array.isArray(v)) ||
    [];
  return (pick as Raw[]) || [];
}

const normTitle = (x: Raw) =>
  (x?.title ?? x?.name ?? x?.label ?? x?.CategoryName ?? x?.Title ?? "")
    .toString()
    .trim();

function normSlug(x: Raw, title: string) {
  const s =
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
  return s.toString().trim();
}

function extractSubcats(raw: Raw): Raw[] {
  // Podporujeme různé názvy polí z exportů
  const cands =
    raw?.subcategories ??
    raw?.subcategory ??
    raw?.children ??
    raw?.subs ??
    raw?.items ??
    raw?.Subcategories ??
    raw?.Children ??
    raw?.Items ??
    null;

  if (Array.isArray(cands)) return cands;

  // Některé exporty mají objekt s klíči -> vezmeme values
  if (cands && typeof cands === "object") {
    const vals = Object.values(cands).filter((v) => !!v);
    if (vals.length && Array.isArray(vals[0])) return vals[0] as Raw[];
    return vals as Raw[];
  }
  return [];
}

export async function generateStaticParams() {
  const list = extractRaw(CatMod);
  return list.map((x) => {
    const title = normTitle(x);
    const slug = normSlug(x, title);
    return { slug };
  });
}

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
    return (
      <main className="container">
        <h1 className="h1">Kategorie nenalezena</h1>
        <p className="muted">
          Zpět na{" "}
          <Link href="/kategorie" className="link">
            všechny kategorie
          </Link>
          .
        </p>
        <style jsx>{styles}</style>
      </main>
    );
  }

  const subs = extractSubcats(found.raw);

  return (
    <main className="container">
      <div className="top">
        <Link href="/kategorie" className="link">
          ← Zpět na kategorie
        </Link>
      </div>

      <h1 className="h1">{found.title}</h1>

      <div className="spacer" />

      {/* Grid podkategorií */}
      <SubcategoryGrid categorySlug={found.slug} items={subs} />

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
.container { max-width: 1140px; margin: 0 auto; padding: 24px 16px; }
.top { margin-bottom: 8px; }
.h1 { font-size: 1.75rem; font-weight: 800; margin: 0; color: #0f172a; }
.muted { color: #6b7280; }
.link { color: #0E3A8A; text-decoration: underline; }
.spacer { height: 12px; }
`;
