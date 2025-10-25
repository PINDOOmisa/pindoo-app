"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="container bar">
        <div className="left">
          <Link href="/" className="brand" style={{ fontSize: 20 }}>
            <strong style={{ letterSpacing: "0.5px" }}>PINDOO</strong>
          </Link>
          <nav className="nav-links">
            <Link href="/jak-funguje">Jak funguje</Link>
            <Link href="/top-poskytovatel">TOP poskytovatelé</Link>
            <Link href="/napoveda">Nápověda</Link>
          </nav>
        </div>

        <div className="cta">
          <Link href="/registrace" className="btn btn-soft">
            Registrace
          </Link>
          <Link href="/prihlaseni" className="btn btn-soft">
            Přihlášení
          </Link>
        </div>
      </div>
    </header>
  );
}
