import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewDialog } from "@/components/QuickViewDialog";
import { CATEGORIES, products, type Category, type Product } from "@/lib/products";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — SOLE | Every Silhouette" },
      {
        name: "description",
        content:
          "Browse the full SOLE collection — basketball, running, and lifestyle silhouettes engineered for performance and crafted for legends.",
      },
      { property: "og:title", content: "Collections — SOLE" },
      {
        property: "og:description",
        content: "Browse the full SOLE collection — every silhouette in one place.",
      },
    ],
  }),
  component: Collections,
});

function Collections() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [quick, setQuick] = useState<Product | null>(null);

  const list = useMemo(
    () => (filter === "All" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <div className="grain relative min-h-screen bg-background text-foreground">
      <Cursor />
      <Navbar />

      <main className="pt-24">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg" />
          <div className="absolute inset-0 hero-glow" />
          <div className="pointer-events-none absolute inset-x-0 top-0 select-none text-center">
            <h2 className="font-display text-[18vw] leading-none text-white/[0.04] tracking-tighter">
              ARCHIVE
            </h2>
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.4em] text-primary"
            >
              The Full Vault
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.9]"
            >
              Every <span className="text-primary">Silhouette.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 max-w-xl mx-auto text-muted-foreground"
            >
              Court icons, road runners, everyday staples. The complete SOLE catalog in one place.
            </motion.p>
          </div>
        </section>

        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`rounded-full border px-4 py-2 transition ${
                      filter === c
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {list.length} {list.length === 1 ? "pair" : "pairs"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onQuickView={setQuick} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <QuickViewDialog product={quick} open={!!quick} onOpenChange={(o) => !o && setQuick(null)} />
    </div>
  );
}
