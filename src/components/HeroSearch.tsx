"use client";

export default function HeroSearch() {
  return (
    <section className="hero">
      {/* POZADÍ */}
      <div className="hero-bg">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src="https://i.imgur.com/vnjTopk.mp4"
        />
        <div className="hero-overlay" />
      </div>

      {/* OBSAH */}
      <div className="hero-content">
        <h1 className="hero-title">
          Tvůj portál pro všechny služby na jednom místě
        </h1>

        <div className="hero-search">
          <input type="text" placeholder="Co potřebuješ řešit?" className="field topic" />
          <input type="text" placeholder="Město / oblast" className="field area" />
          <button className="search-btn">Hledat</button>
        </div>

        <p className="hero-sub">
          Nechce se ti hledat? Zadej poptávku a my oslovíme profíky ve tvém okolí za tebe.
        </p>

        <button className="request-btn">Zadat poptávku</button>
      </div>

      <style jsx>{`
        /* === ÚZKÝ HERO === */
        .hero{
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          background: #0f172a;
          min-height: 360px;            /* ↓ z 520 na 360 (užší) */
          margin: 12px auto 24px;
          max-width: 1200px;
        }

        .hero-bg{ position:absolute; inset:0; z-index:0; }
        .hero-video{ width:100%; height:100%; object-fit:cover; display:block; }
        .hero-overlay{
          position:absolute; inset:0; z-index:1;
          background:
            linear-gradient(180deg, rgba(0,0,0,.32) 0%, rgba(0,0,0,.26) 40%, rgba(0,0,0,.18) 100%),
            radial-gradient(60% 60% at 50% 30%, rgba(0,0,0,.18) 0%, rgba(0,0,0,0) 100%);
        }

        .hero-content{
          position: relative; z-index: 2;
          max-width: 1120px; margin: 0 auto;
          padding: 28px 20px 22px;    /* ↓ menší vnitřní mezery */
          text-align: center; color: #fff;
        }

        /* menší H1, aby se vešla elegantněji */
        .hero-title{
          font-weight: 800;
          line-height: 1.12;
          margin: 0 0 16px 0;
          text-shadow: 0 2px 12px rgba(0,0,0,.32);
          font-size: clamp(28px, 4.8vw, 44px); /* ↓ desktop max 44 */
          letter-spacing: -0.2px;
        }

        .hero-search{
          display:flex; flex-wrap:wrap; gap:10px; justify-content:center;
          margin:0 auto 14px; max-width: 900px;
        }
        .field{
          height:52px;                  /* ↓ z 56 */
          font-size:17px;
          border-radius:16px; padding:0 16px;
          border:1px solid rgba(255,255,255,.25);
          background: rgba(255,255,255,.95);
          color:#111827; outline:none;
          flex:1 1 260px;
          box-shadow: 0 2px 8px rgba(0,0,0,.10);
        }
        .field::placeholder{ color:#6b7280; }
        .field.area{ flex:0 1 220px; }
        .search-btn{
          height:52px; font-size:17px; font-weight:700;
          border:none; border-radius:16px; padding:0 22px;
          background:#1F2940; color:#fff; cursor:pointer;
          box-shadow:0 6px 16px rgba(31,41,64,.20);
        }

        .hero-sub{ font-size:16px; margin:8px 0 14px; color:#E8EBF2; }

        .request-btn{
          display:inline-flex; align-items:center; justify-content:center;
          padding:11px 20px; border-radius:16px;
          font-weight:700; font-size:17px; color:#0f172a;
          background:#fbbf24; border:none; cursor:pointer;
          box-shadow:0 10px 22px rgba(251,191,36,.28);
          margin:8px auto 6px;
        }

        /* Mobil ještě užší */
        @media (max-width: 640px){
          .hero{ min-height: 300px; margin: 10px 12px 20px; }
          .hero-content{ padding: 22px 14px 18px; }
          .field{ height:48px; font-size:16px; flex:1 1 100%; }
          .field.area{ flex-basis:100%; }
          .search-btn{ width:100%; height:48px; font-size:16px; }
          .request-btn{ font-size:16.5px; padding:10px 16px; margin:12px auto 10px; }
        }
      `}</style>
    </section>
  );
}
