import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { QuickViewDialog } from "./QuickViewDialog";
import { CATEGORIES, getByCategory, type Category, type Product } from "@/lib/products";

export function ProductGrid() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [quick, setQuick] = useState<Product | null>(null);
  const list = getByCategory(filter);

  return (
    <section id="shop" className="relative py-20 sm:py-28 lg:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-3">Featured Drops</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-none">
              The Lineup.
            </h2>
          </div>
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
        </motion.div>

        {list.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No shoes in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onQuickView={setQuick} />
            ))}
          </div>
        )}
      </div>

      <QuickViewDialog product={quick} open={!!quick} onOpenChange={(o) => !o && setQuick(null)} />
    </section>
  );
}
