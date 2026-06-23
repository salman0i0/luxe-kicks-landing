import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { ProductCard, type Product } from "@/components/ProductCard";
import j1 from "@/assets/jordan-1.png";
import j2 from "@/assets/jordan-2.png";
import j3 from "@/assets/jordan-3.png";
import j4 from "@/assets/jordan-4.png";

export const Route = createFileRoute("/new-drops")({
  head: () => ({
    meta: [
      { title: "New Drops — SOLE | High-Top Legends" },
      {
        name: "description",
        content:
          "Fresh high-top silhouettes engineered for the court and the streets. Limited drops, premium leather, signature SOLE craft.",
      },
      { property: "og:title", content: "New Drops — SOLE" },
      {
        property: "og:description",
        content: "Fresh high-top silhouettes. Limited drops. Premium leather.",
      },
    ],
  }),
  component: NewDrops,
});

const drops: Product[] = [
  { id: "j1", name: "Air Legacy '85 Bred", tag: "Just Dropped", price: 229, image: j1, accent: "red" },
  { id: "j2", name: "Royal Court High", tag: "Members First", price: 219, image: j2, accent: "blue" },
  { id: "j3", name: "Panda Concord", tag: "Restock", price: 199, image: j3, accent: "white" },
  { id: "j4", name: "Crimson Flight V", tag: "Limited", price: 249, image: j4, accent: "red" },
];

function NewDrops() {
  return (
    <div className="grain relative min-h-screen bg-background text-foreground">
      <Cursor />
      <Navbar />

      <main className="pt-24">
        {/* Hero strip */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg" />
          <div className="absolute inset-0 hero-glow" />
          <div className="pointer-events-none absolute inset-x-0 top-0 select-none text-center">
            <h2 className="font-display text-[18vw] leading-none text-white/[0.05] tracking-tighter">
              DROPS
            </h2>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.4em] text-primary"
            >
              Volume 24 · Q2 Drops
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.9]"
            >
              New Drops.
              <br />
              <span className="text-primary">Built To Fly.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 max-w-xl mx-auto text-muted-foreground"
            >
              Four signature high-tops crafted for the next generation of court legends.
              Premium leather. Air-tuned cushioning. Every pair numbered.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-3 justify-center"
            >
              <Link
                to="/"
                className="rounded-full border border-border bg-card/40 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-card"
              >
                ← Back Home
              </Link>
              <a
                href="#lineup"
                className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest hover:scale-105 transition"
              >
                See Lineup
              </a>
            </motion.div>
          </div>
        </section>

        {/* Lineup */}
        <section id="lineup" className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs uppercase tracking-widest text-accent mb-3">The Lineup</p>
                <h2 className="font-display text-4xl sm:text-5xl">High-Top Legends.</h2>
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {drops.length} Silhouettes · Numbered
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {drops.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Spotlight */}
        <section className="relative py-20 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[420px] flex items-center justify-center"
            >
              <div className="absolute h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
              <img
                src={j1}
                alt="Air Legacy '85 Bred"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative drop-shadow-[0_40px_40px_rgba(0,0,0,0.7)]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs uppercase tracking-widest text-primary mb-3">Spotlight</p>
              <h3 className="font-display text-5xl sm:text-6xl leading-none">
                Air Legacy <span className="text-primary">'85 Bred.</span>
              </h3>
              <p className="mt-6 text-muted-foreground max-w-md">
                A reissue of the silhouette that started a movement. Hand-finished red leather,
                encapsulated Air unit, and a heritage rubber outsole tuned for hardwood traction.
              </p>
              <div className="mt-8 flex gap-4">
                <button className="rounded-full bg-primary text-primary-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest hover:scale-105 transition">
                  Reserve · $229
                </button>
                <button className="rounded-full border border-border bg-card/40 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-card">
                  Size Guide
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
