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
    <section
      className="categories"
      style={{
        backgroundColor: "#F9FAFB",
        padding: "70px 0 90px",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {categories.map((cat, i) => (
            <a
              key={i}
              href="#"
              className="tile"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "150px",
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                textAlign: "center",
                padding: "20px",
                textDecoration: "none",
                color: "#0E3A8A",
                transition: "all 0.25s ease",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget.style.transform = "translateY(-4px)"),
                (e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.08)"))
              }
              onMouseOut={(e) =>
                ((e.currentTarget.style.transform = "translateY(0)"),
                (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"))
              }
            >
              {/* ikonku doplníš sem */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  marginBottom: "12px",
                  backgroundColor: "#E7EEF9",
                  borderRadius: "10px",
                }}
              ></div>

              <div style={{ fontWeight: 600, fontSize: "16px" }}>{cat.title}</div>
              <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
                {cat.desc}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
