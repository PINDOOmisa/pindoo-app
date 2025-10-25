"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // zavřít menu při změně šířky (když se přepne na desktop)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="header">
      <div className="container bar">
        {/* Logo vlevo */}
        <Link href="/" className="brand" aria-label="PINDOO domů">
          PINDOO
        </Link>

        {/* Desktop navigace */}
        <nav className="nav-links">
          <Link href="/jak-funguje">Jak funguje</Link>
          <Link href="/top-poskytovatel">TOP poskytovatelé</Link>
          <Link href="/napoveda">Nápověda</Link>
        </nav>

        {/* Desktop CTA */}
        <div className="cta">
          <Link href="/registrace" className="btn btn-soft">Registrace</Link>
          <Link href="/prihlaseni" className="btn btn-soft">Přihlášení</Link>
        </div>

        {/* Hamburger – jen mobil */}
        <button
          className="hamburger"
          aria-label="Otevřít menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobilní dropdown */}
      <div className={`mobile-menu ${open ? "open" : ""}`} role="menu">
        <Link href="/jak-funguje" role="menuitem" onClick={() => setOpen(false)}>Jak funguje</Link>
        <Link href="/top-poskytovatel" role="menuitem" onClick={() => setOpen(false)}>TOP poskytovatelé</Link>
        <Link href="/napoveda" role="menuitem" onClick={() => setOpen(false)}>Nápověda</Link>
        <hr />
        {/* „Vložit nabídku“ → jen pro přihlášené -> pošleme do loginu/registrace */}
        <Link href="/prihlaseni" role="menuitem" onClick={() => setOpen(false)}>Vložit nabídku</Link>
        <div className="mobile-cta">
          <Link href="/registrace" onClick={() => setOpen(false)}>Registrace</Link>
          <Link href="/prihlaseni" onClick={() => setOpen(false)}>Přihlášení</Link>
        </div>
      </div>
    </header>
  );
}
