// src/app/kategorie/[slug]/[...subslug]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

import Link from "next/link";

export default function SubPage({ params }: { params: { slug: string; subslug: string[] } }) {
  const path = [params.slug, ...(params.subslug || [])].join(" / ");
  return (
    <main style={{ maxWidth: 1140, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ marginBottom: 12 }}>
        <Link href={`/kategorie/${params.slug}`} style={{ color: "#0E3A8A", textDecoration: "underline" }}>
          ← Zpět na {params.slug}
        </Link>
      </div>

      <h1 style={{ margin: 0, fontSize: "1.75rem", lineHeight: 1.25, fontWeight: 800, color: "#0f172a" }}>
        {path}
      </h1>

      <p style={{ marginTop: 12, color: "#334155" }}>
        Tohle je placeholder pro obsah podkategorie. V dalším kroku sem přidáme filtry a výpis poskytovatelů.
      </p>
    </main>
  );
}
