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
      {/* HERO s pozadím jako na Kreezalidu (můžeš vyměnit URL fotky níže) */}
      <section className="hero-wrap card" style={{padding:0}}>
        <div className="hero-bg" style={{backgroundImage:
          'url(https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=2000&auto=format&fit=crop)'
        }} />
        <div className="hero">
          <h1>Tvůj portál pro všechny služby na jednom místě</h1>
          <p>Nechce se ti hledat? Zadej poptávku a my oslovíme profíky ve tvém okolí za tebe.</p>

          <div className="search-row">
            <input className="search-input" placeholder="Co potřebuješ řešit?" />
            <input className="search-input" placeholder="Město" />
            <button className="search-btn">Hledat</button>
          </div>

          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:14}}>
            <Link href="/vytvoreni-poptavky" className="btn btn-accent">Zadat poptávku</Link>
            <Link href="/provider" className="btn btn-primary">Vložit svou nabídku</Link>
          </div>
        </div>
      </section>

      {/* Dlaždice */}
      <section style={{marginTop:22}}>
        <div className="grid-tiles">
          {tiles.map((t,i)=>(
            <Link key={i} href={t.href} className="tile" style={{textDecoration:'none',color:'inherit'}}>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* žluté „sticky“ CTA jako na Kreezalidu – zde v rámci stránky */}
      <section style={{marginTop:22, display:'flex', justifyContent:'flex-end'}}>
        <Link href="/vytvoreni-poptavky" className="btn btn-accent">Zadat poptávku</Link>
      </section>

      {/* Feedback panel – tvoje pravidlo */}
      <section style={{marginTop:18}}>
        <img
          src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
          alt="Feedback"
          style={{width:'100%',borderRadius:'16px',border:'1px solid var(--pindo-border)'}}
        />
      </section>
    </>
  )
}
