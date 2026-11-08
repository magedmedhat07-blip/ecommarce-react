"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useApp } from "@/context/AppContext";

export default function AuthForm({ mode }) {
  const reg = mode === "register";
  const { login } = useApp();
  const router = useRouter();
  const [f, setF] = useState({});
  const [err, setErr] = useState("");
  const fields = reg
    ? [["name", "Name"], ["email", "Email"], ["phone", "Phone"], ["password", "Password"], ["rePassword", "Confirm password"]]
    : [["email", "Email"], ["password", "Password"]];

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      if (reg) await api("/auth/signup", { method: "POST", body: f });
      const r = await api("/auth/signin", { method: "POST", body: { email: f.email, password: f.password } });
      login(r.token);
      router.push("/products");
    } catch (x) { setErr(x.message); }
  };

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-sm flex-col gap-3 rounded-lg border bg-white p-6">
      <h1 className="text-xl font-bold">{reg ? "Create your account" : "Sign in"}</h1>
      {fields.map(([k, label]) => (
        <input key={k} required placeholder={label} className="rounded border px-3 py-2"
          type={k.toLowerCase().includes("password") ? "password" : "text"}
          onChange={(e) => setF({ ...f, [k]: e.target.value })} />
      ))}
      {err && <p className="text-sm text-red-600">{err}</p>}
      {!reg && <Link href="/forgot-password" className="text-sm text-green-600 underline">Forgot your password?</Link>}
      <button className="rounded bg-green-600 py-2 text-white hover:bg-green-700">{reg ? "Sign up" : "Sign in"}</button>
    </form>
  );
}
