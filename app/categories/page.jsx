import Tiles from "@/components/Tiles";

export default function Categories() {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">All Categories</h1>
      <Tiles path="/categories" base="/categories" />
    </section>
  );
}
