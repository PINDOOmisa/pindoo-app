export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import type { Metadata } from "next";

function prettyTitle(s: string) {
  return s
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export async function generateMetadata({
  params,
}: { params: { slug: string; subslug: string } }): Promise<Metadata> {
  const cat = prettyTitle(params.slug);
  const sub = prettyTitle(params.subslug);
  return {
    title: `${sub} – ${cat} | PINDOO`,
    description: `Najdeme ti ověřené poskytovatele pro „${sub}“ v kategorii „${cat}“.`,
  };
}

export default async function SubcategoryPage({
  params,
}: { params: { slug: string; subslug: string } }) {
  const cat = prettyTitle(params.slug);
  const sub = prettyTitle(params.subslug);

  return (
    <main style={{ maxWidth: "1140px", margin: "0 auto", padding: "24px 16px" }}>
      <nav style={{ marginBottom: 8, fontSize: ".95rem" }}>
        <Link href="/kategorie" style={{ color: "#0E3A8A", textDecoration: "underline" }}>Kategorie</Link>
        <span> / </span>
        <Link href={`/kategorie/${params.slug}`} style={{ color: "#0E3A8A", textDecoration: "underline" }}>{cat}</Link>
        <span> / </span>
        <span style={{ color: "#0f172a", fontWeight: 600 }}>{sub}</span>
      </nav>

      <h1 style={{ margin: 0, fontSize: "1.9rem", fontWeight: 800, color: "#0f172a" }}>{sub}</h1>
      <p style={{ marginTop: 8, color: "#475569" }}>
        Zástupná stránka pro „{sub}“. Sem napojíme výpis poskytovatelů / lead formulář.
      </p>

      <section style={{ marginTop: 16, padding: 16, background: "#fff", border: "1px solid #e6eaf2", borderRadius: 16 }}>
        <div style={{ padding: 16, border: "1px dashed #cbd5e1", borderRadius: 12, textAlign: "center", color: "#475569" }}>
          Bude zde filtr a karty poskytovatelů.
        </div>

        {/* Feedback panel (trvalý požadavek) */}
        <div style={{ marginTop: 16, border: "1px solid #e6eaf2", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
          <img
            src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
            alt=""
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </section>
    </main>
  );
}
