"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useApp } from "@/context/AppContext";

export default function Orders() {
  const { token, ready } = useApp();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (!token) return;
    try {
      const uid = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))).id;
      api("/orders/user/" + uid).then((r) => setOrders(Array.isArray(r) ? r : r.data || [])).catch(() => setOrders([]));
    } catch { setOrders([]); }
  }, [token]);

  if (!ready) return null;
  if (!token) return <p>Please <Link href="/login" className="text-green-600 underline">sign in</Link> to see your orders.</p>;
  if (!orders) return <p className="text-slate-500">Loading...</p>;
  if (!orders.length) return <p className="text-slate-500">No orders yet. <Link href="/products" className="text-green-600 underline">Start shopping</Link></p>;

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">My Orders</h1>
      {orders.map((o) => (
        <div key={o._id || o.id} className="mb-4 rounded-lg border bg-white p-4">
          <div className="flex flex-wrap justify-between gap-2 text-sm">
            <span>{new Date(o.createdAt).toLocaleDateString()}</span>
            <span>{o.paymentMethodType === "cash" ? "Cash on delivery" : "Paid online"}</span>
            <span>{o.isPaid ? "Paid" : "Not paid"} / {o.isDelivered ? "Delivered" : "On the way"}</span>
            <b>{o.totalOrderPrice} EGP</b>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            {(o.cartItems || []).map((it, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <img src={it.product?.imageCover} alt="" className="h-12 w-12 rounded object-cover" />
                <span className="line-clamp-1 max-w-40">{it.product?.title} x{it.count}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
