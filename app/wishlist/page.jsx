"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useApp } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";

export default function Wishlist() {
  const { token, ready, wishIds } = useApp();
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (token) api("/wishlist", { token }).then((r) => setItems(r.data)).catch(() => setItems([]));
  }, [token]);

  if (!ready) return null;
  if (!token) return <p>Please <Link href="/login" className="text-green-600 underline">sign in</Link> to see your wishlist.</p>;
  if (!items) return <p className="text-slate-500">Loading...</p>;
  const shown = items.filter((p) => wishIds.includes(p._id));

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">My Wishlist</h1>
      {shown.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{shown.map((p) => <ProductCard key={p._id} p={p} />)}</div>
      ) : (
        <p className="text-slate-500">Your wishlist is empty. Tap ♡ on any product to save it.</p>
      )}
    </section>
  );
}
