"use client";

export default function HeroSearch() {
  // video z Imgur
  const VIDEO_URL = "https://i.imgur.com/vnjTopk.mp4";

  return (
    <section className="hero">
      {/* full-bleed wrapper (100vw) */}
      <div className="hero-bleed">
        <div className="hero-wrap">
          {/* video pozadí */}
          <div className="hero-media">
            <video
              src={VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/hero-poster.jpg"
            />
            <div className="hero-overlay" />
          </div>

          {/* obsah – vycentrovaný na šířku containeru */}
          <div className="hero-card">
            <div className="hero-inner">
              <h1>Tvůj portál pro všechny služby na jednom místě</h1>

              <div className="search-row">
                <input className="search-input" placeholder="Co potřebuješ řešit?" />
                <input className="search-input search-loc" placeholder="Město / oblast" />
                <button className="search-btn">Hledat</button>
              </div>

              {/* přesunuto NAD tlačítko */}
              <p className="hero-note">
                Nechce se ti hledat? Zadej poptávku a my oslovíme profíky ve tvém okolí za tebe.
              </p>

              {/* jen jedno CTA */}
              <div className="cta-row">
                <a href="/vytvoreni-poptavky" className="btn btn-accent">Zadat poptávku</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
