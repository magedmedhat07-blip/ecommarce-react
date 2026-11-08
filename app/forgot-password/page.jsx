"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [v, setV] = useState({ email: "", code: "", pass: "" });
  const [msg, setMsg] = useState("");
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const run = (fn) => async (e) => {
    e.preventDefault();
    setMsg("");
    try { await fn(); } catch (x) { setMsg(x.message); }
  };

  const send = run(async () => { await api("/auth/forgotPasswords", { method: "POST", body: { email: v.email } }); setStep(2); });
  const verify = run(async () => { await api("/auth/verifyResetCode", { method: "POST", body: { resetCode: v.code } }); setStep(3); });
  const reset = run(async () => { await api("/auth/resetPassword", { method: "PUT", body: { email: v.email, newPassword: v.pass } }); router.push("/login"); });

  const steps = {
    1: [send, "Email", "email", "Send reset code"],
    2: [verify, "Code from your email", "code", "Verify code"],
    3: [reset, "New password", "pass", "Save new password"],
  };
  const [onSubmit, label, key, cta] = steps[step];

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-sm flex-col gap-3 rounded-lg border bg-white p-6">
      <h1 className="text-xl font-bold">Reset your password</h1>
      <input required placeholder={label} value={v[key]} onChange={set(key)} type={key === "pass" ? "password" : "text"} className="rounded border px-3 py-2" />
      {msg && <p className="text-sm text-red-600">{msg}</p>}
      <button className="rounded bg-green-600 py-2 text-white hover:bg-green-700">{cta}</button>
    </form>
  );
}
