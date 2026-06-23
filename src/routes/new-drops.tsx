import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewDialog } from "@/components/QuickViewDialog";
import { getNewDrops, type Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

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

function NewDrops() {
  const drops = getNewDrops();
  const spotlight = drops[0];
  const [quick, setQuick] = useState<Product | null>(null);
  const { addItem, openCart } = useCart();
  const [spotSize, setSpotSize] = useState<number | null>(null);

  return (
    <div className="grain relative min-h-screen bg-background text-foreground">
      <Cursor />
      <Navbar />

      <main className="pt-24">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg" />
          <div className="absolute inset-0 hero-glow" />
          <div className="pointer-events-none absolute inset-x-0 top-0 select-none text-center">
            <h2 className="font-display text-[18vw] leading-none text-white/[0.05] tracking-tighter">
              DROPS
            </h2>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 text-center">
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
              className="mt-4 font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.9]"
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
              Signature high-tops crafted for the next generation of court legends.
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

        <section id="lineup" className="relative py-16 sm:py-24 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs uppercase tracking-widest text-accent mb-3">The Lineup</p>
                <h2 className="font-display text-4xl sm:text-5xl">High-Top Legends.</h2>
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {drops.length} Silhouettes · Numbered
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {drops.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onQuickView={setQuick} />
              ))}
            </div>
          </div>
        </section>

        {spotlight && (
          <section className="relative py-16 sm:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative h-[320px] sm:h-[420px] flex items-center justify-center"
              >
                <div className="absolute h-72 w-72 sm:h-80 sm:w-80 rounded-full bg-primary/40 blur-3xl" />
                <img
                  src={spotlight.image}
                  alt={spotlight.name}
                  loading="lazy"
                  className="relative max-w-full max-h-full drop-shadow-[0_40px_40px_rgba(0,0,0,0.7)]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-xs uppercase tracking-widest text-primary mb-3">Spotlight</p>
                <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-none">
                  {spotlight.name}
                </h3>
                <p className="mt-6 text-muted-foreground max-w-md">{spotlight.description}</p>
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Size (US)</p>
                  <div className="flex flex-wrap gap-2">
                    {spotlight.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSpotSize(s)}
                        className={`h-10 min-w-[44px] px-3 rounded-full border text-sm font-semibold transition ${
                          spotSize === s
                            ? "bg-foreground text-background border-foreground"
                            : "border-border hover:border-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      if (!spotSize) return;
                      addItem(spotlight, spotSize);
                    }}
                    disabled={!spotSize}
                    className="rounded-full bg-primary text-primary-foreground px-6 sm:px-8 py-4 text-xs font-bold uppercase tracking-widest hover:scale-105 transition disabled:opacity-50"
                  >
                    Reserve · ${spotlight.price}
                  </button>
                  <button
                    onClick={openCart}
                    className="rounded-full border border-border bg-card/40 px-6 sm:px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-card"
                  >
                    View Bag
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <QuickViewDialog product={quick} open={!!quick} onOpenChange={(o) => !o && setQuick(null)} />
    </div>
  );
}
