"use client";

export default function HeroSearch() {
  // Video z Imgur (tvůj banner)
  const VIDEO_URL = "https://i.imgur.com/vnjTopk.mp4";

  return (
    <section className="hero">
      <div className="container">
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
