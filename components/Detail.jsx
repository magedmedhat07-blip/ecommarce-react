"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProductGrid from "./ProductGrid";

export default function Detail({ path, id, param }) {
  const [item, setItem] = useState(null);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api(`${path}/${id}`).then((r) => setItem(r.data)).catch(() => setItem(false));
    if (param === "category") api(`${path}/${id}/subcategories`).then((r) => setSubs(r.data)).catch(() => {});
  }, [path, id, param]);

  if (item === false) return <p>We couldn't find this page. Go back to the list and try again.</p>;
  if (!item) return <p className="text-slate-500">Loading...</p>;

  return (
    <section>
      <div className="mb-6 flex items-center gap-4 rounded-lg border bg-white p-4">
        <img src={item.image} alt={item.name} className="h-24 w-24 object-contain" />
        <div>
          <h1 className="text-2xl font-bold">{item.name}</h1>
          {subs.length > 0 && <p className="mt-1 text-sm text-slate-500">Subcategories: {subs.map((s) => s.name).join(", ")}</p>}
        </div>
      </div>
      <ProductGrid {...{ [param]: id }} />
    </section>
  );
}
