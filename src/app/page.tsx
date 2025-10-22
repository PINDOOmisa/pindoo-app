// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Banner */}
      <section style={{background:'#fffdf6', padding:16, borderRadius:12, border:'1px solid #f7eec8', margin:'0 0 16px'}}>
        <div style={{display:'flex', flexWrap:'wrap', gap:16, alignItems:'center', justifyContent:'center', maxWidth:1000, margin:'0 auto'}}>
          <div style={{flex:'1 1 520px', color:'#6a5600', fontWeight:500, lineHeight:1.35, textAlign:'center'}}>
            Nechce se ti hledat a probírat se nabídkami? <strong>Zadej poptávku</strong> a my oslovíme profíky ve tvém okolí za tebe.
            <span style={{display:'block', color:'#8a7c33', fontWeight:400, marginTop:4}}>Jedno zadání → více nabídek. Rychle a zdarma.</span>
          </div>
          <Link href="/vytvoreni-poptavky"
            style={{flex:'0 0 auto', textDecoration:'none', background:'#f5b301', color:'#fff', borderRadius:12, padding:'12px 18px', fontWeight:800, boxShadow:'0 8px 20px rgba(245,179,1,.25)'}}>
            Zadat poptávku
          </Link>
        </div>
      </section>

      {/* Dlaždice kategorií (zatím bez obrázků) */}
      <section style={{marginTop:20}}>
        <h2 style={{fontSize:22, fontWeight:900, color:'#0b2d75', margin:'0 0 12px'}}>Populární kategorie</h2>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:16}}>
          {[
            { href:'/listing/category/elektrikar', title:'Elektrikář' },
            { href:'/listing/category/generalni-uklid', title:'Generální úklid' },
            { href:'/listing/category/masaze', title:'Masáže' },
            { href:'/listing/category/permanentni-make-up', title:'Permanentní make-up' },
          ].map(card=>(
            <Link key={card.href} href={card.href} style={{
              position:'relative', height:140, borderRadius:16, overflow:'hidden', background:'#0b2d75',
              color:'#fff', display:'grid', placeItems:'center', textDecoration:'none', fontWeight:800
            }}>
              {card.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
