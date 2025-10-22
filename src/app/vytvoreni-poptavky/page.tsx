import Link from 'next/link';

export default function Page(){
  return (
    <>
      <h1>Vytvoření poptávky</h1>
      <p style={{color:'#374151'}}>
        Tady bude vložen **PINDOO Intake v6.6** (mobilní nahrávání fotek, limit 40 MB celkem, max 5 souborů,
        tikaní ve slovníku, tichý submit do Make + potvrzení). Než ho sem přeneseme, můžeš zadat poptávku přes rychlý kontakt.
      </p>

      <div style={{marginTop:16, padding:16, border:'1px solid #E6E6EF', borderRadius:16, background:'#F7F7F9'}}>
        <p style={{marginTop:0}}><strong>Rychlý kontakt</strong></p>
        <ul style={{margin:'6px 0 0 18px'}}>
          <li>Popiš, co potřebuješ</li>
          <li>Přidej lokalitu a termín</li>
          <li>Připoj fotky (pokud máš)</li>
        </ul>
      </div>

      <div style={{marginTop:20}}>
        <Link href="/" style={{color:'#0E3A8A'}}>← Zpět na úvod</Link>
      </div>
    </>
  );
}
