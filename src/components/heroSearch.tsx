"use client";

export default function HeroSearch(){
  return (
    <section className="hero">
      <div className="container">
        <div className="card">
          <h1>Tvůj portál pro všechny služby na jednom místě</h1>
          <p>Nechce se ti hledat? Zadej poptávku a my oslovíme profíky ve tvém okolí za tebe.</p>
          <div className="search-row">
            <input className="search-input" placeholder="Co potřebuješ řešit?" />
            <input className="search-input search-loc" placeholder="Město / oblast" />
            <button className="search-btn">Hledat</button>
          </div>
          <div style={{display:"flex", gap:12, flexWrap:"wrap", marginTop:16}}>
            <a href="/vytvoreni-poptavky" className="btn btn-accent">Zadat poptávku</a>
            <a href="/provider" className="btn btn-primary">Vložit svou nabídku</a>
          </div>
        </div>
      </div>
    </section>
  );
}
