// src/app/kategorie/[slug]/page.tsx
import * as CatMod from "@/data/categories";
import Link from "next/link";

type Raw = any;

function extractRaw(mod: any): Raw[] {
  const candidates: any[] = [];
  if (Array.isArray(mod)) candidates.push(mod);
  if (Array.isArray(mod?.default)) candidates.push(mod.default);
  if (Array.isArray(mod?.categories)) candidates.push(mod.categories);
  if (Array.isArray(mod?.default?.categories)) candidates.push(mod.default.categories);
  if (Array.isArray(mod?.data)) candidates.push(mod.data);
  if (Array.isArray(mod?.default?.data)) candidates.push(mod.default.data);
  const found =
    candidates.find((v) => Array.isArray(v)) ||
    Object.values(mod || {}).find((v: any) => Array.isArray(v)) ||
    Object.values(mod?.default || {}).find((v: any) => Array.isArray(v)) ||
    [];
  return (found as Raw[]) || [];
}

const normTitle = (x: Raw) =>
  (x?.title ?? x?.name ?? x?.label ?? x?.CategoryName ?? x?.Title ?? "").toString().trim();

function normSlug(x: Raw, title: string) {
  const s =
    x?.slug ??
    x?.Slug ??
    x?.id ??
    x?.Id ??
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  return s.toString().trim();
}

function extractSubcats(raw: Raw): Raw[] {
  const c =
    raw?.subcategories ??
    raw?.subcategory ??
    raw?.children ??
    raw?.subs ??
    raw?.items ??
    raw?.Subcategories ??
    raw?.Children ??
    raw?.Items ??
    null;
  if (Array.isArray(c)) return c;
  if (c && typeof c === "object") return Object.values(c) as Raw[];
  return [];
}

export async function generateStaticParams() {
  const list = extractRaw(CatMod);
  return list.map((x) => {
    const title = normTitle(x);
    const slug = normSlug(x, title);
    return { slug };
  });
}

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const list = extractRaw(CatMod);
  const found = list
    .map((x) => {
      const title = normTitle(x);
      const slug = normSlug(x, title);
      return { raw: x, title, slug };
    })
    .find((c) => c.slug === params.slug);

  if (!found) {
    return (
      <main style={{ maxWidth: "1140px", margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 800, color: "#0f172a" }}>
          Kategorie nenalezena
        </h1>
        <p style={{ color: "#6b7280" }}>
          Zpět na{" "}
          <Link href="/kategorie" style={{ color: "#0E3A8A", textDecoration: "underline" }}>
            všechny kategorie
          </Link>
          .
        </p>
      </main>
    );
  }

  const subs = extractSubcats(found.raw);

  return (
    <main style={{ maxWidth: "1140px", margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ marginBottom: 8 }}>
        <Link href="/kategorie" style={{ color: "#0E3A8A", textDecoration: "underline" }}>
          ← Zpět na kategorie
        </Link>
      </div>

      <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 800, color: "#0f172a" }}>
        {found.title}
      </h1>

      <div style={{ height: 12 }} />

      {/* Grid podkategorií (ikonka nahoře + název) */}
      <div
        style={{
          background: "#f6f7fb",
          border: "1px solid rgba(226,232,240,.7)",
          borderRadius: 22,
          padding: "18px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "0 16px",
            display: "grid",
            gap: 14,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {subs.map((s: any) => {
            const t =
              (s?.title ?? s?.name ?? s?.label ?? s?.Title ?? "").toString().trim() || "Bez názvu";
            const subSlug = normSlug(s, t);
            return (
              <Link
                key={subSlug}
                href={`/kategorie/${found.slug}/${subSlug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  minHeight: 110,
                  padding: 16,
                  background: "#fff",
                  border: "1px solid #e6eaf2",
                  borderRadius: 14,
                  boxShadow: "0 1px 0 rgba(2,8,23,.04)",
                  color: "#0E3A8A",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #0E3A8A",
                    display: "grid",
                    placeItems: "center",
                    overflow: "hidden",
                    background: "#fff",
                  }}
                >
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      border: "2px solid #0E3A8A",
                      opacity: 0.3,
                    }}
                  />
                </span>
                <div
                  style={{
                    fontSize: ".95rem",
                    fontWeight: 700,
                    color: "#0E3A8A",
                    textAlign: "center",
                  }}
                >
                  {t}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
