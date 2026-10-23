"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import { ToastProvider } from "./Toast";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "grid", exact: true },
  { href: "/admin/products", label: "Products", icon: "box" },
  { href: "/admin/products/new", label: "Add Product", icon: "plus", exact: true },
  { href: "/admin/orders", label: "Orders", icon: "bag" }
];

export default function AdminShell({ user, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (item) =>
    item.exact
      ? pathname === item.href
      : pathname.startsWith(item.href) && pathname !== "/admin/products/new";

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <ToastProvider>
      <div className="admin-mobile-bar">
        <span className="word">SAVÉMOI Admin</span>
        <button onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" style={{ color: "var(--cream)" }}>
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>
      <div className="admin-shell">
        <aside className={`admin-side ${open ? "open" : ""}`}>
          <Link href="/admin" className="brand">
            <span className="word">SAVÉMOI</span>
            <span className="reg">Store Admin</span>
          </Link>
          <nav className="admin-nav">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item) ? "active" : ""}>
                <Icon name={item.icon} /> {item.label}
              </Link>
            ))}
          </nav>
          <div className="bottom">
            <a href="/" target="_blank" rel="noopener noreferrer"><Icon name="external" /> View store</a>
            {user?.email && <span style={{ fontSize: 11.5, padding: "4px 14px", color: "rgba(254,253,249,.55)" }}>{user.email}</span>}
            <button onClick={logout}><Icon name="logout" /> Sign out</button>
          </div>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </ToastProvider>
  );
}
