import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag } from "lucide-react";

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleBuy = () => {
    if (!size) return;
    addItem(product, size);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onOpenChange(false);
      setSize(null);
    }, 700);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setSize(null);
      }}
    >
      <DialogContent className="top-0 left-0 translate-x-0 translate-y-0 w-full h-full max-w-none md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:max-w-3xl md:w-[calc(100vw-2rem)] md:h-auto md:rounded-lg p-0 bg-background border-0 md:border border-border text-foreground overflow-y-auto md:overflow-hidden select-none">
        <div className="flex flex-col md:grid md:grid-cols-2 min-h-full">
          {/* Image */}
          <div className="relative h-[45vh] md:h-auto md:min-h-[480px] bg-gradient-to-br from-card to-background overflow-hidden flex-shrink-0">
            <div
              className={`absolute inset-0 ${
                product.accent === "red"
                  ? "bg-gradient-to-br from-primary/30"
                  : product.accent === "blue"
                  ? "bg-gradient-to-br from-accent/30"
                  : "bg-gradient-to-br from-white/15"
              } to-transparent`}
            />
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-contain p-8 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
            />
            <div className="absolute top-4 left-4 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest z-10">
              {product.tag}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col gap-5 md:overflow-y-auto md:max-h-[80vh] flex-1">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">{product.category}</p>
              <DialogTitle className="font-display text-3xl sm:text-4xl leading-none mt-1">
                {product.name}
              </DialogTitle>
              <p className="mt-2 text-xl font-semibold">${product.price}</p>
            </div>

            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </DialogDescription>

            <dl className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex gap-2">
                <dt className="uppercase tracking-widest text-muted-foreground min-w-[90px]">Colorway</dt>
                <dd className="text-foreground">{product.colorway}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="uppercase tracking-widest text-muted-foreground min-w-[90px]">Material</dt>
                <dd className="text-foreground">{product.material}</dd>
              </div>
            </dl>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Select size (US)</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-10 min-w-[44px] px-3 rounded-full border text-sm font-semibold transition ${
                      size === s
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col md:flex-row gap-3 pt-2 w-full">
              <button
                onClick={handleBuy}
                disabled={!size || added}
                className="w-full md:flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 text-xs font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Buy · ${product.price}
                  </>
                )}
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="w-full md:w-auto rounded-full border border-border bg-card/40 px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-card text-center"
              >
                Keep Browsing
              </button>
            </div>
            {!size && (
              <p className="text-xs text-muted-foreground -mt-2">Pick a size to add to bag.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
