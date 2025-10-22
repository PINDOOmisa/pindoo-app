import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <header className="header">
          <div className="container" style={{display:'flex',gap:16,alignItems:'center',justifyContent:'space-between',padding:'12px 16px'}}>
            <Link href="/" className="logo" style={{color:'#fff',textDecoration:'none'}}>PINDOO</Link>
            <nav className="nav">
              <Link href="/jak-funguje">Jak funguje</Link>
              <Link href="/top-poskytovatel">TOP poskytovatel</Link>
              <Link href="/vytvoreni-poptavky">Vytvoření poptávky</Link>
              <Link href="/provider">Pro poskytovatele</Link>
              <Link href="/o-nas">O nás</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/zpravy">Zprávy</Link>
              <Link href="/lead">Lead</Link>
            </nav>
          </div>
        </header>

        <main className="container" style={{margin:'24px auto'}}>
          <div className="card" style={{padding:'22px 20px 28px 20px'}}>{children}</div>
        </main>

        <footer>© PINDOO</footer>
      </body>
    </html>
  );
}
