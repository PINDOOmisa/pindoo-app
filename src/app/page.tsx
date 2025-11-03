// src/app/page.tsx
import Link from "next/link";
import CategoryGrid from "@/components/CategoryGrid";
import FeedbackPanel from "@/components/FeedbackPanel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F5F6]">
      {/* HERO */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-[#F2F5FA] rounded-3xl p-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Nechce se ti hledat? Zadej poptávku.
            </h1>
            <p className="text-slate-600 mb-4 max-w-[480px]">
              Jedno zadání → více nabídek. Oslovíme prověřené profíky ve tvém okolí.
            </p>
            <Link
              href="/vytvoreni-poptavky"
              className="inline-flex items-center gap-2 bg-[#F5B301] text-slate-900 px-4 py-2 rounded-xl font-semibold"
            >
              Zadat poptávku
            </Link>
          </div>
        </div>
      </section>

      {/* KATEGORIE */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-5">Kategorie</h2>

        <CategoryGrid />

        <FeedbackPanel />
      </section>
    </main>
  );
}
