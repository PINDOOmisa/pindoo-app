// src/app/kategorie/[slug]/page.tsx
import Link from "next/link";
import catsData, { CATEGORIES } from "@/data/categories";
import FeedbackPanel from "@/components/FeedbackPanel";

type PageProps = {
  params: { slug: string };
};

function norm(v: string | null | undefined): string {
  return (v || "")
    .toLowerCase()
    .trim();
}

// stejná funkce jako na homepage
function makeSlug(input: string): string {
  return (input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toArray(raw: any): any[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.categories)) return raw.categories;
  if (Array.isArray(raw?.data)) return raw.data;
  return [];
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function CategoryDetailPage({ params }: PageProps) {
  const wanted = norm(params.slug);

  const allCats = toArray(catsData).length ? toArray(catsData) : CATEGORIES;

  // 1) zkus podle slug
  let category =
    allCats.find((c: any) => norm(c.slug) === wanted) ||
    allCats.find((c: any) => norm(c.Slug) === wanted) ||
    null;

  // 2) když se nenašla, zkus podle SLUGU z TITLE
  if (!category) {
    category =
      allCats.find((c: any) => makeSlug(c.title || c.name || c.label || c.Title || "") === wanted) ||
      null;
  }

  if (!category) {
    return (
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 16px" }}>
        <p style={{ fontSize: 13, marginBottom: 12 }}>
          <Link href="/" style={{ color: "#0E3A8A", fontWeight: 600 }}>
            Domů
          </Link>{" "}
          / <Link href="/kategorie">Kategorie</Link>
        </p>
        <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>Kategorie nenalezena</h1>
        <p style={{ color: "#475569", marginBottom: 20 }}>
          Zkus se vrátit na výpis kategorií a vybrat jinou oblast.
        </p>
        <div style={{ marginTop: 30 }}>
          <FeedbackPanel />
        </div>
      </main>
    );
  }

  const subs: any[] =
    category.subcategories ||
    category.Subcategories ||
    category.children ||
    category.Children ||
    [];

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "18px",
  };

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid rgba(15,23,42,0.05)",
    borderRadius: "18px",
    padding: "16px 16px 14px",
    boxShadow: "0 12px 25px rgba(15,23,42,0.04)",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  };

  const catName =
    category.title || category.name || category.label || category.Title || "Kategorie";

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 16px" }}>
      <p style={{ fontSize: 13, marginBottom: 12 }}>
        <Link href="/" style={{ color: "#0E3A8A", fontWeight: 600 }}>
          Domů
        </Link>{" "}
        / <Link href="/kategorie">Kategorie</Link> /{" "}
        <span style={{ color: "#0f172a", fontWeight: 600 }}>{catName}</span>
      </p>

      <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>{catName}</h1>
      <p style={{ color: "#475569", marginBottom: 26 }}>
        Vyber si z podkategorií v této oblasti.
      </p>

      {Array.isArray(subs) && subs.length > 0 ? (
        <div style={gridStyle}>
          {subs.map((sub: any, idx: number) => (
            <div key={sub.slug || sub.Slug || idx} style={cardStyle}>
              <div style={{ fontWeight: 600, color: "#0f172a" }}>
                {sub.title || sub.name || sub.label}
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                Upřesni tohle v poptávce a ukážeme ti vhodné profíky.
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#94a3b8", fontSize: 13 }}>
          V této kategorii zatím nejsou podkategorie.
        </p>
      )}

      <div style={{ marginTop: 40 }}>
        <FeedbackPanel />
      </div>
    </main>
  );
}
