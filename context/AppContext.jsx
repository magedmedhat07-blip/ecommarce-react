"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishIds, setWishIds] = useState([]);

  const refresh = useCallback(async (t) => {
    if (!t) { setCartCount(0); setWishIds([]); return; }
    api("/cart", { token: t }).then((c) => setCartCount(c.numOfCartItems || 0)).catch(() => setCartCount(0));
    api("/wishlist", { token: t }).then((w) => setWishIds(w.data.map((p) => p._id))).catch(() => setWishIds([]));
  }, []);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) { setToken(t); refresh(t); }
    setReady(true);
  }, [refresh]);

  const login = (t) => { localStorage.setItem("token", t); setToken(t); refresh(t); };
  const logout = () => { localStorage.removeItem("token"); setToken(null); refresh(null); };

  const addToCart = async (id) => {
    const r = await api("/cart", { method: "POST", body: { productId: id }, token });
    setCartCount(r.numOfCartItems);
  };

  const toggleWish = async (id) => {
    if (wishIds.includes(id)) {
      await api("/wishlist/" + id, { method: "DELETE", token });
      setWishIds(wishIds.filter((x) => x !== id));
    } else {
      await api("/wishlist", { method: "POST", body: { productId: id }, token });
      setWishIds([...wishIds, id]);
    }
  };

  return (
    <Ctx.Provider value={{ token, ready, login, logout, cartCount, setCartCount, wishIds, addToCart, toggleWish }}>
      {children}
    </Ctx.Provider>
  );
}
