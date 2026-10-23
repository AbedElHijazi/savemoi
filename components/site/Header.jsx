"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { useCart } from "@/components/cart/CartProvider";
import { CATEGORIES } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, openCart, hydrated } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  function onSearch(e) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="SAVÉMOI home">
          <span className="word">SAVÉMOI</span>
          <span className="flagmark" aria-hidden="true"><span /><span /><span /></span>
          <span className="reg">Registered in France</span>
        </Link>

        <nav className={`nav-primary ${menuOpen ? "open" : ""}`} aria-label="Main">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className={pathname === `/collections/${c.slug}` ? "active" : ""}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="header-icons">
          <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen((s) => !s)}>
            <Icon name="search" />
          </button>
          <button className="icon-btn" aria-label="Open bag" onClick={openCart}>
            <Icon name="cart" />
            {hydrated && count > 0 && <span className="cart-count">{count}</span>}
          </button>
          <button
            className="icon-btn menu-btn"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((m) => !m)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="search-panel">
          <div className="wrap">
            <form onSubmit={onSearch} role="search">
              <label htmlFor="site-search" className="sr-only">Search products</label>
              <input
                id="site-search"
                ref={searchRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search shampoo, rosemary, refills…"
              />
              <button className="btn btn-primary" type="submit">Search</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
