"use client";

const VIDEO_URL = "/hero.mp4"; // může být i externí MP4

export default function HeroSearch() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-wrap">
          {/* video pozadí */}
          <div className="hero-media">
            <video
              src={https://i.imgur.com/vnjTopk.mp4}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/hero-poster.jpg" // volitelné
            />
            <div className="hero-overlay" />
          </div>

          {/* obsah */}
          <div className="hero-card">
            <h1>Tvůj portál pro všechny služby na jednom místě</h1>
            <p>Nechce se ti hledat? Zadej poptávku a my oslovíme profíky ve tvém okolí za tebe.</p>

            <div className="search-row">
              <input className="search-input" placeholder="Co potřebuješ řešit?" />
              <input className="search-input search-loc" placeholder="Město / oblast" />
              <button className="search-btn">Hledat</button>
            </div>

            <div className="cta-row">
              <a href="/vytvoreni-poptavky" className="btn btn-accent">Zadat poptávku</a>
              <a href="/provider" className="btn btn-primary">Vložit svou nabídku</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
