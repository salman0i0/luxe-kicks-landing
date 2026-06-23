import { motion } from "framer-motion";

export type Product = {
  id: string;
  name: string;
  tag: string;
  price: number;
  image: string;
  accent: "red" | "blue" | "white";
};

const accentMap = {
  red: "from-primary/30",
  blue: "from-accent/30",
  white: "from-white/20",
};

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const glow =
    product.accent === "red"
      ? "group-hover:shadow-[0_0_60px_-10px_oklch(0.62_0.24_27/0.55)]"
      : product.accent === "blue"
      ? "group-hover:shadow-[0_0_60px_-10px_oklch(0.55_0.22_255/0.55)]"
      : "group-hover:shadow-[0_0_60px_-10px_oklch(0.95_0_0/0.35)]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 ${glow}`}
    >
      {/* Tag */}
      <div className="absolute top-4 left-4 z-10 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
        {product.tag}
      </div>

      {/* gradient bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accentMap[product.accent]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
        />
      </div>

      {/* Info */}
      <div className="relative p-5 flex items-end justify-between gap-4 border-t border-border">
        <div>
          <h3 className="font-display text-xl leading-tight">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">${product.price}</p>
        </div>
        <button className="rounded-full border border-border bg-background/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          Quick View
        </button>
      </div>
    </motion.article>
  );
}
