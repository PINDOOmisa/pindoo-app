// src/app/page.tsx
import CategoryGrid from "@/components/CategoryGrid";
import FeedbackPanel from "@/components/FeedbackPanel";

export default function HomePage() {
  return (
    <main>
      {/* hero */}
      <section className="relative w-full bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-8">
          <div className="bg-slate-900/70 rounded-2xl overflow-hidden relative h-72 md:h-72">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="https://i.imgur.com/vnjTopk.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/20" />
            <div className="relative z-10 p-6 md:p-10 max-w-xl text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Tvůj portál pro všechny služby na jednom místě
              </h1>
              <p className="text-slate-100/90 mb-5">
                Nechce se ti hledat? Zadej poptávku a my oslovíme profíky ve tvém okolí.
              </p>
              {/* search bar */}
              <form className="flex flex-col md:flex-row gap-3 bg-white/95 rounded-xl p-2">
                <input
                  className="flex-1 rounded-lg px-3 py-2 text-slate-700 text-sm outline-none"
                  placeholder="Co potřebuješ řešit?"
                />
                <input
                  className="w-full md:w-52 rounded-lg px-3 py-2 text-slate-700 text-sm outline-none"
                  placeholder="Město / oblast"
                />
                <button
                  type="submit"
                  className="bg-[#0E3A8A] text-white px-5 py-2 rounded-lg text-sm font-semibold"
                >
                  Hledat
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* categories */}
      <CategoryGrid />

      {/* feedback panel */}
      <FeedbackPanel />
    </main>
  );
}
