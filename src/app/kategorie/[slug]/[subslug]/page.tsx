// server component – žádný "use client", žádné styled-jsx
import Link from "next/link";

export default function SubcategoryPage({
  params,
}: {
  params: { slug: string; subslug: string };
}) {
  const { slug, subslug } = params;
  return (
    <main style={{ maxWidth: "1140px", margin: "0 auto", padding: "24px 16px" }}>
      <p style={{ marginBottom: 8 }}>
        <Link href={`/kategorie/${slug}`} style={{ color: "#0E3A8A", textDecoration: "underline" }}>
          ← Zpět na {slug}
        </Link>
      </p>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
        Podkategorie: {subslug}
      </h1>
      <p style={{ color: "#6b7280" }}>
        (Sem přijde výpis poskytovatelů / filtrování pro tuto podkategorii.)
      </p>
    </main>
  );
}
