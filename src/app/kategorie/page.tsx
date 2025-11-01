// src/app/kategorie/page.tsx
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import FeedbackPanel from "@/components/FeedbackPanel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function CategoriesPage() {
  // jednoduché styly, aby to fungovalo i bez tailwindu
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
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  };

  const titleStyle: React.CSSProperties = {
    fontWeight: 600,
    color: "#0f172a",
  };

  const countStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#64748b",
  };

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 16px" }}>
      <p style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8 }}>
        (PINDOO / kategorie – dlaždice, verze Lumír, bez Tailwindu)
      </p>

      {/* breadcrumb */}
      <nav style={{ fontSize: 13, color: "#64748b", marginBottom: 18 }}>
        <Link href="/" style={{ color: "#0E3A8A", fontWeight: 600 }}>
          Domů
        </Link>{" "}
        / <span style={{ color: "#94a3b8" }}>Kategorie</span>
      </nav>

      <h1 style={{ fontSize: 34, fontWeight: 700, marginBottom: 10 }}>Kategorie</h1>
      <p style={{ color: "#475569", marginBottom: 26, maxWidth: 420 }}>
        Vyber si oblast, kterou potřebuješ. Podle toho ti pak najdeme poskytovatele.
      </p>

      <div style={gridStyle}>
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/kategorie/${cat.slug}`} style={cardStyle}>
            <span style={titleStyle}>{cat.title}</span>
            <span style={countStyle}>
              {Array.isArray(cat.subcategories)
                ? `${cat.subcategories.length} podkategorií`
                : "Podkategorie se připravují"}
            </span>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <FeedbackPanel />
      </div>
    </main>
  );
}
