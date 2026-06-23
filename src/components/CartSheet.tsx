import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export function CartSheet() {
  const { isOpen, closeCart, items, removeItem, updateQty, subtotal, clear } = useCart();
  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : closeCart())}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-background border-l border-border text-foreground flex flex-col p-0"
      >
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-display tracking-widest text-2xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Bag · {items.length}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="h-20 w-20 rounded-full bg-card border border-border grid place-items-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-display text-xl">Your bag is empty</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add a pair to start your collection.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest hover:scale-105 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li
                  key={`${i.product.id}-${i.size}`}
                  className="flex gap-4 rounded-2xl border border-border bg-card/50 p-3"
                >
                  <div className="h-24 w-24 shrink-0 rounded-xl bg-background overflow-hidden grid place-items-center">
                    <img src={i.product.image} alt={i.product.name} className="h-full w-full object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-display text-lg leading-tight truncate">{i.product.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Size {i.size} · {i.product.colorway}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(i.product.id, i.size)}
                        className="text-muted-foreground hover:text-primary p-1"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          onClick={() => updateQty(i.product.id, i.size, i.qty - 1)}
                          className="p-2 hover:text-primary"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-2 text-sm font-semibold">{i.qty}</span>
                        <button
                          onClick={() => updateQty(i.product.id, i.size, i.qty + 1)}
                          className="p-2 hover:text-primary"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-semibold">${i.product.price * i.qty}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="px-6 py-5 border-t border-border bg-card/30 flex flex-col gap-3 sm:flex-col">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => {
                alert("Checkout coming soon — your bag is saved.");
              }}
              className="w-full rounded-full bg-primary text-primary-foreground px-6 py-4 text-xs font-bold uppercase tracking-widest hover:scale-[1.02] transition"
            >
              Checkout
            </button>
            <button
              onClick={clear}
              className="w-full text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition"
            >
              Clear bag
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
