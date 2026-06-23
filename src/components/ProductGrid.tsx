import { motion } from "framer-motion";
import { ProductCard, type Product } from "./ProductCard";
import s1 from "@/assets/sneaker-1.png";
import s2 from "@/assets/sneaker-2.png";
import s3 from "@/assets/sneaker-3.png";
import s4 from "@/assets/sneaker-4.png";
import s5 from "@/assets/sneaker-5.png";
import s6 from "@/assets/sneaker-6.png";

const products: Product[] = [
  { id: "1", name: "Air Legacy 01", tag: "New", price: 189, image: s1, accent: "red" },
  { id: "2", name: "Flux Runner", tag: "Hot", price: 159, image: s2, accent: "blue" },
  { id: "3", name: "Mono High", tag: "Essential", price: 139, image: s3, accent: "white" },
  { id: "4", name: "Strike White", tag: "Drop", price: 169, image: s4, accent: "red" },
  { id: "5", name: "Court Cobalt", tag: "Limited", price: 199, image: s5, accent: "blue" },
  { id: "6", name: "Retro Heat", tag: "Archive", price: 179, image: s6, accent: "red" },
];

export function ProductGrid() {
  return (
    <section id="shop" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-3">Featured Drops</p>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-none">
              The Lineup.
            </h2>
          </div>
          <div className="flex gap-2 text-xs uppercase tracking-widest">
            {["All", "Basketball", "Running", "Lifestyle"].map((c, i) => (
              <button
                key={c}
                className={`rounded-full border px-4 py-2 transition ${
                  i === 0
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
