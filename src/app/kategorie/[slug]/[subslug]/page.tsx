import Link from "next/link";

export default function SubcategoryPage({
  params,
}: {
  params: { slug: string; subslug: string };
}) {
  const { slug, subslug } = params;
  return (
    <main className="container">
      <p className="back">
        <Link href={`/kategorie/${slug}`} className="link">
          ← Zpět na {slug}
        </Link>
      </p>
      <h1 className="h1">Podkategorie: {subslug}</h1>
      <p className="muted">
        Sem přijde výpis poskytovatelů / filtrů pro tuto podkategorii.
      </p>

      <style jsx>{`
        .container { max-width: 1140px; margin: 0 auto; padding: 24px 16px; }
        .back { margin-bottom: 8px; }
        .h1 { font-size: 1.6rem; font-weight: 800; margin: 0; color: #0f172a; }
        .muted { color: #6b7280; }
        .link { color: #0E3A8A; text-decoration: underline; }
      `}</style>
    </main>
  );
}
