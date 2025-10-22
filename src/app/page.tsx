import Link from 'next/link';

type Tile = { title:string; desc:string; href:string };
const tiles: Tile[] = [
  { title:'Řemesla', desc:'Elektrikáři, instalatéři, zedníci…', href:'/top-poskytovatel' },
  { title:'Úklid & domácnost', desc:'Pravidelný i jednorázový úklid', href:'/top-poskytovatel' },
  { title:'Zahrada & exteriér', desc:'Údržba, sekání, stromy', href:'/top-poskytovatel' },
  { title:'Beauty & PMU', desc:'Obočí, rty, linky, kurzy', href:'/top-poskytovatel' },
  { title:'Foto / Video / Audio', desc:'Fotografové, střih, zvuk', href:'/top-poskytovatel' },
  { title:'Události / Svatby', desc:'Výzdoba, koordinace, catering', href:'/top-poskytovatel' },
  { title:'Hlídání dětí & psi', desc:'Chůvy, doučování, venčení', href:'/top-poskytovatel' },
  { title:'Digitální služby', desc:'Weby, grafika, AI, marketing', href:'/top-poskytovatel' },
];

export default function HomePage(){
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <h1>Najdeme ti ověřené poskytovatele. Rychle a bez starostí.</h1>
        <p>Popiš, co potřebuješ. My rozešleme poptávku ověřeným profíkům a ty si vybereš nejlepší nabídku.</p>
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:2}}>
          <Link href="/vytvoreni-poptavky" className="btn btn-primary">Zadat poptávku</Link>
          <Link href="/provider" className="btn btn-ghost">Jsem poskytovatel</Link>
        </div>
        <div className="badges">
          <span>✔ Ověření poskytovatelé</span>
          <span>✔ Férový pay-per-lead</span>
          <span>✔ Rychlá komunikace</span>
        </div>
      </section>

      {/* Tiles */}
      <section style={{marginTop:18}}>
        <div className="grid-tiles">
          {tiles.map((t,i)=>(
            <Link key={i} href={t.href} className="card" style={{padding:16,textDecoration:'none',color:'inherit'}}>
              <div style={{fontWeight:700,marginBottom:6}}>{t.title}</div>
              <div style={{color:'var(--pindo-muted)'}}>{t.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feedback panel – tvoje trvalé pravidlo */}
      <section style={{marginTop:22}}>
        <img
          src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
          alt="Feedback"
          style={{width:'100%',borderRadius:'16px',border:'1px solid var(--pindo-border)'}}
        />
      </section>
    </>
  )
}
