"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useApp } from "@/context/AppContext";

export default function Cart() {
  const { token, ready, setCartCount } = useApp();
  const [cart, setCart] = useState(null);
  const [addr, setAddr] = useState({ details: "", phone: "", city: "" });
  const [pay, setPay] = useState("online");

  const update = (r) => { setCart(r); setCartCount(r.numOfCartItems || 0); };
  const act = (path, method, body) =>
    api("/cart" + path, { method, body, token }).then(update).catch((e) => alert(e.message));

  const load = useCallback(() => api("/cart", { token }).then(update).catch(() => setCart({ data: { products: [] } })), [token]);
  useEffect(() => { if (token) load(); }, [token, load]);

  const checkout = (e) => {
    e.preventDefault();
    const online = pay === "online";
    const path = online ? `/orders/checkout-session/${cart.data._id}?url=${location.origin}` : `/orders/${cart.data._id}`;
    api(path, { method: "POST", body: { shippingAddress: addr }, token })
      .then((r) => (location.href = online ? r.session.url : "/orders"))
      .catch((x) => alert(x.message));
  };

  if (!ready) return null;
  if (!token) return <p>Please <Link href="/login" className="text-green-600 underline">sign in</Link> to see your cart.</p>;
  if (!cart) return <p className="text-slate-500">Loading...</p>;
  const rows = cart.data.products || [];
  if (!rows.length) return <p className="text-slate-500">Your cart is empty. <Link href="/products" className="text-green-600 underline">Find something to buy</Link></p>;

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Shopping Cart</h1>
      {rows.map(({ product, count, price }) => (
        <div key={product._id} className="mb-3 flex items-center gap-4 rounded-lg border bg-white p-3">
          <img src={product.imageCover} alt={product.title} className="h-20 w-20 rounded object-cover" />
          <div className="flex-1"><p className="line-clamp-1 font-medium">{product.title}</p><p className="text-sm">{price} EGP</p></div>
          <button className="rounded border px-2" onClick={() => act("/" + product._id, "PUT", { count: count - 1 })} disabled={count < 2}>−</button>
          <span>{count}</span>
          <button className="rounded border px-2" onClick={() => act("/" + product._id, "PUT", { count: count + 1 })}>+</button>
          <button className="text-sm text-red-600" onClick={() => act("/" + product._id, "DELETE")}>Remove</button>
        </div>
      ))}
      <div className="my-4 flex items-center justify-between">
        <button className="text-sm text-red-600" onClick={() => api("/cart", { method: "DELETE", token }).then(() => { setCart({ data: { products: [] } }); setCartCount(0); })}>Clear cart</button>
        <p className="text-lg font-bold">Total: {cart.data.totalCartPrice} EGP</p>
      </div>
      <form onSubmit={checkout} className="grid gap-3 rounded-lg border bg-white p-4 md:grid-cols-5">
        {["details", "phone", "city"].map((k) => (
          <input key={k} required placeholder={k[0].toUpperCase() + k.slice(1)} className="rounded border px-3 py-2"
            onChange={(e) => setAddr({ ...addr, [k]: e.target.value })} />
        ))}
        <select value={pay} onChange={(e) => setPay(e.target.value)} className="rounded border px-3 py-2">
          <option value="online">Pay online</option>
          <option value="cash">Cash on delivery</option>
        </select>
        <button className="rounded bg-green-600 py-2 text-white hover:bg-green-700">Place order</button>
      </form>
    </section>
  );
}
