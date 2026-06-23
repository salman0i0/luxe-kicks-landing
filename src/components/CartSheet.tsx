import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Truck, CheckCircle2, Lock, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CheckoutStep = "cart" | "shipping" | "payment" | "success";

export function CartSheet() {
  const { isOpen, closeCart, items, removeItem, updateQty, subtotal, clear } = useCart();
  
  // Checkout flow state
  const [step, setStep] = useState<CheckoutStep>("cart");
  
  // Promo code state
  const [promoInput, setPromoInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");

  // Shipping details state
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});

  // Payment details state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

  // Reset checkout flow
  const handleClose = () => {
    closeCart();
    // Reset state after transition finishes
    setTimeout(() => {
      setStep("cart");
      setPromoInput("");
      setDiscountPercent(0);
      setAppliedPromo("");
      setPromoError("");
      setShippingForm({ fullName: "", email: "", address: "", city: "", postalCode: "" });
      setPaymentForm({ cardNumber: "", expiry: "", cvc: "" });
      setShippingErrors({});
      setPaymentErrors({});
    }, 300);
  };

  // Promo code handler
  const handleApplyPromo = () => {
    setPromoError("");
    if (promoInput.trim().toUpperCase() === "LUXE20") {
      setDiscountPercent(0.2);
      setAppliedPromo("LUXE20");
      setPromoInput("");
    } else {
      setPromoError("Invalid discount code. Try 'LUXE20'.");
    }
  };

  const handleRemovePromo = () => {
    setDiscountPercent(0);
    setAppliedPromo("");
  };

  // Calculations
  const discountAmount = subtotal * discountPercent;
  const discountedSubtotal = subtotal - discountAmount;
  
  // Free shipping goal threshold
  const freeShippingThreshold = 120;
  const shippingCost = discountedSubtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 12;
  const total = discountedSubtotal + shippingCost;
  const progressToFreeShipping = Math.min(100, (discountedSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - discountedSubtotal;

  // Validation handlers
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!shippingForm.fullName.trim()) errors.fullName = "Full name is required";
    if (!shippingForm.email.trim() || !/\S+@\S+\.\S+/.test(shippingForm.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!shippingForm.address.trim()) errors.address = "Address is required";
    if (!shippingForm.city.trim()) errors.city = "City is required";
    if (!shippingForm.postalCode.trim()) errors.postalCode = "Postal code is required";

    if (Object.keys(errors).length > 0) {
      setShippingErrors(errors);
    } else {
      setShippingErrors({});
      setStep("payment");
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!paymentForm.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      errors.cardNumber = "Card number must be 16 digits";
    }
    if (!paymentForm.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      errors.expiry = "Use MM/YY format";
    }
    if (!paymentForm.cvc.match(/^\d{3,4}$/)) {
      errors.cvc = "CVC must be 3 or 4 digits";
    }

    if (Object.keys(errors).length > 0) {
      setPaymentErrors(errors);
    } else {
      setPaymentErrors({});
      setStep("success");
    }
  };

  const finishCheckout = () => {
    clear();
    handleClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : handleClose())}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-background border-l border-border text-foreground flex flex-col p-0 shadow-2xl z-[150]"
      >
        {/* HEADER */}
        <SheetHeader className="px-6 py-5 border-b border-border flex flex-row items-center gap-3">
          {step !== "cart" && step !== "success" && (
            <button
              onClick={() => setStep(step === "payment" ? "shipping" : "cart")}
              className="text-muted-foreground hover:text-foreground transition mr-1"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <SheetTitle className="font-display tracking-widest text-2xl flex items-center gap-2">
            {step === "cart" && (
              <>
                <ShoppingBag className="h-5 w-5 text-primary animate-pulse" />
                Your Bag · {items.length}
              </>
            )}
            {step === "shipping" && (
              <>
                <Truck className="h-5 w-5 text-primary" />
                Shipping Details
              </>
            )}
            {step === "payment" && (
              <>
                <CreditCard className="h-5 w-5 text-primary" />
                Secure Payment
              </>
            )}
            {step === "success" && (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Order Confirmed!
              </>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* CONTENT CONTAINER */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
          {/* STEP 1: CART OVERVIEW */}
          {step === "cart" && (
            <>
              {/* Free Shipping Progress Indicator */}
              {items.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-card/40 border border-border/80">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-2">
                    {shippingCost === 0 ? (
                      <span className="text-green-500 flex items-center gap-1.5">
                        🎉 You've unlocked free shipping!
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Spend <strong className="text-primary">${remainingForFreeShipping.toFixed(2)}</strong> more for free shipping
                      </span>
                    )}
                    <span className="text-muted-foreground text-xs font-mono">
                      ${discountedSubtotal.toFixed(0)} / ${freeShippingThreshold}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressToFreeShipping}%` }}
                      className={`h-full transition-colors duration-500 ${
                        shippingCost === 0 ? "bg-green-500" : "bg-primary"
                      }`}
                    />
                  </div>
                </div>
              )}

              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16 flex-1">
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
                <ul className="space-y-4 flex-1">
                  <AnimatePresence initial={false}>
                    {items.map((i) => (
                      <motion.li
                        key={`${i.product.id}-${i.size}`}
                        initial={{ opacity: 0, height: 0, y: 15 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, x: -30 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 rounded-2xl border border-border bg-card/50 p-3 overflow-hidden"
                      >
                        <div className="h-20 w-20 shrink-0 rounded-xl bg-background overflow-hidden grid place-items-center border border-border/40">
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
                              className="text-muted-foreground hover:text-primary p-1 transition-colors"
                              aria-label="Remove"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-border">
                              <button
                                onClick={() => updateQty(i.product.id, i.size, i.qty - 1)}
                                className="p-1.5 hover:text-primary transition-colors"
                                aria-label="Decrease"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="px-2 text-sm font-semibold font-mono">{i.qty}</span>
                              <button
                                onClick={() => updateQty(i.product.id, i.size, i.qty + 1)}
                                className="p-1.5 hover:text-primary transition-colors"
                                aria-label="Increase"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <p className="font-semibold font-mono">${i.product.price * i.qty}</p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </>
          )}

          {/* STEP 2: SHIPPING DETAILS */}
          {step === "shipping" && (
            <form onSubmit={handleShippingSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <label htmlFor="shipping-name" className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5 font-bold">
                    Full Name
                  </label>
                  <input
                    id="shipping-name"
                    type="text"
                    value={shippingForm.fullName}
                    onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="John Doe"
                  />
                  {shippingErrors.fullName && <p className="text-red-500 text-xs mt-1">{shippingErrors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="shipping-email" className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5 font-bold">
                    Email Address
                  </label>
                  <input
                    id="shipping-email"
                    type="email"
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="john@example.com"
                  />
                  {shippingErrors.email && <p className="text-red-500 text-xs mt-1">{shippingErrors.email}</p>}
                </div>

                <div>
                  <label htmlFor="shipping-address" className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5 font-bold">
                    Address
                  </label>
                  <input
                    id="shipping-address"
                    type="text"
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="123 Street Name"
                  />
                  {shippingErrors.address && <p className="text-red-500 text-xs mt-1">{shippingErrors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="shipping-city" className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5 font-bold">
                      City
                    </label>
                    <input
                      id="shipping-city"
                      type="text"
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition"
                      placeholder="New York"
                    />
                    {shippingErrors.city && <p className="text-red-500 text-xs mt-1">{shippingErrors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="shipping-zip" className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5 font-bold">
                      ZIP / Postal Code
                    </label>
                    <input
                      id="shipping-zip"
                      type="text"
                      value={shippingForm.postalCode}
                      onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition"
                      placeholder="10001"
                    />
                    {shippingErrors.postalCode && <p className="text-red-500 text-xs mt-1">{shippingErrors.postalCode}</p>}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-auto">
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary text-primary-foreground py-4 text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SECURE PAYMENT */}
          {step === "payment" && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Visual Premium Mock Card */}
                <div className="relative h-44 w-full rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-border p-5 text-white flex flex-col justify-between shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                  <div className="flex justify-between items-start">
                    <span className="font-display tracking-widest text-xl italic font-bold">L U X E</span>
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-mono text-base tracking-widest sm:text-lg">
                      {paymentForm.cardNumber
                        ? paymentForm.cardNumber.replace(/(\d{4})/g, "$1 ").trim()
                        : "•••• •••• •••• ••••"}
                    </p>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                      <div>
                        <p className="text-[8px]">Cardholder</p>
                        <p className="text-white truncate max-w-[180px]">{shippingForm.fullName || "Your Name"}</p>
                      </div>
                      <div>
                        <p className="text-[8px]">Expires</p>
                        <p className="text-white">{paymentForm.expiry || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="card-number" className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5 font-bold">
                      Card Number
                    </label>
                    <input
                      id="card-number"
                      type="text"
                      maxLength={19}
                      value={paymentForm.cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setPaymentForm({ ...paymentForm, cardNumber: val });
                      }}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition font-mono"
                      placeholder="1234 5678 1234 5678"
                    />
                    {paymentErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{paymentErrors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="card-expiry" className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5 font-bold">
                        Expiry Date
                      </label>
                      <input
                        id="card-expiry"
                        type="text"
                        maxLength={5}
                        value={paymentForm.expiry}
                        onChange={(e) => {
                          let val = e.target.value;
                          if (val.length === 2 && !val.includes("/")) {
                            val = val + "/";
                          }
                          setPaymentForm({ ...paymentForm, expiry: val });
                        }}
                        className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition font-mono"
                        placeholder="MM/YY"
                      />
                      {paymentErrors.expiry && <p className="text-red-500 text-xs mt-1">{paymentErrors.expiry}</p>}
                    </div>

                    <div>
                      <label htmlFor="card-cvc" className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5 font-bold">
                        CVC Code
                      </label>
                      <input
                        id="card-cvc"
                        type="password"
                        maxLength={4}
                        value={paymentForm.cvc}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setPaymentForm({ ...paymentForm, cvc: val });
                        }}
                        className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition font-mono"
                        placeholder="•••"
                      />
                      {paymentErrors.cvc && <p className="text-red-500 text-xs mt-1">{paymentErrors.cvc}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-auto">
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary text-primary-foreground py-4 text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Pay Now · ${total.toFixed(2)}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: ORDER SUCCESS */}
          {step === "success" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="h-20 w-20 rounded-full bg-green-500/10 border border-green-500 grid place-items-center text-green-500 mb-6"
              >
                <CheckCircle2 className="h-10 w-10" />
              </motion.div>
              <h3 className="font-display text-2xl sm:text-3xl tracking-wide">THANK YOU FOR YOUR ORDER!</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                Your order has been received and is being prepared for shipment. A receipt was sent to <span className="text-foreground font-semibold">{shippingForm.email}</span>.
              </p>

              <div className="w-full rounded-2xl bg-card border border-border mt-8 p-4 text-left space-y-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold border-b border-border pb-2">Order Summary</p>
                <div className="text-xs space-y-2 max-h-36 overflow-y-auto font-mono">
                  {items.map((i) => (
                    <div key={`${i.product.id}-${i.size}`} className="flex justify-between">
                      <span className="truncate max-w-[200px]">{i.product.name} (x{i.qty})</span>
                      <span>${i.product.price * i.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-2 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount (LUXE20)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "FREE" : `$${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold pt-1 text-foreground">
                    <span>Total Paid</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={finishCheckout}
                className="w-full mt-8 rounded-full bg-primary text-primary-foreground py-4 text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition"
              >
                Return to Shop
              </button>
            </div>
          )}
        </div>

        {/* FOOTER STATS & CHECKOUT BUTTON (STEP 1 ONLY) */}
        {step === "cart" && items.length > 0 && (
          <SheetFooter className="px-6 py-5 border-t border-border bg-card/30 flex flex-col gap-3 sm:flex-col">
            {/* Promo code wrapper */}
            <div className="pb-2 border-b border-border/50">
              {appliedPromo ? (
                <div className="flex items-center justify-between text-xs bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-green-400">
                  <span className="flex items-center gap-1.5">
                    <Percent className="h-3.5 w-3.5" />
                    Code <strong>{appliedPromo}</strong> applied (-20%)
                  </span>
                  <button
                    onClick={handleRemovePromo}
                    className="underline text-muted-foreground hover:text-foreground hover:no-underline font-semibold ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="PROMO CODE"
                      className="flex-1 bg-card border border-border rounded-lg px-3 py-1.5 text-xs uppercase tracking-widest outline-none focus:border-primary/80 transition"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="bg-card hover:bg-border border border-border hover:border-muted-foreground text-foreground rounded-lg px-3 text-xs uppercase tracking-widest font-semibold transition"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-red-500 text-[10px]">{promoError}</p>}
                </div>
              )}
            </div>

            <div className="space-y-1.5 text-sm font-mono">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-border text-foreground font-sans">
                <span>Total</span>
                <span className="font-mono">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setStep("shipping")}
              className="w-full rounded-full bg-primary text-primary-foreground px-6 py-4 text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" />
              Checkout Securely
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
