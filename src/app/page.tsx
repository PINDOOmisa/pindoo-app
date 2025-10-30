// src/app/page.tsx
import CategoryGrid from "@/components/CategoryGrid";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      {/* HERO */}
      <div className="relative w-full bg-slate-900 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://i.imgur.com/vnjTopk.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* tmavé zjemnění */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-14 md:pt-20 md:pb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white max-w-3xl mb-4">
            Tvůj portál pro všechny služby na jednom místě
          </h1>
          <p className="text-white/85 mb-6 max-w-2xl">
            Nechce se ti hledat? Zadej poptávku a my oslovíme profíky ve tvém okolí za tebe.
          </p>

          {/* vyhledávání */}
          <div className="bg-white/95 backdrop-blur rounded-2xl p-3 flex flex-col md:flex-row gap-3 shadow-lg max-w-3xl">
            <input
              className="flex-1 bg-white rounded-xl px-3 py-2 outline-none text-sm text-slate-800"
              placeholder="Co potřebuješ řešit?"
            />
            <input
              className="w-full md:w-[180px] bg-white rounded-xl px-3 py-2 outline-none text-sm text-slate-800"
              placeholder="Město / oblast"
            />
            <button className="bg-[#0E3A8A] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#0c2f6d] transition">
              Hledat
            </button>
          </div>
        </div>
      </div>

      {/* HLAVNÍ OBSAH */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Kategorie</p>
            <h2 className="text-xl font-semibold text-slate-900">
              Vyber si oblast, kterou chceš řešit
            </h2>
          </div>
        </div>

        <CategoryGrid />
      </div>
    </div>
  );
}
