import CategoryGrid from "@/components/CategoryGrid";

export const metadata = {
  title: "Kategorie | PINDOO",
};

export default function CategoriesPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <CategoryGrid />
    </main>
  );
}
