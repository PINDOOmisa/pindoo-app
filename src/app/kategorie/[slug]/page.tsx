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

// malý helper – v tvém CSV jsou názvy konzistentní, ale pojďme být tolerantní
function normalizeSlug(v: string | null | undefined): string {
  return (v || "").trim().toLowerCase();
}

export default function CategoryDetailPage({ params }: PageProps) {
  const wanted = normalizeSlug(params.slug);

  // 1) najdi kategorii podle slugu
  const category =
    CATEGORIES.find((cat) => normalizeSlug(cat.slug) === wanted) || null;

  // 2) když kategorie není → ukaž “nenalezena”
  if (!category) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-sm text-slate-500 mb-4">
          <Link href="/" className="text-pindo-blue font-semibold">
            Domů
          </Link>{" "}
          / Kategorie
        </p>
        <h1 className="text-3xl font-bold mb-3">Kategorie nenalezena</h1>
        <p className="text-slate-600">
          Zkus se vrátit na výpis kategorií a vybrat jinou oblast.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex px-4 py-2 rounded-lg bg-pindo-blue text-white font-semibold"
          >
            Zpět na hlavní stránku
          </Link>
        </div>
        <FeedbackPanel />
      </main>
    );
  }

  // 3) máme kategorii → vytáhni podkategorie (může být i prázdné pole)
  const subcats = Array.isArray(category.subcategories)
    ? category.subcategories
    : [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* breadcrumb */}
      <div className="text-sm text-slate-500 mb-5 flex gap-2 items-center">
        <Link href="/" className="text-pindo-blue font-semibold">
          Domů
        </Link>
        <span>/</span>
        <span className="text-slate-400">Kategorie</span>
        <span>/</span>
        <span className="font-semibold text-slate-700">
          {category.title || category.subtitle || "Kategorie"}
        </span>
      </div>

      {/* hlavička kategorie */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {category.title || category.subtitle}
        </h1>
        <p className="text-slate-600">
          Vyber si z podkategorií v této oblasti.
        </p>
      </header>

      {/* vlastní mřížka podkategorií */}
      <SubcategoryGrid
        title="Podkategorie"
        description="Zvol přesněji, co potřebuješ. Podle toho ti pak zobrazíme vhodné profíky."
        subcategories={subcats}
      />

      <FeedbackPanel />
    </main>
  );
}
