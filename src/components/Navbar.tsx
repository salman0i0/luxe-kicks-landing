import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingBag, Search, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links: { label: string; to: string; hash?: string }[] = [
  { label: "New Drops", to: "/new-drops" },
  { label: "Men", to: "/", hash: "shop" },
  { label: "Women", to: "/", hash: "shop" },
  { label: "Collections", to: "/collections" },
  { label: "Story", to: "/", hash: "story" },
];

export function Navbar() {
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl tracking-widest shrink-0">
          <span className="inline-block h-2 w-2 rounded-full bg-primary glow-red" />
          SOLE
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-7 text-sm font-medium text-muted-foreground min-w-0">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: true, includeHash: false }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 justify-self-end">
          <Link
            to="/"
            hash="shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
            aria-label="Search shoes"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Search</span>
          </Link>
          <button
            onClick={openCart}
            className="relative inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-3 sm:px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform"
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums">· {count}</span>
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-border"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-border bg-background/95 backdrop-blur"
        >
          <ul className="px-4 py-3 flex flex-col">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  hash={l.hash}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base font-medium text-foreground border-b border-border last:border-b-0"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
}
