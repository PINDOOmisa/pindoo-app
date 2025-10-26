// server component – bez "use client", bez styled-jsx
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

// pokusíme se najít obrázek v běžných polích
function getImageUrl(x: Raw): string | null {
  return (
    x?.image ??
    x?.img ??
    x?.photo ??
    x?.thumbnailUrl ??
    x?.thumb ??
    x?.cover ??
    x?.coverImage ??
    x?.iconUrl ??
    x?.icon ??
    null
  ) || null;
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

      {/* Grid podkategorií: horní modrý proužek s názvem + fotka pod ním přes celou dlaždici */}
      <div className="scg-wrap">
        <div className="scg-grid">
          {subs.map((s: any) => {
            const t =
              (s?.title ?? s?.name ?? s?.label ?? s?.Title ?? "").toString().trim() || "Bez názvu";
            const subSlug = normSlug(s, t);
            const img = getImageUrl(s);
            return (
              <Link key={subSlug} href={`/kategorie/${found.slug}/${subSlug}`} className="scg-card">
                <div className="scg-head">{t}</div>
                {img ? (
                  <img src={img} alt="" className="scg-img" />
                ) : (
                  <div className="scg-img scg-img--placeholder" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Globální CSS (bez styled-jsx), unikátní prefix .scg- */}
      <style>{`
        .scg-wrap {
          background: #f6f7fb;
          border: 1px solid rgba(226,232,240,.7);
          border-radius: 24px;
          padding: 18px 0;
        }
        .scg-grid {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 16px 6px;
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) { .scg-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px){ .scg-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1280px){ .scg-grid { grid-template-columns: repeat(5, 1fr); } }

        .scg-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #e6eaf2;
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 1px 0 rgba(2,8,23,.04);
          transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease;
        }
        .scg-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(14,58,138,.06), 0 2px 6px rgba(14,58,138,.05);
          border-color: #dfe5f0;
        }

        .scg-head {
          background: #0E3A8A;
          color: #fff;
          font-weight: 800;
          font-size: 0.98rem;
          line-height: 1.2;
          padding: 12px 14px;
          text-align: center;
        }

        .scg-img {
          width: 100%;
          height: 160px;             /* výšku můžeš doladit */
          object-fit: cover;
          display: block;
          filter: saturate(1) contrast(1);
        }
        .scg-img--placeholder {
          background: linear-gradient(0deg, #eef2ff, #f8fafc);
        }
      `}</style>
    </main>
  );
}
