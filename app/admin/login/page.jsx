"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      const next = params.get("next");
      router.replace(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <span className="label">SAVÉMOI · Store Admin</span>
      <h1>Welcome back</h1>
      <p className="body-txt" style={{ marginBottom: 24 }}>Sign in to manage products, stock and orders.</p>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-stack">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary btn-block" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
      </div>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="login-wrap">
      <div className="login-art">
        <div className="brand">
          <span className="word" style={{ color: "var(--cream)" }}>SAVÉMOI</span>
          <span className="reg" style={{ color: "var(--cream-soft)" }}>Registered in France</span>
        </div>
        <h2>Where science<br /><em>meets nature.</em></h2>
        <p>Manage your catalogue, inventory and orders — everything your storefront needs, in one place.</p>
      </div>
      <div className="login-form">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
