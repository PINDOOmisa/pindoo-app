"use client";

import Link from "next/link";
import Image from "next/image";
import * as CatMod from "@/data/categories";

type Raw = any;
type Cat = { title: string; slug: string; description?: string; iconUrl?: string | null };

// ——— extrakce dat z libovolného exportu ———
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

function normTitle(x: Raw): string {
  return (x?.title ?? x?.name ?? x?.label ?? x?.CategoryName ?? x?.Title ?? "").toString().trim();
}
function normSlug(x: Raw, title: string): string {
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
function normDesc(x: Raw): string | undefined {
  const d = x?.description ?? x?.desc ?? x?.shortDescription ?? x?.Subtitle ?? x?.Description;
  return d ? d.toString() : undefined;
}
function normIcon(x: Raw): string | null {
  return (x?.iconUrl ?? x?.icon ?? x?.image ?? null) || null;
}
function normalize(raw: Raw): Cat | null {
  const title = normTitle(raw);
  if (!title) return null;
  const slug = normSlug(raw, title);
  return { title, slug, description: normDesc(raw), iconUrl: normIcon(raw) };
}
function dedupeKeepOrder(items: Cat[]): Cat[] {
  const seen = new Set<string>(); const out: Cat[] = [];
  for (const it of items) {
    const key = (it.slug || it.title).toLowerCase();
    if (!seen.has(key)) { seen.add(key); out.push(it); }
  }
  return out;
}

export default function CategoryGrid() {
  const raw = extractRaw(CatMod);
  const normalized = raw.map(normalize).filter(Boolean) as Cat[];
  const categories = dedupeKeepOrder(normalized);

  return (
    <section className="section">
      <div className="head">
        <h2 className="h2">Kategorie</h2>
        <p className="sub">Vyber si oblast a pojďme najít ověřené poskytovatele.</p>
      </div>

      <div className="grid">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/kategorie/${cat.slug}`} className="card">
            <div className="cardBody">
              <div className="iconBox">
                {cat.iconUrl ? (
                  <Image
                    src={cat.iconUrl}
                    alt={cat.title}
                    fill
                    sizes="56px"
                    style={{ objectFit: "contain", padding: 8 }}
                  />
                ) : (
                  <span className="iconInitials">{cat.title.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <h3 className="title">{cat.title}</h3>
                {cat.description ? (
                  <p className="desc">{cat.description}</p>
                ) : (
                  <p className="ctaHint">Zobrazit detail →</p>
                )}
              </div>
            </div>
            <div className="progressWrap">
              <div className="progress"><div className="progressInner" /></div>
            </div>
          </Link>
        ))}

        {/* Feedback panel */}
        <div className="colFull">
          <div className="feedback">
            <div className="feedbackRow">
              <Image
                src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
                alt="Feedback"
                width={80}
                height={80}
                style={{ borderRadius: 12, objectFit: "cover" }}
              />
              <div className="feedbackText">
                <p><strong>Chybí tu nějaká kategorie nebo něco nesedí?</strong></p>
                <p className="sub">Dej nám vědět a upravíme to. Díky za zpětnou vazbu!</p>
              </div>
              <a
                href="mailto:hello@pindoo.cz?subject=Zpetna%20vazba%20kategorie"
                className="feedbackBtn"
              >Napsat feedback</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footerPad" />

      <style jsx>{`
        :root {
          --pindo-primary: #0e3a8a;
          --card-bg: #fff;
          --card-border: #e5e7eb;
          --muted: #64748b;
          --text: #0f172a;
          --ink-weak: #e7eef9;
          --shadow: 0 10px 24px rgba(14,58,138,.06), 0 2px 6px rgba(14,58,138,.05);
        }
        .section { width: 100%; }
        .head { margin-bottom: 1.5rem; }
        .h2 { font-size: 1.5rem; font-weight: 600; color: var(--text); margin: 0 0 .25rem; }
        .sub { color: var(--muted); margin: 0; }

        .grid { display: grid; gap: 20px; grid-template-columns: 1fr; }
        @media (min-width: 640px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px){ .grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1280px){ .grid { grid-template-columns: repeat(5, 1fr); } }

        .card {
          display: block;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          box-shadow: 0 1px 0 rgba(2,8,23,.04);
          text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease;
          color: inherit;
        }
        .card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }

        .cardBody { display: flex; gap: 16px; padding: 20px; align-items: flex-start; }
        .iconBox {
          position: relative; width: 56px; height: 56px; border-radius: 16px;
          border: 1px solid var(--card-border); background: var(--ink-weak);
          display: grid; place-items: center; overflow: hidden; flex: 0 0 auto;
        }
        .iconInitials { color: var(--pindo-primary); font-weight: 600; font-size: 1.1rem; }
        .title { font-weight: 600; color: var(--text); margin: 0; font-size: 1.05rem; line-height: 1.2; }
        .desc { margin: .35rem 0 0; color: var(--muted); font-size: .9rem;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .ctaHint { margin: .35rem 0 0; color: #6b7280; font-size: .9rem; }

        .progressWrap { padding: 0 20px 16px; }
        .progress { width: 100%; height: 8px; background: #f1f5f9; border-radius: 999px; overflow: hidden; }
        .progressInner { width: 0; height: 100%; background: var(--pindo-primary); transition: width .5s ease; }
        .card:hover .progressInner { width: 100%; }

        .colFull { grid-column: 1 / -1; }
        .feedback { margin-top: 8px; background: #fff; border: 1px solid var(--card-border); border-radius: 16px; overflow: hidden; }
        .feedbackRow { display: flex; gap: 16px; padding: 16px; align-items: center; flex-wrap: wrap; }
        .feedbackText p { margin: 0; }
        .feedbackBtn {
          margin-left: auto; display: inline-flex; align-items: center; justify-content: center;
          padding: 10px 14px; border-radius: 12px; background: var(--pindo-primary);
          color: #fff; font-weight: 500; text-decoration: none; transition: opacity .2s ease;
        }
        .feedbackBtn:hover { opacity: .9; }

        .footerPad { margin-top: 24px; border-radius: 24px; background: #f8fafc; border: 1px solid rgba(226,232,240,.7); padding: 12px; }
      `}</style>
    </section>
  );
}
