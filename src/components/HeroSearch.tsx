"use client";

export default function HeroSearch() {
  return (
    <section className="hero">
      {/* Pozadí: video je volitelné – když /hero-bg.mp4 nemáš, můžeš <video> klidně smazat */}
      <div className="hero-bg">
        <video
          src="/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          Tvůj portál pro všechny služby na jednom místě
        </h1>

        {/* Vyhledávání */}
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

        {/* Žluté CTA – na střed + větší mezera pod tlačítkem */}
        <button className="request-btn">Zadat poptávku</button>
      </div>

      {/* STYLY */}
      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          background: #f7f7f9;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          border-radius: 0 0 24px 24px;
        }
        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.45;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1120px;
          margin: 0 auto;
          padding: 60px 20px 40px;
          text-align: center;
          color: #fff;
        }

        /* H1 – plynule responsivní, na mobilu max. ~2 řádky */
        .hero-title {
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 24px;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.3);
          font-size: clamp(30px, 6vw, 52px);
          letter-spacing: -0.2px;
        }

        /* Vyhledávání */
        .hero-search {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin: 0 auto 18px;
          max-width: 860px;
        }
        .field {
          height: 56px;
          font-size: 18px;
          border-radius: 16px;
          padding: 0 18px;
          border: 1px solid #e5e7eb;
          outline: none;
          flex: 1 1 240px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          background: #fff;
          color: #111827;
        }
        .field::placeholder {
          color: #6b7280;
        }
        .field.area {
          flex: 0 1 220px;
        }
        .search-btn {
          height: 56px;
          font-size: 18px;
          font-weight: 700;
          border: none;
          border-radius: 16px;
          padding: 0 24px;
          background: #1f2940;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 6px 14px rgba(31, 41, 64, 0.18);
        }

        .hero-sub {
          font-size: 17px;
          margin: 10px 0 18px;
          color: #f3f4f6;
        }

        /* Žluté CTA – střed + víc vzduchu pod tlačítkem */
        .request-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 22px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 18px;
          color: #0f172a;
          background: #fbbf24;
          box-shadow: 0 8px 18px rgba(251, 191, 36, 0.25);
          border: none;
          cursor: pointer;
          margin: 10px auto 32px;
        }

        /* Mobil */
        @media (max-width: 640px) {
          .hero-content {
            padding: 48px 16px 28px;
          }
          .field {
            height: 50px;
            font-size: 16px;
            flex: 1 1 100%;
          }
          .field.area {
            flex-basis: 100%;
          }
          .search-btn {
            width: 100%;
            height: 50px;
            font-size: 16px;
          }
          .request-btn {
            font-size: 17px;
            padding: 11px 18px;
            border-radius: 16px;
            margin: 14px auto 40px;
          }
        }
      `}</style>
    </section>
  );
}
