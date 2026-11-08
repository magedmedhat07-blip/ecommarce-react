"use client";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api";
import { useApp } from "@/context/AppContext";

export default function ChangePassword() {
  const { token, ready, login } = useApp();
  const [f, setF] = useState({});
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const r = await api("/users/changeMyPassword", { method: "PUT", body: f, token });
      if (r.token) login(r.token);
      setMsg("Password changed.");
    } catch (x) { setMsg(x.message); }
  };

  if (!ready) return null;
  if (!token) return <p>Please <Link href="/login" className="text-green-600 underline">sign in</Link> to change your password.</p>;

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-sm flex-col gap-3 rounded-lg border bg-white p-6">
      <h1 className="text-xl font-bold">Change password</h1>
      {[["currentPassword", "Current password"], ["password", "New password"], ["rePassword", "Confirm new password"]].map(([k, label]) => (
        <input key={k} required type="password" placeholder={label} className="rounded border px-3 py-2" onChange={(e) => setF({ ...f, [k]: e.target.value })} />
      ))}
      {msg && <p className="text-sm text-slate-700">{msg}</p>}
      <button className="rounded bg-green-600 py-2 text-white hover:bg-green-700">Save password</button>
    </form>
  );
}
