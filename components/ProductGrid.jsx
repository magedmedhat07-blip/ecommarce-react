"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function ProductGrid({ category, brand, limit = 40, search = false }) {
  const [items, setItems] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    setItems(null);
    const qs = new URLSearchParams({ limit });
    if (category) qs.set("category[in]", category);
    if (brand) qs.set("brand", brand);
    api("/products?" + qs).then((r) => setItems(r.data)).catch(() => setItems([]));
  }, [category, brand, limit]);

  if (!items) return <p className="py-10 text-center text-slate-500">Loading products...</p>;
  const shown = items.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      {search && (
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products"
          className="mb-4 w-full rounded border bg-white px-3 py-2 md:w-80" />
      )}
      {shown.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {shown.map((p) => <ProductCard key={p._id} p={p} />)}
        </div>
      ) : (
        <p className="py-10 text-center text-slate-500">No products found. Try another search or category.</p>
      )}
    </>
  );
}
