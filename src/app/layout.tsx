// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'PINDOO',
  description: 'Najdi ověřené poskytovatele služeb. Jedno zadání → více nabídek.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body style={{minHeight:'100dvh', background:'#fff'}}>
        {/* HEADER */}
        <header style={{borderBottom:'1px solid #eee', position:'sticky', top:0, background:'#fff', zIndex:10}}>
          <div style={{maxWidth:1100, margin:'0 auto', padding:'10px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
            <Link href="/" style={{fontWeight:900, fontSize:20, textDecoration:'none', color:'#0b2d75'}}>PINDOO</Link>
            <nav style={{display:'flex', gap:12, alignItems:'center', flexWrap:'wrap'}}>
              <Link href="/jak-funguje" style={{fontSize:14, color:'#0f1e46', textDecoration:'none'}}>Jak to funguje</Link>
              <Link href="/faq" style={{fontSize:14, color:'#0f1e46', textDecoration:'none'}}>Nápověda</Link>
              <Link href="/top-poskytovatel" style={{fontSize:14, color:'#0f1e46', textDecoration:'none'}}>TOP poskytovatel</Link>
              <Link href="/vytvoreni-poptavky" style={{padding:'8px 14px', borderRadius:10, background:'#f5b301', color:'#111', fontWeight:800, textDecoration:'none'}}>
                Zadat poptávku
              </Link>
            </nav>
          </div>
        </header>

        {/* OBSAH */}
        <main style={{maxWidth:1100, margin:'0 auto', padding:'20px 16px'}}>{children}</main>

        {/* FOOTER */}
        <footer style={{borderTop:'1px solid #eee', marginTop:40}}>
          <div style={{maxWidth:1100, margin:'0 auto', padding:'18px 16px', color:'#6a7793', fontSize:13}}>
            © {new Date().getFullYear()} PINDOO
          </div>
        </footer>
      </body>
    </html>
  );
}
