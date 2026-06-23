import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import heroShoe from "@/assets/sneaker-hero.png";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const rotateY = useTransform(sx, [-1, 1], [-12, 12]);
  const rotateX = useTransform(sy, [-1, 1], [8, -8]);
  const translateX = useTransform(sx, [-1, 1], [-20, 20]);
  const translateY = useTransform(sy, [-1, 1], [-14, 14]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden pt-20 sm:pt-16">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 hero-glow" />

      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center">
        <h2 className="font-display text-[26vw] sm:text-[22vw] leading-none text-white/[0.04] tracking-tighter">
          SOLE
        </h2>
      </div>

      <div className="relative mx-auto max-w-7xl min-h-[calc(100svh-5rem)] px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center py-8 lg:py-0">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            New · Air Legacy Drop 24
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 sm:mt-6 font-display leading-[0.9]"
            style={{ fontSize: "clamp(2.75rem, 11vw, 8rem)" }}
          >
            Step Into
            <br />
            <span className="text-primary">Greatness.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-4 sm:mt-6 max-w-md mx-auto lg:mx-0 text-sm sm:text-base text-muted-foreground"
          >
            Engineered silhouettes. Court-tested cushioning. Built for those who refuse to stand still.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
          >
            <a
              href="#shop"
              className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:scale-105 hover:glow-red"
            >
              Shop Now
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-foreground transition hover:bg-card"
            >
              Watch Film
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 sm:mt-12 flex gap-6 sm:gap-8 justify-center lg:justify-start text-left"
          >
            {[
              { v: "120+", l: "Silhouettes" },
              { v: "4.9★", l: "Avg rating" },
              { v: "48h", l: "Free shipping" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-xl sm:text-2xl">{s.v}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Shoe */}
        <div className="relative order-1 lg:order-2 h-[34vh] sm:h-[44vh] lg:h-[70vh] flex items-center justify-center overflow-hidden [perspective:1200px]">
          <div className="absolute h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-accent/20 blur-3xl translate-x-8 translate-y-8" />

          <motion.div
            style={{ rotateX, rotateY, x: translateX, y: translateY }}
            className="relative z-10 w-full flex items-center justify-center"
          >
            <motion.img
              src={heroShoe}
              alt="Featured red and white high-top sneaker"
              width={1280}
              height={1024}
              className="animate-float drop-shadow-[0_40px_40px_rgba(0,0,0,0.7)] w-[78%] sm:w-[70%] lg:w-full max-w-[620px]"
            />
          </motion.div>

          <div className="absolute bottom-2 sm:bottom-0 h-16 sm:h-24 w-3/4 rounded-[50%] bg-black/60 blur-2xl" />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest">
        Scroll
      </div>
    </section>
  );
}
