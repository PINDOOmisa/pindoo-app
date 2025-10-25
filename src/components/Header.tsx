"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container bar">
        {/* vlevo logo */}
        <div className="left">
          <Link href="/" className="brand" aria-label="PINDOO domů">PINDOO</Link>
        </div>

        {/* desktop nav */}
        <nav className="nav-links">
          <Link href="/jak-funguje">Jak funguje</Link>
          <Link href="/top-poskytovatel">TOP poskytovatelé</Link>
          <Link href="/napoveda">Nápověda</Link>
        </nav>

        {/* desktop CTA */}
        <div className="cta">
          <Link href="/registrace" className="btn btn-soft">Registrace</Link>
          <Link href="/prihlaseni" className="btn btn-soft">Přihlášení</Link>
        </div>

        {/* mobilní hamburger */}
        <button
          className="hamburger"
          aria-label="Otevřít menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span/><span/><span/>
        </button>
      </div>

      {/* mobilní dropdown */}
      {open && (
        <div className="mobile-menu" role="menu" onClick={() => setOpen(false)}>
          <Link href="/jak-funguje" role="menuitem">Jak funguje</Link>
          <Link href="/top-poskytovatel" role="menuitem">TOP poskytovatelé</Link>
          <Link href="/napoveda" role="menuitem">Nápověda</Link>
          <hr />
          <Link href="/registrace" role="menuitem">Registrace</Link>
          <Link href="/prihlaseni" role="menuitem">Přihlášení</Link>
        </div>
      )}
    </header>
  );
}
