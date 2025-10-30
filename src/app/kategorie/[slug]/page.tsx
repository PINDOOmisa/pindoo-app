// src/app/kategorie/[slug]/page.tsx
import { CATEGORIES } from "@/data/categories";
import SubcategoryGrid from "@/components/SubcategoryGrid";
import FeedbackPanel from "@/components/FeedbackPanel";

type PageProps = {
  params: { slug: string };
};

export default function CategoryDetailPage({ params }: PageProps) {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);

  if (!cat) {
    return (
      <div className="page-shell">
        <h1>Kategorie nenalezena</h1>
        <p>Zkus se vrátit na výpis kategorií.</p>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="cat-head">
        <p className="cat-tag">Kategorie</p>
        <h1>{cat.title}</h1>
        {cat.subtitle ? <p className="cat-sub">{cat.subtitle}</p> : null}
      </header>

      <SubcategoryGrid items={cat.subcategories || []} />

      <FeedbackPanel />
    </div>
  );
}
