import ProductGrid from "@/components/ProductGrid";

export default function Products({ searchParams }) {
  return (
    <section>
      <p className="text-sm text-slate-500">Home / All Products</p>
      <h1 className="text-2xl font-bold">All Products</h1>
      <p className="mb-4 text-slate-500">Explore our complete product collection</p>
      <ProductGrid category={searchParams.category} brand={searchParams.brand} search />
    </section>
  );
}
