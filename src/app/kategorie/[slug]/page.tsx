// src/app/kategorie/[slug]/page.tsx
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import FeedbackPanel from "@/components/FeedbackPanel";

type PageProps = {
  params: { slug: string };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function CategoryDetailPage({ params }: PageProps) {
  const wanted = (params.slug || "").toLowerCase();

  const category =
    CATEGORIES.find((c) => (c.slug || "").toLowerCase() === wanted) || null;

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

  const subs: any[] = Array.isArray(category.subcategories)
    ? category.subcategories
    : [];

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

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 16px" }}>
      <p style={{ fontSize: 13, marginBottom: 12 }}>
        <Link href="/" style={{ color: "#0E3A8A", fontWeight: 600 }}>
          Domů
        </Link>{" "}
        / <Link href="/kategorie">Kategorie</Link> /{" "}
        <span style={{ color: "#0f172a", fontWeight: 600 }}>{category.title}</span>
      </p>

      <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>
        {category.title}
      </h1>
      <p style={{ color: "#475569", marginBottom: 26 }}>
        Vyber si z podkategorií v této oblasti.
      </p>

      {subs.length > 0 ? (
        <div style={gridStyle}>
          {subs.map((sub, idx) => (
            <div key={sub.slug || idx} style={cardStyle}>
              <div style={{ fontWeight: 600, color: "#0f172a" }}>
                {sub.title}
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
