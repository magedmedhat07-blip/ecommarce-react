"use client";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const { token, logout, cartCount, wishIds } = useApp();
  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="bg-green-600 py-1 text-center text-xs text-white">
        Free shipping on orders over 500 EGP · New arrivals daily
      </div>
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="text-xl font-bold text-green-600">FreshCart</Link>
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/products">Shop</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/brands">Brands</Link>
        </div>
        <div className="ml-auto flex items-center gap-4 text-sm">
          <Link href="/wishlist">Wishlist ({wishIds.length})</Link>
          <Link href="/cart">Cart ({cartCount})</Link>
          {token ? (
            <>
              <Link href="/orders">Orders</Link>
              <Link href="/change-password">Password</Link>
              <button onClick={logout}>Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login">Sign in</Link>
              <Link href="/register" className="rounded bg-green-600 px-3 py-1.5 text-white">Sign up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
