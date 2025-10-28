// src/app/kategorie/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { CATEGORIES } from "@/data/categories";

/* ---- pomocné funkce (čisté, bez prohlížečových API) ---- */
type Raw = any;
const pick = (o: any, keys: string[], fb: any) => {
  for (const k of keys) if (o && o[k] != null) return o[k];
  return fb;
};
const slugify = (s: string) =>
  (s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const getTitle = (c: Raw) =>
  String(pick(c, ["title","name","label","Title"], "") || "").trim();

const getSlug = (c: Raw) => {
  const explicit = String(pick(c, ["slug","Slug"], "") || "").trim();
  return explicit || slugify(getTitle(c));
};

export default function Page() {
  const list: Raw[] = Array.isArray(CATEGORIES) ? (CATEGORIES as Raw[]) : [];

  return (
    <main style={{ maxWidth: 1140, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: "30px", fontWeight: 800, marginBottom: 8, color: "#0f172a" }}>
        Kategorie
      </h1>
      <p style={{ color: "#475569", marginBottom: 16 }}>
        Vyber si oblast a pojďme najít ověřené poskytovatele.
      </p>

      {/* Mřížka dlaždic — čistý inline CSS kvůli 100% jistotě renderu */}
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        {/* breakpoints přes wrappery */}
        <style>{`
          @media (min-width:640px){ .cats-3 { grid-template-columns:repeat(3,minmax(0,1fr)); } }
          @media (min-width:1024px){ .cats-4 { grid-template-columns:repeat(4,minmax(0,1fr)); } }
        `}</style>
      </div>

      <div className="cats-4 cats-3" style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
        {list.map((c, i) => {
          const slug = getSlug(c);
          const title = getTitle(c) || "Kategorie";
          if (!slug) return null;

          // absolutní minimální a nejstabilnější render: <a> + <div> + <img>
          return (
            <a
              key={`${slug}-${i}`}
              href={`/kategorie/${slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: 16,
                textDecoration: "none",
                background: "#fff",
                border: "1px solid #e6eaf2",
                borderRadius: 16,
                boxShadow: "0 0 0 rgba(0,0,0,0)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 120,
                  background: "#f8fafc",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/img/categories/${slug}.jpg`}
                  alt={title}
                  loading="lazy"
                  style={{
                    maxWidth: "90%",
                    maxHeight: "90%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ fontWeight: 700, color: "#0f172a" }}>{title}</div>
            </a>
          );
        })}
      </div>

      {/* feedback panel (projektová konstanta) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <section
        style={{
          marginTop: 24,
          border: "1px solid #e6eaf2",
          borderRadius: 16,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <img
          src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </section>
    </main>
  );
}
