import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const links: { label: string; to: string; hash?: string }[] = [
  { label: "New Drops", to: "/new-drops" },
  { label: "Men", to: "/", hash: "shop" },
  { label: "Women", to: "/", hash: "shop" },
  { label: "Collections", to: "/", hash: "shop" },
  { label: "Story", to: "/", hash: "story" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl tracking-widest shrink-0">
          <span className="inline-block h-2 w-2 rounded-full bg-primary glow-red" />
          SOLE
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
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
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/new-drops"
            className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition"
          >
            Search
          </Link>
          <button className="relative rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform">
            Bag · 2
          </button>
        </div>
      </div>
    </motion.header>
  );
}
