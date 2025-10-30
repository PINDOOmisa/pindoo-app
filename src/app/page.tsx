// src/app/page.tsx
import CategoryGrid from "@/components/CategoryGrid";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      {/* HERO */}
      <div className="relative w-full h-[320px] md:h-[360px] bg-slate-900 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://i.imgur.com/vnjTopk.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-16 md:pt-20">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-3xl">
            Tvůj portál pro všechny služby na jednom místě
          </h1>
          <p className="text-white/80 mb-6">
            Nechce se ti hledat? Zadej poptávku a my oslovíme profíky ve tvém okolí za tebe.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-3xl">
            <div className="flex-1 bg-white rounded-xl flex items-center px-3 py-2 gap-2">
              <input
                className="flex-1 outline-none bg-transparent text-sm"
                placeholder="Co potřebuješ řešit?"
              />
            </div>
            <div className="w-full sm:w-[180px] bg-white rounded-xl flex items-center px-3 py-2 gap-2">
              <input
                className="flex-1 outline-none bg-transparent text-sm"
                placeholder="Město / oblast"
              />
            </div>
            <button className="bg-[#0E3A8A] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#0c2f6d] transition">
              Hledat
            </button>
          </div>
        </div>
      </div>

      {/* HLAVNÍ OBSAH */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Kategorie</p>
            <h2 className="text-xl font-semibold text-slate-900">
              Vyber si oblast, kterou chceš řešit
            </h2>
          </div>
        </div>

        {/* TADY NÁŠ GRID */}
        <CategoryGrid />
      </div>
    </div>
  );
}
