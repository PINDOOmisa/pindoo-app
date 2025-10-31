// src/app/kategorie/[slug]/page.tsx
import Link from "next/link";
import CATEGORIES from "@/data/categories";
import FeedbackPanel from "@/components/FeedbackPanel";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  // najdeme kategorii podle slug
  const category = Array.isArray(CATEGORIES)
    ? CATEGORIES.find((c: any) => c.slug === slug)
    : null;

  if (!category) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-3">Kategorie nenalezena</h1>
        <p className="text-slate-500 mb-4">
          Zkus se vrátit na výpis kategorií a vybrat jinou oblast.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-pindo underline underline-offset-2"
        >
          Zpět na hlavní stránku
        </Link>

        <FeedbackPanel />
      </main>
    );
  }

  const subs = Array.isArray(category.subcategories)
    ? category.subcategories
    : [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      {/* breadcrumb */}
      <div className="text-sm text-slate-400">
        <Link href="/" className="hover:text-slate-700">
          Domů
        </Link>{" "}
        /{" "}
        <span className="text-slate-500">{category.title || "Kategorie"}</span>
      </div>

      {/* nadpis */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">
          {category.title || "Kategorie"}
        </h1>
        <p className="text-slate-500">
          Vyber si z podkategorií v této oblasti.
        </p>
      </header>

      {/* grid podkategorií */}
      <section className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {subs.length > 0 ? (
          subs.map((sub: any, i: number) => (
            <Link
              key={sub.slug || i}
              href={`/kategorie/${slug}/${sub.slug || ""}`}
              className="flex flex-col gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:-translate-y-0.5 hover:shadow-md transition"
            >
              <div className="w-full h-32 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center text-slate-300 text-xs">
                Obrázek podkategorie
              </div>
              <div className="space-y-1">
                <h2 className="font-semibold text-slate-900">
                  {sub.title || "Podkategorie"}
                </h2>
                <p className="text-xs text-slate-500">
                  Sem pak dáme popis / atributy.
                </p>
              </div>
              <span className="text-sm font-medium text-pindo">Otevřít →</span>
            </Link>
          ))
        ) : (
          <p className="text-slate-400 text-sm col-span-full">
            Tahle kategorie zatím nemá podkategorie.
          </p>
        )}
      </section>

      <FeedbackPanel />
    </main>
  );
}
