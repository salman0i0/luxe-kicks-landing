import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import heroShoe from "@/assets/sneaker-hero.png";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const rotateY = useTransform(sx, [-1, 1], [-15, 15]);
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);
  const translateX = useTransform(sx, [-1, 1], [-30, 30]);
  const translateY = useTransform(sy, [-1, 1], [-20, 20]);

  useEffect(() => {
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
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 hero-glow" />

      {/* Huge bg type */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center">
        <h2 className="font-display text-[22vw] leading-none text-white/[0.04] tracking-tighter">
          SOLE
        </h2>
      </div>

      <div className="relative mx-auto max-w-7xl h-full px-6 grid lg:grid-cols-2 gap-6 items-center">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            New · Air Legacy Drop 24
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.9]"
          >
            Step Into
            <br />
            <span className="text-primary">Greatness.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 max-w-md mx-auto lg:mx-0 text-base text-muted-foreground"
          >
            Engineered silhouettes. Court-tested cushioning. Built for those who refuse to stand still.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a
              href="#shop"
              className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:scale-105 hover:glow-red"
            >
              Shop Now
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-8 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition hover:bg-card"
            >
              Watch Film
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 flex gap-8 justify-center lg:justify-start text-left"
          >
            {[
              { v: "120+", l: "Silhouettes" },
              { v: "4.9★", l: "Avg rating" },
              { v: "48h", l: "Free shipping" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl">{s.v}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Shoe */}
        <div className="relative h-[36vh] sm:h-[48vh] lg:h-[70vh] flex items-center justify-center overflow-hidden [perspective:1200px]">
          {/* Glow disc */}
          <div className="absolute h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute h-96 w-96 rounded-full bg-accent/20 blur-3xl translate-x-12 translate-y-12" />

          <motion.div
            style={{ rotateX, rotateY, x: translateX, y: translateY }}
            className="relative z-10"
          >
            <motion.img
              src={heroShoe}
              alt="Featured red and white high-top sneaker"
              width={1280}
              height={1024}
              className="animate-float drop-shadow-[0_40px_40px_rgba(0,0,0,0.7)] w-full max-w-[620px]"
            />
          </motion.div>

          {/* Floor reflection */}
          <div className="absolute bottom-0 h-24 w-3/4 rounded-[50%] bg-black/60 blur-2xl" />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground uppercase tracking-widest">
        Scroll
      </div>
    </section>
  );
}
