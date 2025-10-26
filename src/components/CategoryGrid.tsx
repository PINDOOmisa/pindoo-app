"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import * as CatMod from "@/data/categories";

type Raw = any;
type Cat = { title: string; slug: string; description?: string; iconUrl?: string | null };

// ---- extrakce dat z libovolného exportu ----
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
  const seen = new Set<string>();
  const out: Cat[] = [];
  for (const it of items) {
    const key = (it.slug || it.title).toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(it);
    }
  }
  return out;
}

export default function CategoryGrid() {
  const raw = extractRaw(CatMod);
  const normalized = raw.map(normalize).filter(Boolean) as Cat[];
  const categories = dedupeKeepOrder(normalized);

  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Kategorie</h2>
        <p className="text-slate-600">Vyber si oblast a pojďme najít ověřené poskytovatele.</p>
      </div>

      <div
        className={clsx(
          "grid gap-4 sm:gap-5",
          // zjednodušené breakpointy – Tailwind default (bez xs:)
          "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        )}
      >
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kategorie/${cat.slug}`}
            className={clsx(
              "block", // <<< DŮLEŽITÉ: odkaz je block → nerozpadá se layout
              "relative rounded-2xl bg-white border border-slate-200 shadow-sm",
              "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E3A8A]"
            )}
          >
            <div className="p-5 flex items-start gap-4">
              <div
                className={clsx(
                  "relative shrink-0 rounded-2xl border border-slate-200 bg-[#E7EEF9]",
                  "w-12 h-12 md:w-14 md:h-14 grid place-items-center overflow-hidden"
                )}
              >
                {cat.iconUrl ? (
                  <Image
                    src={cat.iconUrl}
                    alt={cat.title}
                    fill
                    sizes="56px"
                    className="object-contain p-2"
                  />
                ) : (
                  <span className="text-[#0E3A8A] font-semibold text-lg">
                    {cat.title.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-base md:text-lg font-semibold text-slate-900 leading-tight">
                  {cat.title}
                </h3>
                {cat.description ? (
                  <p className="text-sm text-slate-600 line-clamp-2 mt-1">{cat.description}</p>
                ) : (
                  <p className="text-sm text-slate-500 mt-1">Zobrazit detail &rarr;</p>
                )}
              </div>
            </div>
            <div className="px-5 pb-4">
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-0 group-hover:w-full bg-[#0E3A8A] transition-all duration-500" />
              </div>
            </div>
          </Link>
        ))}

        {/* Feedback panel */}
        <div className="col-span-full">
          <div className="mt-2 rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-4 p-4">
              <Image
                src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
                alt="Feedback"
                width={80}
                height={80}
                className="rounded-xl object-cover"
              />
              <div className="text-center md:text-left">
                <p className="text-slate-800 font-medium">Chybí tu nějaká kategorie nebo něco nesedí?</p>
                <p className="text-slate-600 text-sm">Dej nám vědět a upravíme to. Díky za zpětnou vazbu!</p>
              </div>
              <div className="md:ml-auto">
                <a
                  href="mailto:hello@pindoo.cz?subject=Zpetna%20vazba%20kategorie"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#0E3A8A] text-white font-medium hover:opacity-90 transition"
                >
                  Napsat feedback
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* šedé podbarvení bloku */}
      <div className="mt-6 rounded-3xl bg-slate-50 border border-slate-200/70 p-3" />
    </section>
  );
}
