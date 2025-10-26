"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // zavřít mobilní menu při změně šířky (návrat na desktop)
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
        {/* Logo vlevo (nahraj /public/pindoo-logo.svg) */}
        <Link href="/" className="brand" aria-label="PINDOO domů">
          <span className="logo-wrap" aria-hidden>
            <Image
              src="/pindoo-logo.svg"
              alt="PINDOO"
              width={120}
              height={32}
              priority
            />
          </span>
        </Link>

        {/* Desktop navigace */}
        <nav className="nav-links">
          <Link href="/jak-to-funguje">Jak to funguje?</Link>
          <Link href="/napoveda">Centrum nápovědy</Link>
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
        <Link href="/jak-to-funguje" role="menuitem" onClick={() => setOpen(false)}>
          Jak to funguje?
        </Link>
        <Link href="/napoveda" role="menuitem" onClick={() => setOpen(false)}>
          Centrum nápovědy
        </Link>
        <hr />
        {/* „Vložit nabídku“ → pošleme do loginu/registrace */}
        <Link href="/prihlaseni" role="menuitem" onClick={() => setOpen(false)}>
          Vložit nabídku
        </Link>
        <div className="mobile-cta">
          <Link href="/registrace" onClick={() => setOpen(false)}>Registrace</Link>
          <Link href="/prihlaseni" onClick={() => setOpen(false)}>Přihlášení</Link>
        </div>
      </div>

      {/* Lokální styly pro barvy a jemné dorovnání, nezasahují do zbytku webu */}
      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255,255,255,.95);
          backdrop-filter: saturate(150%) blur(6px);
          border-bottom: 1px solid #e5e7eb;
        }
        .container.bar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .brand { display: inline-flex; align-items: center; text-decoration: none; }
        .logo-wrap { display: inline-flex; line-height: 0; }

        .nav-links {
          display: none;
          gap: 28px;
          align-items: center;
        }
        @media (min-width: 900px) { .nav-links { display: flex; } }

        .nav-links :global(a) {
          font-size: 15px;
          font-weight: 600;
          color: #0E3A8A;             /* PINDOO blue */
          text-decoration: none;
          transition: color .18s ease;
        }
        .nav-links :global(a:hover) { color: #08235C; } /* tmavší modrá */

        .cta {
          display: none;
          align-items: center;
          gap: 8px;
        }
        @media (min-width: 640px) { .cta { display: flex; } }

        .btn.btn-soft {
          padding: 8px 12px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: #0E3A8A;
          font-weight: 600;
          text-decoration: none;
        }
        .btn.btn-soft:hover {
          border-color: #cfd3db;
          background: #f9fafb;
        }

        .hamburger {
          display: inline-flex;
          width: 40px; height: 40px;
          align-items: center; justify-content: center;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          background: #fff;
        }
        @media (min-width: 900px) { .hamburger { display: none; } }
        .hamburger span {
          display: block; width: 18px; height: 2px; background:#0E3A8A; margin: 2px 0;
        }

        .mobile-menu {
          display: grid;
          gap: 10px;
          padding: 12px 16px;
          border-top: 1px solid #e5e7eb;
          background: #ffffff;
          transform: translateY(-6px);
          opacity: 0;
          pointer-events: none;
          transition: opacity .18s ease, transform .18s ease;
        }
        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .mobile-menu :global(a) {
          color: #0E3A8A;
          font-weight: 600;
          text-decoration: none;
        }
        .mobile-cta {
          display: flex; gap: 12px; margin-top: 6px;
        }
      `}</style>
    </header>
  );
}
<Image
  src="/pindoo-logo.svg"
  alt="PINDOO"
  width={120}
  height={32}
  priority
/>
