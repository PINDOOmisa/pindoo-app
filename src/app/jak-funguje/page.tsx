import Link from 'next/link';

const Step = ({num, title, text}: {num:number; title:string; text:string}) => (
  <div style={{
    background:'#FFFFFF', border:'1px solid #E6E6EF', borderRadius:16, padding:'16px',
    boxShadow:'0 10px 24px rgba(14,58,138,.05),0 2px 6px rgba(14,58,138,.06)'
  }}>
    <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:8}}>
      <div style={{
        width:36, height:36, borderRadius:12, background:'#0E3A8A', color:'#fff',
        display:'grid', placeItems:'center', fontWeight:700
      }}>{num}</div>
      <h3 style={{margin:0}}>{title}</h3>
    </div>
    <p style={{margin:'6px 0 0 0', color:'#374151'}}>{text}</p>
  </div>
);

export default function Page(){
  return (
    <>
      <h1>Jak funguje PINDOO</h1>
      <p style={{color:'#374151'}}>
        Hybridní model: poptávky rozesíláme ověřeným poskytovatelům, odpovědi sbíráme, hlídáme limity a bezpečnost.
        Zákazník vybírá nejlepší nabídku. Poskytovatelé platí férově <strong>pay-per-lead</strong> (jen za relevantní kontakt).
      </p>

      <div style={{
        display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:16, marginTop:16
      }}>
        <Step num={1} title="Zadáš požadavek"
          text="Vybereš kategorii a pár detailů, můžeš připojit fotky. Formulář je rychlý a mobil-friendly."/>
        <Step num={2} title="Ověření & distribuce"
          text="Požadavek validujeme (anti-spam) a rozešleme ověřeným poskytovatelům podle lokality a kapacit."/>
        <Step num={3} title="Přijdou nabídky"
          text="Poskytovatelé odpovídají přes PINDOO. Hlídáme limity odpovědí a pravidla — žádné obcházení."/>
        <Step num={4} title="Vybereš a domluvíš"
          text="Porovnáš reference, cenu i termín. Vybereš TOP volbu a domluvíš realizaci — rychle a bezpečně."/>
      </div>

      <div style={{
        marginTop:24, padding:16, border:'1px dashed #E6E6EF', borderRadius:16, background:'#F7F7F9'
      }}>
        <h3 style={{marginTop:0}}>Co z toho mají poskytovatelé?</h3>
        <ul style={{margin:'8px 0 0 18px', lineHeight:1.6}}>
          <li>Ověřené poptávky bez zbytečných telefonátů.</li>
          <li>Pay-per-lead: platíš jen za kontakt, ne za kliky.</li>
          <li>Portfolio, recenze, dostupnost — vše na jednom místě.</li>
        </ul>
      </div>

      <div style={{marginTop:24, display:'flex', gap:12, flexWrap:'wrap'}}>
        <Link href="/vytvoreni-poptavky" style={{
          background:'#0E3A8A', color:'#fff', padding:'10px 14px', borderRadius:12, textDecoration:'none', fontWeight:600
        }}>Zadat poptávku</Link>
        <Link href="/provider" style={{
          background:'#E7EEF9', color:'#0E3A8A', padding:'10px 14px', borderRadius:12, textDecoration:'none', fontWeight:600
        }}>Jsem poskytovatel</Link>
      </div>
    </>
  );
}
