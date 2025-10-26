"use client";

import Link from "next/link";
import Image from "next/image";
import * as CatMod from "@/data/categories";

type Raw = any;
type Cat = { title: string; slug: string; description?: string; iconUrl?: string | null };

// ——— extrakce + normalizace ———
function extractRaw(mod: any): Raw[] {
  const pick =
    (Array.isArray(mod) && mod) ||
    (Array.isArray(mod?.default) && mod.default) ||
    (Array.isArray(mod?.categories) && mod.categories) ||
    (Array.isArray(mod?.default?.categories) && mod.default.categories) ||
    (Array.isArray(mod?.data) && mod.data) ||
    (Array.isArray(mod?.default?.data) && mod.default.data) ||
    Object.values(mod || {}).find((v: any) => Array.isArray(v)) ||
    Object.values(mod?.default || {}).find((v: any) => Array.isArray(v)) ||
    [];
  return (pick as Raw[]) || [];
}
const normTitle = (x: Raw) =>
  (x?.title ?? x?.name ?? x?.label ?? x?.CategoryName ?? x?.Title ?? "").toString().trim();
function normSlug(x: Raw, title: string) {
  const s =
    x?.slug ??
    x?.Slug ??
    x?.id ??
    x?.Id ??
    title.toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  return s.toString().trim();
}
function normDesc(x: Raw): string | undefined {
  const d =
    x?.description ??
    x?.desc ??
    x?.subtitle ??
    x?.subTitle ??
    x?.shortDescription ??
    x?.Subtitle ??
    x?.Description;
  return d ? d.toString().trim() : undefined;
}
const normIcon = (x: Raw) => (x?.iconUrl ?? x?.icon ?? x?.image ?? null) || null;

function normalize(raw: Raw): Cat | null {
  const title = normTitle(raw);
  if (!title) return null;
  return { title, slug: normSlug(raw, title), description: normDesc(raw), iconUrl: normIcon(raw) };
}
function dedupeKeepOrder(items: Cat[]) {
  const seen = new Set<string>(); const out: Cat[] = [];
  for (const it of items) {
    const key = (it.slug || it.title).toLowerCase();
    if (!seen.has(key)) { seen.add(key); out.push(it); }
  }
  return out;
}

export default function CategoryGrid() {
  const categories = dedupeKeepOrder(extractRaw(CatMod).map(normalize).filter(Boolean) as Cat[]);

  return (
    <section className="p-root">
      <div className="p-head">
        <h2 className="p-h2">Kategorie</h2>
        <p className="p-sub">Vyber si oblast a pojďme najít ověřené poskytovatele.</p>
      </div>

      <div className="p-shell">
        <div className="p-grid">
          {categories.map((cat) => {
            const sub = (cat.description || "").trim();
            const hideSub =
              !sub ||
              sub.toLowerCase() === cat.title.toLowerCase(); // ❌ neschovávej duplicitní podtitul
            return (
              <Link key={cat.slug} href={`/kategorie/${cat.slug}`} className="p-card">
                <div className="p-badge">
                  {cat.iconUrl ? (
                    <Image
                      src={cat.iconUrl}
                      alt={cat.title}
                      fill
                      sizes="76px"
                      style={{ objectFit: "contain", padding: 10 }}
                    />
                  ) : (
                    <span className="p-init">{cat.title.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>

                <h3 className="p-title">{cat.title}</h3>
                {!hideSub ? (
                  <p className="p-desc">{sub}</p>
                ) : (
                  <p className="p-desc muted">Zobrazit detail →</p>
                )}
              </Link>
            );
          })}
        </div>

        {/* Feedback panel */}
        <div className="p-feedback">
          <div className="p-feedback-row">
            <Image
              src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
              alt="Feedback"
              width={72}
              height={72}
              style={{ borderRadius: 12, objectFit: "cover" }}
            />
            <div className="p-feedback-text">
              <p><strong>Chybí tu nějaká kategorie nebo něco nesedí?</strong></p>
              <p>Dej nám vědět a upravíme to. Díky za zpětnou vazbu!</p>
            </div>
            <a href="mailto:hello@pindoo.cz?subject=Zpetna%20vazba%20kategorie" className="p-feedback-btn">Napsat feedback</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --blue: #0E3A8A;
          --ink: #0f172a;
          --muted: #6B7280;
          --border: #E6EAF2;
          --bg: #F6F7FB;
          --card: #fff;
          --radius: 20px;
          --shadow: 0 10px 24px rgba(14,58,138,.06), 0 2px 6px rgba(14,58,138,.05);
        }

        .p-root { width: 100%; }
        .p-head { margin-bottom: 18px; }
        .p-h2 { margin: 0 0 4px; font-size: 1.6rem; font-weight: 700; color: var(--ink); }
        .p-sub { margin: 0; color: var(--muted); }

        .p-shell {
          background: var(--bg);
          border: 1px solid rgba(226,232,240,.7);
          border-radius: 28px;
          padding: 22px;
        }

        .p-grid { display: grid; gap: 26px; grid-template-columns: 1fr; }
        @media (min-width: 640px) { .p-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 768px) { .p-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px){ .p-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1280px){ .p-grid { grid-template-columns: repeat(5, 1fr); } }

        .p-card {
          display: flex; flex-direction: column; align-items: center; text-align: center;
          gap: 10px; padding: 26px 18px 22px;
          background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
          text-decoration: none; color: inherit;
          box-shadow: 0 1px 0 rgba(2,8,23,.04);
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
          min-height: 176px;
        }
        .p-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); border-color: #dfe5f0; }

        /* větší, světlejší kruh nahoře (jako původně) */
        .p-badge {
          position: relative;
          width: 72px; height: 72px;
          border-radius: 50%;
          background: #EEF3FF;
          border: 1px solid #E3EAF8;
          overflow: hidden;
          display: grid; place-items: center;
        }
        .p-init { color: var(--blue); font-weight: 800; font-size: 1.05rem; letter-spacing: .3px; }

        .p-title { margin: 6px 0 0; font-size: 1.06rem; font-weight: 800; color: var(--ink); }
        .p-desc {
          margin: 2px 0 0; font-size: .92rem; color: var(--muted);
          max-width: 22ch;                         /* 1 řádek, krátký podtitul */
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          min-height: 1.4em;
        }
        .p-desc.muted { color: #8A94A6; }

        .p-feedback { margin-top: 18px; background: #fff; border: 1px solid var(--border); border-radius: 18px; overflow: hidden; }
        .p-feedback-row { display: flex; gap: 14px; padding: 14px; align-items: center; flex-wrap: wrap; }
        .p-feedback-text p { margin: 0; }
        .p-feedback-text p + p { color: var(--muted); }
        .p-feedback-btn {
          margin-left: auto; padding: 10px 14px; border-radius: 12px;
          background: var(--blue); color: #fff; text-decoration: none; font-weight: 600;
          transition: opacity .18s ease;
        }
        .p-feedback-btn:hover { opacity: .9; }
      `}</style>
    </section>
  );
}
