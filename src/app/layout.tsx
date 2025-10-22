import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body style={{fontFamily:'system-ui, -apple-system, Segoe UI, Roboto, Arial', margin:0, background:'#f7f7f9', color:'#1f2937'}}>
        <header style={{background:'#0E3A8A', color:'#fff', padding:'12px 16px'}}>
          <div style={{maxWidth:960, margin:'0 auto', display:'flex', gap:16, alignItems:'center', flexWrap:'wrap'}}>
            <Link href="/" style={{color:'#fff', fontWeight:700, textDecoration:'none'}}>PINDOO</Link>
            <nav style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <Link href="/jak-funguje" style={{color:'#fff'}}>Jak funguje</Link>
              <Link href="/top-poskytovatel" style={{color:'#fff'}}>TOP poskytovatel</Link>
              <Link href="/vytvoreni-poptavky" style={{color:'#fff'}}>Vytvoření poptávky</Link>
              <Link href="/provider" style={{color:'#fff'}}>Pro poskytovatele</Link>
              <Link href="/o-nas" style={{color:'#fff'}}>O nás</Link>
              <Link href="/faq" style={{color:'#fff'}}>FAQ</Link>
              <Link href="/zpravy" style={{color:'#fff'}}>Zprávy</Link>
              <Link href="/lead" style={{color:'#fff'}}>Lead</Link>
            </nav>
          </div>
        </header>
        <main style={{maxWidth:960, margin:'24px auto', padding:'0 16px', background:'#fff', borderRadius:12, boxShadow:'0 10px 24px rgba(14,58,138,.06),0 2px 6px rgba(14,58,138,.08)'}}>
          <div style={{padding:'20px 20px 28px 20px'}}>{children}</div>
        </main>
        <footer style={{textAlign:'center', padding:'20px', color:'#6B7280'}}>© PINDOO</footer>
      </body>
    </html>
  );
}
