"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useApp } from "@/context/AppContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { token, wishIds, toggleWish, addToCart } = useApp();
  const router = useRouter();
  const [p, setP] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    api("/products/" + id).then((r) => { setP(r.data); setImg(r.data.imageCover); }).catch(() => setP(false));
  }, [id]);

  if (p === false) return <p>We couldn't find this product. Go back to the shop and try again.</p>;
  if (!p) return <p className="text-slate-500">Loading...</p>;
  const liked = wishIds.includes(p._id);
  const guard = (fn) => () => (token ? fn(p._id).catch((e) => alert(e.message)) : router.push("/login"));

  return (
    <section className="grid gap-8 md:grid-cols-2">
      <div>
        <img src={img} alt={p.title} className="aspect-square w-full rounded-lg object-cover" />
        <div className="mt-3 flex gap-2">
          {[p.imageCover, ...(p.images || [])].map((s) => (
            <img key={s} src={s} alt="" onClick={() => setImg(s)} className="h-16 w-16 cursor-pointer rounded border object-cover" />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-green-600">
          {p.category && <Link href={"/categories/" + p.category._id}>{p.category.name}</Link>}
          {p.brand && <> / <Link href={"/brands/" + p.brand._id}>{p.brand.name}</Link></>}
        </p>
        <h1 className="mt-1 text-2xl font-bold">{p.title}</h1>
        <p className="mt-3 text-slate-600">{p.description}</p>
        <p className="mt-4 text-2xl font-bold">{p.price} EGP</p>
        <p className="text-sm text-slate-500">★ {p.ratingsAverage} ({p.ratingsQuantity} reviews) · {p.quantity} in stock</p>
        <div className="mt-6 flex gap-3">
          <button onClick={guard(addToCart)} className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700">Add to cart</button>
          <button onClick={guard(toggleWish)} className={`rounded border px-4 ${liked ? "text-red-500" : ""}`}>{liked ? "♥ Saved" : "♡ Save"}</button>
        </div>
      </div>
    </section>
  );
}
