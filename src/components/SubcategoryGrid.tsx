// src/components/SubcategoryGrid.tsx

export default function SubcategoryGrid({ subs }: { subs: any[] }) {
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {subs.map((sub: any, idx: number) => (
        <div
          key={sub.slug || idx}
          className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 flex flex-col gap-2"
        >
          <div className="text-base font-semibold text-slate-900">
            {sub.title}
          </div>
          <div className="text-xs text-slate-500">
            Upřesni tohle v poptávce a ukážeme ti vhodné profíky.
          </div>
        </div>
      ))}
    </div>
  );
}
