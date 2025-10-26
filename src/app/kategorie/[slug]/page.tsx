import { CATEGORIES } from "@/data/categories";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default function CategoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Kategorie nenalezena</h1>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold">{cat.title}</h1>
      {cat.subtitle && <p className="text-gray-600 mt-1">{cat.subtitle}</p>}

      {cat.subcategories?.length > 0 && (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {cat.subcategories.map((sc) => (
            <div key={sc.slug} className="rounded-2xl border p-5">
              <h2 className="font-semibold mb-2">{sc.title}</h2>
              {sc.attributes?.length ? (
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  {sc.attributes.map((a) => (
                    <li key={a.code}>{a.label}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Zatím bez atributů.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
