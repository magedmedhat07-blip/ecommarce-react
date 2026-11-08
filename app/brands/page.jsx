import Tiles from "@/components/Tiles";

export default function Brands() {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">All Brands</h1>
      <Tiles path="/brands" base="/brands" />
    </section>
  );
}
