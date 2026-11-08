import Link from "next/link";
import Tiles from "@/components/Tiles";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <>
      <section className="rounded-lg bg-green-600 p-10 text-white">
        <h1 className="text-3xl font-bold">Fresh finds, delivered fast</h1>
        <p className="mt-2 max-w-md">Fashion, electronics and beauty from top brands, with free shipping over 500 EGP.</p>
        <div className="mt-5 flex gap-3">
          <Link href="/products" className="rounded bg-white px-5 py-2 font-medium text-green-700">Shop now</Link>
          <Link href="/brands" className="rounded border border-white px-5 py-2">Browse brands</Link>
        </div>
      </section>
      <h2 className="mb-4 mt-10 text-xl font-bold">Shop by category</h2>
      <Tiles path="/categories" base="/categories" limit={8} />
      <h2 className="mb-4 mt-10 text-xl font-bold">Popular brands</h2>
      <Tiles path="/brands" base="/brands" limit={4} />
      <h2 className="mb-4 mt-10 text-xl font-bold">Featured products</h2>
      <ProductGrid limit={8} />
      <section className="mt-10 rounded-lg border bg-white p-6 text-center">
        <h2 className="text-xl font-bold">Cash or card, your choice</h2>
        <p className="mt-1 text-slate-600">Pay online at checkout or pay cash when your order arrives.</p>
      </section>
    </>
  );
}
