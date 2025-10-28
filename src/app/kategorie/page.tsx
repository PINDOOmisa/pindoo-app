// src/app/kategorie/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export default function Page() {
  const list = Array.isArray(CATEGORIES) ? CATEGORIES : [];

  return (
    <main className="mx-auto max-w-[1140px] px-4 py-6">
      <h1 className="text-3xl font-extrabold mb-4 text-slate-900">
        Kategorie
      </h1>

      <style>{`
        .cats { 
          display:grid; 
          gap:16px; 
          grid-template-columns:repeat(2,minmax(0,1fr)); 
        }
        @media (min-width:640px){ 
          .cats{ grid-template-columns:repeat(3,minmax(0,1fr)); } 
        }
        @media (min-width:1024px){ 
          .cats{ grid-template-columns:repeat(4,minmax(0,1fr)); } 
        }

        .tile {
          display:flex; 
          flex-direction:column; 
          align-items:stretch; 
          gap:10px; 
          padding:16px; 
          border:1px solid #e6eaf2; 
          border-radius:16px; 
          background:#fff; 
          text-decoration:none; 
          transition: box-shadow .15s ease, transform .15s ease;
        }
        .tile:hover { 
          transform: translateY(-2px); 
          box-shadow:0 8px 20px rgba(14,58,138,0.08); 
        }

        .icon-box {
          width:100%; 
          height:120px; 
          background:#f8fafc; 
          border-radius:12px; 
          display:flex; 
          align-items:center; 
          justify-content:center; 
          overflow:hidden;
        }
        .icon-box img {
          max-width:90%; 
          max-height:90%; 
          object-fit:contain;
        }

        .ttl {
          font-weight:700; 
          color:#0f172a;
          line-height:1.25;
        }
      `}</style>

      <div className="cats">
        {list.map((cat: any, i: number) => {
          const slug =
            cat.slug ||
            cat.Slug ||
            cat.title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-") ||
            `cat-${i}`;
          const title = cat.title || cat.name || cat.label || "Kategorie";

          return (
            <Link key={slug} href={`/kategorie/${slug}`} className="tile">
              <div className="icon-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/img/categories/${slug}.jpg`}
                  alt={title}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `/img/categories/${slug}.png`;
                  }}
                />
              </div>
              <div className="ttl">{title}</div>
            </Link>
          );
        })}
      </div>

      {/* feedback panel */}
      <section
        style={{
          marginTop: 24,
          border: "1px solid #e6eaf2",
          borderRadius: 16,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </section>
    </main>
  );
}
