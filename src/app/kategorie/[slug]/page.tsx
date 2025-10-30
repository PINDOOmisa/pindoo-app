export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = params;

  const mod = await import("../../../data/categories");
  const categories = mod.NORMALIZED_CATEGORIES || mod.CATEGORIES || [];
  const category =
    categories.find((c: any) => c.slug === slug) ||
    categories.find((c: any) => c.slug?.toLowerCase() === slug.toLowerCase());

  if (!category) {
    return (
      <div className="min-h-screen bg-[#F7F7F9] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">Kategorie nenalezena</h1>
          <p className="text-slate-500 mb-5">Možná byla přejmenována.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[#0E3A8A] text-white"
          >
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    );
  }

  const subs = Array.isArray(category.subcategories) ? category.subcategories : [];

  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-slate-400 mb-1">Kategorie</p>
          <h1 className="text-3xl font-semibold text-slate-900 mb-1">{category.title}</h1>
          <p className="text-slate-500">
            Vyber si přesnější službu, ať tě najde ten správný profík.
          </p>
        </div>
        <Link href="/" className="text-sm text-[#0E3A8A] hover:underline">
          ← Zpět na hlavní
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-14">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subs.map((sub: any) => (
            <div
              key={sub.slug}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E7EEF9] flex items-center justify-center text-[#0E3A8A] text-sm font-semibold">
                  {sub.title?.slice(0, 1)}
                </div>
                <h2 className="text-sm font-semibold text-slate-900">{sub.title}</h2>
              </div>
              <button className="mt-auto inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-[#0E3A8A] text-white text-xs hover:bg-[#0c2f6d] transition">
                Vybrat
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-5 items-center">
          <img
            src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
            className="w-20 h-20 object-contain"
            alt="PINDOO"
          />
          <div>
            <p className="text-slate-900 font-medium">Chceš, aby to vypadalo úplně jako v Kreezalidu?</p>
            <p className="text-slate-500 text-sm">Stačí mi napsat, doplníme ikonky i fotky.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
