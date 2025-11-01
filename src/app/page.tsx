// src/app/page.tsx
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import FeedbackPanel from "@/components/FeedbackPanel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F5F6]">
      {/* HERO / CTA nahoře */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="rounded-3xl bg-[#F2F5FA] px-6 py-8 md:py-10">
            <h1 className="text-2xl md:text-[28px] font-bold text-slate-900 mb-2">
              Nechce se ti hledat? Zadej poptávku.
            </h1>
            <p className="text-slate-600 mb-5 max-w-2xl">
              Jedno zadání → více nabídek. Oslovíme prověřené profíky ve tvém okolí.
            </p>
            <Link
              href="/vytvoreni-poptavky"
              className="inline-flex items-center gap-2 rounded-xl bg-[#F5B301] hover:bg-[#e0a100] text-slate-900 font-semibold px-5 py-2.5 text-sm transition"
            >
              Zadat poptávku
            </Link>
          </div>
        </div>
      </section>

      {/* HLAVNÍ KATEGORIE – tohle je to důležité */}
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-5">
          Kategorie
        </h2>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategorie/${cat.slug}`}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition p-5 flex flex-col gap-2"
            >
              <span className="text-slate-900 font-semibold text-base">
                {cat.title}
              </span>
              <span className="text-xs text-slate-500">
                {Array.isArray(cat.subcategories)
                  ? `${cat.subcategories.length} podkategorií`
                  : "Podkategorie se připravují"}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <FeedbackPanel />
        </div>
      </section>
    </main>
  );
}
