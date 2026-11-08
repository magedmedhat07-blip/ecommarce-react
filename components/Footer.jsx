import Link from "next/link";

const perks = [
  ["Free shipping", "On orders over 500 EGP"],
  ["Easy returns", "14-day return policy"],
  ["Secure payment", "100% secure checkout"],
  ["24/7 support", "Contact us anytime"],
];

export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
        {perks.map(([t, d]) => (
          <div key={t}><h4 className="font-semibold">{t}</h4><p className="text-sm text-slate-500">{d}</p></div>
        ))}
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 border-t px-4 py-8 text-sm md:grid-cols-4">
        <p className="text-slate-600">FreshCart is your one-stop destination for fashion, electronics and beauty at competitive prices.</p>
        <div className="flex flex-col gap-1"><b>Shop</b><Link href="/products">All products</Link><Link href="/categories">Categories</Link><Link href="/brands">Brands</Link></div>
        <div className="flex flex-col gap-1"><b>Account</b><Link href="/cart">Cart</Link><Link href="/wishlist">Wishlist</Link><Link href="/login">Sign in</Link></div>
        <p className="text-slate-500">© 2026 FreshCart. All rights reserved.</p>
      </div>
    </footer>
  );
}
