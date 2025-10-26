"use client";

export default function HeroSearch() {
  return (
    <section className="hero">
      {/* --- POZADÍ: externí video + překryv --- */}
      <div className="hero-bg">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src="https://i.imgur.com/vnjTopk.mp4"
          // volitelně: pokud chceš poster, dej do /public soubor a odkomentuj:
          // poster="/hero.jpg"
        />
        <div className="hero-overlay" />
      </div>

      {/* --- OBSAH --- */}
      <div className="hero-content">
        <h1 className="hero-title">
          Tvůj portál pro všechny služby na jednom místě
        </h1>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Co potřebuješ řešit?"
            className="field topic"
          />
          <input
            type="text"
            placeholder="Město / oblast"
            className="field area"
          />
          <button className="search-btn">Hledat</button>
        </div>

        <p className="hero-sub">
          Nechce se ti hledat? Zadej poptávku a my oslovíme profíky ve tvém okolí za tebe.
        </p>

        <button className="request-btn">Zadat poptávku</button>
      </div>

      <style jsx>{`
        /* === OBAL HERO === */
        .hero{
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          background: #0f172a;             /* fallback barva */
          min-height: 520px;                /* drží výšku i když se video nenačte */
          margin: 16px auto 28px;
          max-width: 1200px;
        }

        /* === VIDEO POZADÍ === */
        .hero-bg{ position:absolute; inset:0; z-index:0; }
        .hero-video{
          width:100%; height:100%;
          object-fit:cover;
          display:block;
        }
        .hero-overlay{
          position:absolute; inset:0; z-index:1;
          background:
            linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.30) 40%, rgba(0,0,0,.20) 100%),
            radial-gradient(60% 60% at 50% 30%, rgba(0,0,0,.20) 0%, rgba(0,0,0,0) 100%);
        }

        /* === OBSAH === */
        .hero-content{
          position: relative; z-index: 2;
          max-width: 1120px; margin: 0 auto;
          padding: 56px 20px 40px;
          text-align: center; color: #fff;
        }

        /* Nadpis – plynulé měřítko (mobil menší, desktop velký) */
        .hero-title{
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 22px 0;
          text-shadow: 0 3px 16px rgba(0,0,0,.35);
          font-size: clamp(30px, 6vw, 56px);
          letter-spacing: -0.2px;
        }

        /* Vyhledávání */
        .hero-search{
          display:flex; flex-wrap:wrap; gap:12px; justify-content:center;
          margin:0 auto 18px; max-width: 900px;
        }
        .field{
          height:56px; font-size:18px; border-radius:16px; padding:0 18px;
          border:1px solid rgba(255,255,255,.25);
          background: rgba(255,255,255,.95);
          color:#111827; outline:none;
          flex:1 1 280px;
          box-shadow: 0 2px 8px rgba(0,0,0,.10);
        }
        .field::placeholder{ color:#6b7280; }
        .field.area{ flex:0 1 240px; }
        .search-btn{
          height:56px; font-size:18px; font-weight:700;
          border:none; border-radius:16px; padding:0 24px;
          background:#1F2940; color:#fff; cursor:pointer;
          box-shadow:0 8px 18px rgba(31,41,64,.22);
        }

        .hero-sub{ font-size:17px; margin:10px 0 18px; color:#E8EBF2; }

        .request-btn{
          display:inline-flex; align-items:center; justify-content:center;
          padding:13px 22px; border-radius:16px;
          font-weight:700; font-size:18px; color:#0f172a;
          background:#fbbf24; border:none; cursor:pointer;
          box-shadow:0 10px 22px rgba(251,191,36,.28);
          margin:10px auto 8px;
        }

        /* === MOBIL === */
        @media (max-width: 640px){
          .hero{ min-height: 460px; margin: 12px 12px 22px; }
          .hero-content{ padding: 44px 16px 28px; }
          .field{ height:50px; font-size:16px; flex:1 1 100%; }
          .field.area{ flex-basis:100%; }
          .search-btn{ width:100%; height:50px; font-size:16px; }
          .request-btn{ font-size:17px; padding:11px 18px; margin:14px auto 12px; }
        }
      `}</style>
    </section>
  );
}
