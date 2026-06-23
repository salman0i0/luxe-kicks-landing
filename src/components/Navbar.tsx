import { motion } from "framer-motion";

const links = ["New Drops", "Men", "Women", "Collections", "Story"];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display text-2xl tracking-widest">
          <span className="inline-block h-2 w-2 rounded-full bg-primary glow-red" />
          SOLE
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button className="text-sm text-muted-foreground hover:text-foreground transition">Search</button>
          <button className="relative rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform">
            Bag · 2
          </button>
        </div>
      </div>
    </motion.header>
  );
}
