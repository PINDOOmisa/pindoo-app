// src/app/kategorie/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  params: {
    slug: string;
  };
};

export default function CategoryDebugPage({ params }: PageProps) {
  const { slug } = params;

  return (
    <div style={{ minHeight: "100vh", background: "#F7F7F9", padding: "40px" }}>
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "12px" }}>
          Funguje dynamická stránka 🎯
        </h1>
        <p style={{ marginBottom: "6px", color: "#6b7280" }}>
          Slug, na který ses proklikla:
        </p>
        <code
          style={{
            display: "inline-block",
            background: "#0E3A8A0D",
            padding: "6px 10px",
            borderRadius: "8px",
            fontFamily: "ui-monospace, SFMono-Regular, SFMono-Regular, Menlo, Monaco",
          }}
        >
          {slug}
        </code>

        <p style={{ marginTop: "18px", color: "#6b7280" }}>
          Pokud tohle vidíš, samotná routa <strong>/kategorie/[slug]</strong> je v pořádku a chyba
          je v importu dat.
        </p>
      </div>
    </div>
  );
}
