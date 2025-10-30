// src/app/kategorie/page.tsx
import CategoryGrid from "@/components/CategoryGrid";

export const dynamic = "force-dynamic";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            Kategorie
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Všechny kategorie
          </h1>
        </div>

        <CategoryGrid />
      </div>
    </div>
  );
}
