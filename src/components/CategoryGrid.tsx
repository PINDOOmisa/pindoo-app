"use client";

import Link from "next/link";
import Image from "next/image";
import * as CatMod from "@/data/categories";

type Raw = any;
type Cat = { title: string; slug: string; description?: string; iconUrl?: string | null };

// === bezpečná extrakce dat z libovolného exportu ===
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
  const categories = dedupeKeepOrder(raw.map(normalize).filter(Boolean) as Cat[]);

  return (
    <section className="pindoRoot">
      <div className="pindoHead">
        <h2 className="pindoH2">Kategorie</h2>
        <p className="pindoSub">Vyber si oblast a pojďme najít ověřené poskytovatele.</p>
      </div>

      <div className="pindoWrap">
        <div className="pindoGrid">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/kategorie/${cat.slug}`} className="pindoCard">
              <div className="pindoIcon">
                {cat.iconUrl ? (
                  <Image
                    src={cat.iconUrl}
                    alt={cat.title}
                    fill
                    sizes="64px"
                    style={{ objectFit: "contain", padding: 10 }}
                  />
                ) : (
                  <span className="pindoInit">{cat.title.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <h3 className="pindoTitle">{cat.title}</h3>
              {cat.description ? (
                <p className="pindoDesc">{cat.description}</p>
              ) : (
                <p className="pindoHint">Zobrazit detail →</p>
              )}
            </Link>
          ))}
        </div>

        {/* Feedback panel */}
        <div className="pindoFeedback">
          <div className="pindoFeedbackRow">
            <Image
              src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
              alt="Feedback"
              width={80}
              height={80}
              style={{ borderRadius: 12, objectFit: "cover" }}
            />
            <div className="pindoFeedbackText">
              <p><strong>Chybí tu nějaká kategorie nebo něco nesedí?</strong></p>
              <p>Dej nám vědět a upravíme to. Díky za zpětnou vazbu!</p>
            </div>
            <a
              href="mailto:hello@pindoo.cz?subject=Zpetna%20vazba%20kategorie"
              className="pindoFeedbackBtn"
            >
              Napsat feedback
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pindoRoot { width: 100%; }
        .pindoRoot * { box-sizing: border-box; }

        .pindoHead { margin-bottom: 16px; }
        .pindoH2 { margin: 0 0 4px; font-size: 1.5rem; font-weight: 600; color: #0f172a; }
        .pindoSub { margin: 0; color: #64748b; }

        .pindoWrap {
          background: #f6f7fb;
          border: 1px solid rgba(226,232,240,.7);
          border-radius: 24px;
          padding: 20px;
        }

        .pindoGrid {
          display: grid;
          gap: 18px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) { .pindoGrid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 768px) { .pindoGrid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px){ .pindoGrid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1280px){ .pindoGrid { grid-template-columns: repeat(5, 1fr); } }

        .pindoCard {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 18px;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 1px 0 rgba(2,8,23,.04);
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .pindoCard:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(14,58,138,.06), 0 2px 6px rgba(14,58,138,.05);
          border-color: #dce2ee;
        }

        .pindoIcon {
          position: relative;
          width: 56px; height: 56px;
          border-radius: 16px;
          background: #e7eef9;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          display: grid; place-items: center;
        }
        .pindoInit { color: #0e3a8a; font-weight: 700; font-size: 1.05rem; }

        .pindoTitle { margin: 2px 0 0; font-size: 1.05rem; font-weight: 600; color: #0f172a; }
        .pindoDesc {
          margin: 4px 0 0; color: #64748b; font-size: .9rem;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          min-height: 2.6em;
        }
        .pindoHint { margin: 4px 0 0; color: #6b7280; font-size: .9rem; min-height: 2.6em; }

        .pindoFeedback {
          margin-top: 16px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
        }
        .pindoFeedbackRow {
          display: flex; gap: 16px; padding: 16px; align-items: center; flex-wrap: wrap;
        }
        .pindoFeedbackText p { margin: 0; color: #0f172a; }
        .pindoFeedbackText p + p { color: #64748b; }
        .pindoFeedbackBtn {
          margin-left: auto; display: inline-flex; align-items: center; justify-content: center;
          padding: 10px 14px; border-radius: 12px; background: #0e3a8a;
          color: #fff; font-weight: 500; text-decoration: none; transition: opacity .2s ease;
        }
        .pindoFeedbackBtn:hover { opacity: .9; }
      `}</style>
    </section>
  );
}
