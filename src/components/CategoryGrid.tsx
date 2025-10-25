"use client";

export default function CategoryGrid() {
  const categories = [
    { title: "Domácnost & úklid", desc: "Pravidelný a jednorázový úklid" },
    { title: "Řemesla & stavební práce", desc: "Elektrikáři, instalatéři, zedníci…" },
    { title: "Zahrada & exteriér", desc: "Údržba, sekání, stromy" },
    { title: "Krása & PMU", desc: "Obočí, rty, linky, kurzy" },
    { title: "Zdraví & wellness", desc: "Masáže, fyzio, výživa" },
    { title: "Péče o seniory", desc: "Osobní asistence, doprovod" },
    { title: "Péče o děti", desc: "Chůvy, doučování, hlídání" },
    { title: "Péče o zvířata", desc: "Venčení, hlídání, výcvik" },
    { title: "Auto, moto & doprava", desc: "Přeprava, servis, odtahy" },
    { title: "Události & svatby", desc: "Výzdoba, koordinace, catering" },
    { title: "Foto, video & audio", desc: "Fotografové, střih, zvuk" },
    { title: "IT & digitální tvorba", desc: "Weby, grafika, AI, marketing" },
    { title: "Podnikání & administrativa", desc: "Účetnictví, právní služby" },
    { title: "Učení, hobby & volný čas", desc: "Kurzy, lekce, vzdělávání" },
    { title: "Nouzové výjezdy", desc: "Pohotovostní zásahy" },
  ];

  return (
    <section className="categories">
      <div className="container">
        <div className="tiles-grid">
          {categories.map((cat, i) => (
            <a key={i} href="#" className="tile">
              <div className="tile-ico" />
              <div className="tile-title">{cat.title}</div>
              <div className="tile-sub">{cat.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
