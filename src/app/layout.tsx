import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <header className="header">
          <div className="container" style={{display:'flex',gap:16,alignItems:'center',justifyContent:'space-between',padding:'12px 16px'}}>
            <Link href="/" className="logo" style={{color:'#fff',textDecoration:'none'}}>PINDOO</Link>
            <nav className="nav" style={{flex:1, justifyContent:'center', display:'flex', gap:18}}>
              <Link href="/jak-funguje">Jak to funguje?</Link>
              <Link href="/napoveda">Centrum nápovědy</Link>
              <Link href="/registrace">Registrace</Link>
              <Link href="/prihlaseni">Přihlášení</Link>
            </nav>
            <div style={{display:'flex',gap:10}}>
              <Link href="/provider" className="btn btn-accent" style={{textDecoration:'none'}}>Vložit svou nabídku</Link>
            </div>
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
