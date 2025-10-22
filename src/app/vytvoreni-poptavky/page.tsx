"use client";

import { useState } from "react";

export default function VytvoreniPoptavkyPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Tady zatím jen „jakože“ odešleme – napojení na Airtable/Make přidáme.
    setSent(true);
  }

  return (
    <main style={{maxWidth:860, margin:"0 auto", padding:"24px 16px", fontFamily:"Inter, system-ui", color:"#0f1e46"}}>
      <h1 style={{fontSize:28, fontWeight:800, margin:"0 0 6px"}}>Zadat poptávku</h1>
      <p style={{color:"#6a7793", margin:"0 0 16px"}}>Vyplň krátký formulář. Nabídky ti přijdou do e-mailu a do profilu.</p>

      {sent ? (
        <div style={{border:"1px solid #e8eef9", background:"#f6fbff", padding:16, borderRadius:12, boxShadow:"0 6px 18px rgba(32,67,230,.06)"}}>
          ✅ Díky! Poptávka byla odeslána. Brzy se ozvou poskytovatelé.  
          <div style={{marginTop:12}}>
            <a href="/" style={{textDecoration:"none", fontWeight:800, color:"#2043E6"}}>Zpět na homepage →</a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{display:"grid", gap:12, border:"1px solid #e8eef9", borderRadius:16, padding:16}}>
          <label style={{display:"grid", gap:6}}>
            <span>Kategorie</span>
            <select required style={{padding:10, borderRadius:10, border:"1px solid #dbe4f3"}}>
              <option value="">Vyberte…</option>
              <option>Úklid</option>
              <option>Řemesla</option>
              <option>Zdraví & wellness</option>
              <option>Péče o děti</option>
            </select>
          </label>

          <label style={{display:"grid", gap:6}}>
            <span>Popis požadavku</span>
            <textarea required rows={5} placeholder="Co přesně potřebujete, termín, rozměry…"
                      style={{padding:10, borderRadius:10, border:"1px solid #dbe4f3"}} />
          </label>

          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:10}}>
            <label style={{display:"grid", gap:6}}>
              <span>Město / lokalita</span>
              <input required placeholder="Praha 5…" style={{padding:10, borderRadius:10, border:"1px solid #dbe4f3"}} />
            </label>
            <label style={{display:"grid", gap:6}}>
              <span>Preferovaný termín</span>
              <input type="date" style={{padding:10, borderRadius:10, border:"1px solid #dbe4f3"}} />
            </label>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:10}}>
            <label style={{display:"grid", gap:6}}>
              <span>Jméno</span>
              <input required style={{padding:10, borderRadius:10, border:"1px solid #dbe4f3"}} />
            </label>
            <label style={{display:"grid", gap:6}}>
              <span>E-mail pro odpovědi</span>
              <input type="email" required style={{padding:10, borderRadius:10, border:"1px solid #dbe4f3"}} />
            </label>
          </div>

          {/* Místo pro nahrání fotek – zapojíme později */}
          <div style={{border:"1px dashed #dbe4f3", borderRadius:12, padding:12, textAlign:"center", color:"#6a7793"}}>
            📷 Prostor pro fotky / přílohy (doplníme)
          </div>

          <button type="submit" style={{background:"#2043E6", color:"#fff", fontWeight:800, padding:"12px 16px", borderRadius:12, border:"none"}}>
            Odeslat poptávku
          </button>
        </form>
      )}
    </main>
  );
}
