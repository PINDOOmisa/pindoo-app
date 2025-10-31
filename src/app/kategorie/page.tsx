// src/app/kategorie/[slug]/page.tsx
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import SubcategoryGrid from "@/components/SubcategoryGrid";
import FeedbackPanel from "@/components/FeedbackPanel";

type PageProps = {
  params: {
    slug: string;
  };
};

// vezmeme string a uděláme z něj “url-safe” verzi
function norm(v: string | null | undefined): string {
  return (v || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .replace(/&/g, "a")
    .replace(/[^a-z0-9-]/g, "");
}

// z kategorie zkusíme vytáhnout všechny možné slugy
function getPossibleSlugs(cat: any): string[] {
  if (!cat) return [];
  const candidates = [
    cat.slug,
    cat.Slug,
    cat.SLUG,
    cat.key,
    cat.id,
    cat.handle,
    cat.path,
    cat.Title,
    cat.title,
    cat.name,
    cat.label,
  ];
  return candidates
    .filter(Boolean)
    .map((x) => norm(x))
    .filter((x) => x.length > 0);
}

export default function CategoryDetailPage({ params }: PageProps) {
  const wanted = norm(params.slug);

  // 1) najdi kategorii – projdeme všechny a koukneme, jestli některý z jejich možných slugů se rovná tomu z URL
  const category =
    CATEGORIES.find((cat: any) => {
      const slugs = getPossibleSlugs(cat);
      return slugs.includes(wanted);
    }) || null;

  // 2) když nenašlo → ukaž “nenalezena”, ale aspoň s naším ptáčkem 🙂
  if (!category) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-sm text-slate-500 mb-4 flex gap-2 items-center">
          <Link href="/" className="text-pindo-blue font-semibold">
            Domů
          </Link>
          <span>/</span>
          <span>Kategorie</span>
        </p>
        <h1 className="text-3xl font-bold mb-3">Kategorie nenalezena</h1>
        <p className="text-slate-600 mb-4">
          Zkus se vrátit na výpis kategorií a vybrat jinou oblast.
        </p>
        <Link
          href="/"
          className="inline-flex px-4 py-2 rounded-lg bg-pindo-blue text-white font-semibold"
        >
          Zpět na hlavní stránku
        </Link>

        <FeedbackPanel />
      </main>
    );
  }

  // 3) máme kategorii → vezmeme její podkategorie (nebo prázdný seznam)
  const subcats = Array.isArray((category as any).subcategories)
    ? (category as any).subcategories
    : [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* breadcrumb */}
      <div className="text-sm text-slate-500 mb-5 flex gap-2 items-center">
        <Link href="/" className="text-pindo-blue font-semibold">
          Domů
        </Link>
        <span>/</span>
        <Link href="/kategorie" className="text-slate-400">
          Kategorie
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-700">
          {category.title ||
            category.Title ||
            category.name ||
            category.label ||
            "Kategorie"}
        </span>
      </div>

      {/* hlavička */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {category.title ||
            category.Title ||
            category.name ||
            category.label ||
            "Kategorie"}
        </h1>
        <p className="text-slate-600">
          Vyber si z podkategorií v této oblasti.
        </p>
      </header>

      {/* samotné dlaždice podkategorií */}
      <SubcategoryGrid
        title="Podkategorie"
        description="Zvol přesněji, co potřebuješ. Podle toho ti pak zobrazíme vhodné profíky."
        subcategories={subcats}
      />

      <FeedbackPanel />
    </main>
  );
}
