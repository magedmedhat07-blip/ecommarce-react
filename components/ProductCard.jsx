"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function ProductCard({ p }) {
  const { token, wishIds, toggleWish, addToCart } = useApp();
  const router = useRouter();
  const liked = wishIds.includes(p._id);
  const guard = (fn) => () => (token ? fn(p._id).catch((e) => alert(e.message)) : router.push("/login"));

  return (
    <div className="flex flex-col rounded-lg border bg-white p-3">
      <Link href={"/products/" + p._id}><img src={p.imageCover} alt={p.title} className="aspect-square w-full rounded object-cover" /></Link>
      <p className="mt-2 text-xs text-green-600">{p.category?.name}</p>
      <Link href={"/products/" + p._id} className="line-clamp-1 font-medium">{p.title}</Link>
      <div className="mt-1 flex justify-between text-sm">
        <span className="font-semibold">{p.price} EGP</span>
        <span>★ {p.ratingsAverage}</span>
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={guard(addToCart)} className="flex-1 rounded bg-green-600 py-2 text-sm text-white hover:bg-green-700">Add to cart</button>
        <button onClick={guard(toggleWish)} aria-label="Toggle wishlist" className={`rounded border px-3 ${liked ? "text-red-500" : ""}`}>{liked ? "♥" : "♡"}</button>
      </div>
    </div>
  );
}
