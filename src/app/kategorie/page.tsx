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
  if (!candidates.length && mod && typeof mod === "object") {
    const vals = Object.values(mod).filter((v) => Array.isArray(v)).flat();
    if (vals.length) candidates.push(vals);
    else {
      const objVals = Object.values(mod).filter((v) => v && typeof v === "object" && !Array.isArray(v));
      if (objVals.length) candidates.push(Object.values(mod));
    }
  }
  if (!candidates.length && mod?.default && typeof mod.default === "object") {
    const vals = Object.values(mod.default).filter((v) => Array.isArray(v)).flat();
    if (vals.length) candidates.push(vals);
    else {
      const objVals = Object.values(mod.default).filter((v) => v && typeof v === "object" && !Array.isArray(v));
      if (objVals.length) candidates.push(Object.values(mod.default));
    }
  }
  return (candidates.find((c) => Array.isArray(c)) as Raw[]) || [];
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
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-semibold text-slate-900">Kategorie nenalezena</h1>
        <p className="text-slate-600 mt-2">
          Zpět na <Link href="/kategorie" className="text-[#0E3A8A] underline">všechny kategorie</Link>.
        </p>
      </main>
    );
  }

  const desc = found.raw?.description ?? found.raw?.desc ?? found.raw?.shortDescription ?? "";

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <Link href="/kategorie" className="text-sm text-[#0E3A8A] underline">← Zpět na kategorie</Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">{found.title}</h1>
      {desc ? <p className="text-slate-600 mt-3 max-w-3xl">{desc}</p> : null}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-slate-700">
          Připravujeme přehled poskytovatelů a filtrů pro „{found.title}“. 
          Zatím můžeš prozkoumat ostatní <Link href="/kategorie" className="text-[#0E3A8A] underline">kategorie</Link>.
        </p>
      </div>
    </main>
  );
}
