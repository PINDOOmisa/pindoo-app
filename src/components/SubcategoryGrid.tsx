import Link from "next/link";

type Sub = {
  title: string;
  slug: string;
  image?: string;
};

export default function SubcategoryGrid({ items = [] as Sub[] }) {
  if (!items || items.length === 0) {
    return (
      <p className="mt-6 text-slate-500">
        V této kategorii zatím nejsou podkategorie.
      </p>
    );
  }

  return (
    <div className="subgrid-wrap">
      <div className="subgrid">
        {items.map((sub) => (
          <Link
            key={sub.slug}
            href={`/lead?sub=${sub.slug}`}
            className="subcard"
          >
            <div className="subcard-head">{sub.title}</div>
            <div className="subcard-img-wrap">
              {sub.image ? (
                <img src={sub.image} alt={sub.title} className="subcard-img" />
              ) : (
                <div className="subcard-img subcard-img--placeholder" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
