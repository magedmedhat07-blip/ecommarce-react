"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function Tiles({ path, base, limit }) {
  const [items, setItems] = useState(null);
  useEffect(() => { api(path).then((r) => setItems(r.data)).catch(() => setItems([])); }, [path]);
  if (!items) return <p className="text-slate-500">Loading...</p>;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.slice(0, limit).map((i) => (
        <Link key={i._id} href={`${base}/${i._id}`} className="rounded-lg border bg-white p-3 text-center hover:border-green-600">
          <img src={i.image} alt={i.name} className="h-40 w-full object-contain" />
          <p className="mt-2 font-medium">{i.name}</p>
        </Link>
      ))}
    </div>
  );
}
