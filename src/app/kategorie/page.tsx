import CategoryGrid from "@/components/CategoryGrid";

export const dynamic = "force-static"; // volitelné

export default function CategoriesPage() {
  return (
    <main style={{ maxWidth: "1140px", margin: "0 auto", padding: "24px 16px" }}>
      <CategoryGrid />
    </main>
  );
}
