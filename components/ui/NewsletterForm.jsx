"use client";

import { useState } from "react";

export default function NewsletterForm({ light = false }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ status: "idle", msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setState({ status: "loading", msg: "" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      setEmail("");
      setState({ status: "ok", msg: data.message || "Thank you for subscribing!" });
    } catch (err) {
      setState({ status: "error", msg: err.message });
    }
  }

  return (
    <div>
      <form className={`nl-form ${light ? "on-light" : ""}`} onSubmit={onSubmit}>
        <label htmlFor={light ? "nl-email-light" : "nl-email"} className="sr-only">Email address</label>
        <input
          id={light ? "nl-email-light" : "nl-email"}
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={state.status === "loading"}>
          {state.status === "loading" ? "…" : "Subscribe"}
        </button>
      </form>
      {state.msg && <p className="nl-msg">{state.msg}</p>}
    </div>
  );
}
