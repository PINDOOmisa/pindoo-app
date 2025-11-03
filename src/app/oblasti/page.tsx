// src/app/oblasti/page.tsx
import Link from "next/link";
import CategoryGrid from "@/components/CategoryGrid";
import FeedbackPanel from "@/components/FeedbackPanel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function OblastiPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-slate-500 mb-4 flex gap-2 items-center">
        <Link href="/" className="text-pindo-blue font-semibold">
          Domů
        </Link>
        <span>/</span>
        <span className="text-slate-400">Oblasti</span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">Kategorie</h1>
      <p className="text-slate-600 mb-6">
        Vyber si oblast, kterou potřebuješ. Podle toho ti pak najdeme poskytovatele.
      </p>

      <CategoryGrid />

      <FeedbackPanel />
    </main>
  );
}
