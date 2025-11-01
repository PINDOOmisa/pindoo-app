// src/app/page.tsx
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import FeedbackPanel from "@/components/FeedbackPanel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  // jednoduchá mřížka bez Tailwindu
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
    <main style={{ background: "#F5F5F6", minHeight: "100vh" }}>
      {/* HERO – necháme stejný obsah, jen trochu srovnáme */}
      <section style={{ background: "#fff", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "30px 16px" }}>
          <div
            style={{
              background: "#F2F5FA",
              borderRadius: 28,
              padding: "26px 24px 26px",
            }}
          >
            <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6, color: "#0f172a" }}>
              Nechce se ti hledat? Zadej poptávku.
            </h1>
            <p style={{ color: "#475569", marginBottom: 18, maxWidth: 480 }}>
              Jedno zadání → více nabídek. Oslovíme prověřené profíky ve tvém okolí.
            </p>
            <Link
              href="/vytvoreni-poptavky"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#F5B301",
                color: "#0f172a",
                padding: "9px 16px",
                borderRadius: 14,
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              Zadat poptávku
            </Link>
          </div>
        </div>
      </section>

      {/* KATEGORIE – TEĎ UŽ DLAŽDICE */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px 50px" }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 18, color: "#0f172a" }}>
          Kategorie
        </h2>

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
      </section>
    </main>
  );
}
