// src/app/kategorie/[slug]/page.tsx
import { notFound } from "next/navigation";
import { NORMALIZED_CATEGORIES } from "@/data/categories";
import FeedbackPanel from "@/components/FeedbackPanel";

type PageProps = {
  params: { slug: string };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function CategoryDetailPage({ params }: PageProps) {
  const cats = NORMALIZED_CATEGORIES || [];
  const cat = cats.find((c) => c.slug === params.slug);

  if (!cat) {
    return notFound();
  }

  const subs = cat.subcategories || [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
        Kategorie
      </p>
      <h1 className="text-3xl font-bold text-slate-900 mb-3">{cat.title}</h1>
      <p className="text-slate-500 mb-8">
        Vyber si konkrétní službu v této oblasti.
      </p>

      {subs.length === 0 ? (
        <p className="text-slate-500 text-sm">
          Tato kategorie zatím nemá podkategorie.
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subs.map((sc) => (
            <div
              key={sc.slug}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <div className="h-28 bg-gradient-to-br from-[#E7EEF9] to-white flex items-center justify-center text-[#0E3A8A] text-sm font-semibold">
                {sc.title}
              </div>
              <div className="p-4 text-slate-500 text-sm">
                Poptávka pro: {sc.title}
              </div>
            </div>
          ))}
        </div>
      )}

      <FeedbackPanel />
    </main>
  );
}
