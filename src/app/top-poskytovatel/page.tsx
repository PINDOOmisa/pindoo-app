import Link from 'next/link';

type Card = { title: string; desc: string; href: string };

const cards: Card[] = [
  { title: 'Řemesla', desc: 'Elektrikáři, instalatéři, zedníci…', href: '#' },
  { title: 'Úklid & domácnost', desc: 'Pravidelný i jednorázový úklid, žehlení', href: '#' },
  { title: 'Zahrada & exteriér', desc: 'Údržba, sekání, stromy, zavlažování', href: '#' },
  { title: 'Beauty & PMU', desc: 'Obočí, rty, linky, kurzy', href: '#' },
  { title: 'Foto / Video / Audio', desc: 'Fotografové, kameramani, střih', href: '#' },
  { title: 'Události / Svatby', desc: 'Výzdoba, koordinace, catering', href: '#' },
  { title: 'Hlídání dětí & psi', desc: 'Chůvy, doučování, venčení', href: '#' },
  { title: 'Digitální služby', desc: 'Weby, grafika, AI, marketing', href: '#' },
];

const Tile = ({c}:{c:Card}) => (
  <Link href={c.href} style={{
    display:'block', background:'#fff', border:'1px solid #E6E6EF', borderRadius:16, padding:16,
    boxShadow:'0 10px 24px rgba(14,58,138,.05),0 2px 6px rgba(14,58,138,.06)',
    textDecoration:'none', color:'#1f2937'
  }}>
    <div style={{fontWeight:700, marginBottom:6}}>{c.title}</div>
    <div style={{color:'#6B7280'}}>{c.desc}</div>
  </Link>
);

export default function Page(){
  return (
    <>
      <h1>TOP poskytovatelé</h1>
      <p style={{color:'#374151'}}>Proklikni si hlavní oblasti. Každá karta vede na přehled ověřených poskytovatelů.</p>

      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',
        gap:16,
        marginTop:16
      }}>
        {cards.map((c,i)=>(<Tile key={i} c={c}/>))}
      </div>

      {/* Feedback panel – tvoje pravidlo */}
      <div style={{marginTop:24}}>
        <img
          src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
          alt="PINDOO feedback"
          style={{width:'100%', borderRadius:16, border:'1px solid #E6E6EF'}}
        />
      </div>

      <div style={{marginTop:20}}>
        <Link href="/vytvoreni-poptavky" style={{
          background:'#0E3A8A', color:'#fff', padding:'10px 14px', borderRadius:12, textDecoration:'none', fontWeight:600
        }}>Zadat poptávku</Link>
      </div>
    </>
  );
}
