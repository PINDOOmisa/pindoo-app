// src/app/kategorie/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";

type MaybeString = string | null | undefined;
type RawCategory = {
  slug?: MaybeString; Slug?: MaybeString;
  title?: MaybeString; name?: MaybeString; label?: MaybeString; Title?: MaybeString;
  subcategories?: any[]; children?: any[]; items?: any[];
};

function pick<T = any>(obj: Record<string, any>, keys: string[], fallback: T): T {
  for (const k of keys) if (obj && obj[k] != null) return obj[k] as T;
  return fallback;
}
function slugify(input: string): string {
  return (input || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}
function catTitle(c: RawCategory): string {
  return String(pick<string>(c as any, ["title","name","label","Title"], "") || "").trim();
}
function catSlug(c: RawCategory): string {
  const explicit = String(pick<string>(c as any, ["slug","Slug"], "") || "").trim();
  return explicit || slugify(catTitle(c));
}
function subs(c: any): any[] {
  return (c?.subcategories || c?.children || c?.items || []) as any[];
}

/** Klíčové: renderuj dynamicky – bez generateStaticParams */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function CategoryDetail({ params }: { params: { slug: string } }) {
  const list = (CATEGORIES as any[]) || [];
  const wanted = (params.slug || "").toString().trim().toLowerCase();

  // hledej slug robustně (bereme i decodeURI pro jistotu)
  const cat =
    list.find((c) => catSlug(c) === wanted) ||
    list.find((c) => catSlug(c) === decodeURIComponent(wanted));

  if (!cat) notFound();

  const title = catTitle(cat);
  const children = subs(cat);

  return (
    <main style={{ maxWidth: 1140, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: "1.875rem", fontWeight: 800, marginBottom: 16, color: "#0f172a" }}>
        {title}
      </h1>

      {children?.length ? (
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
          {children.map((s: any, i: number) => {
            const sTitle = catTitle(s) || "Položka";
            const sSlug = catSlug(s);
            return (
              <Link
                key={`${sSlug}-${i}`}
                href={`/lead?category=${encodeURIComponent(wanted)}&sub=${encodeURIComponent(sSlug)}`}
                style={{
                  display: "block",
                  border: "1px solid #e6eaf2",
                  borderRadius: 16,
                  padding: 16,
                  background: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              >
                {sTitle}
              </Link>
            );
          })}
        </div>
      ) : (
        <p>Podkategorie doplníme.</p>
      )}
    </main>
  );
}
