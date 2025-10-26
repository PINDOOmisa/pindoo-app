"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Zavření mobilního menu při přepnutí na desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="header">
      <div className="container-bar">
        {/* Logo vlevo */}
        <Link href="/" className="brand" aria-label="PINDOO domů">
          <Image
            src="/pindoo-logo.png"
            alt="PINDOO"
            width={160}
            height={42}
            priority
            unoptimized
          />
        </Link>

        {/* Desktop navigace */}
        <nav className="nav-links">
          <Link href="/jak-to-funguje">Jak to funguje?</Link>
          <Link href="/napoveda">Centrum nápovědy</Link>
        </nav>

        {/* Desktop CTA */}
        <div className="cta">
          <Link href="/registrace" className="btn btn-outline">
            Registrace
          </Link>
          <Link href="/prihlaseni" className="btn btn-filled">
            Přihlášení
          </Link>
        </div>

        {/* Hamburger menu */}
        <button
          className="hamburger"
          aria-label="Otevřít menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
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
        <Link href="/prihlaseni" role="menuitem" onClick={() => setOpen(false)}>
          Vložit nabídku
        </Link>
        <div className="mobile-cta">
          <Link href="/registrace" onClick={() => setOpen(false)}>
            Registrace
          </Link>
          <Link href="/prihlaseni" onClick={() => setOpen(false)}>
            Přihlášení
          </Link>
        </div>
      </div>

      {/* === STYLY === */}
      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: saturate(180%) blur(8px);
          border-bottom: 1px solid #e5e7eb;
        }

        .container-bar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          line-height: 0;
        }

        .nav-links {
          display: none;
          gap: 32px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .nav-links {
            display: flex;
          }
        }

        .nav-links :global(a) {
          font-size: 15.5px;
          font-weight: 600;
          color: #0e3a8a;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .nav-links :global(a:hover) {
          color: #08235c;
        }

        .cta {
          display: none;
          align-items: center;
          gap: 10px;
        }
        @media (min-width: 640px) {
          .cta {
            display: flex;
          }
        }

        .btn {
          padding: 8px 14px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          font-size: 15px;
          transition: all 0.2s ease;
        }

        .btn-outline {
          color: #0e3a8a;
          border: 1px solid #d1d5db;
          background: #fff;
        }
        .btn-outline:hover {
          background: #f7f8fa;
        }

        .btn-filled {
          color: #fff;
          background: #0e3a8a;
          border: 1px solid #0e3a8a;
        }
        .btn-filled:hover {
          background: #08235c;
        }

        .hamburger {
          display: inline-flex;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          background: #fff;
        }
        @media (min-width: 900px) {
          .hamburger {
            display: none;
          }
        }
        .hamburger span {
          display: block;
          width: 18px;
          height: 2px;
          background: #0e3a8a;
          margin: 3px 0;
        }

        .mobile-menu {
          display: grid;
          gap: 12px;
          padding: 14px 20px;
          border-top: 1px solid #e5e7eb;
          background: #ffffff;
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .mobile-menu :global(a) {
          color: #0e3a8a;
          font-weight: 600;
          text-decoration: none;
        }
        .mobile-cta {
          display: flex;
          gap: 14px;
          margin-top: 8px;
        }
      `}</style>
    </header>
  );
}
