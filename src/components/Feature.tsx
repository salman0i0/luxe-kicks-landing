import { motion } from "framer-motion";
import shoe from "@/assets/sneaker-5.png";

export function Feature() {
  return (
    <section id="story" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative h-[400px] sm:h-[500px] flex items-center justify-center order-2 lg:order-1"
        >
          <div className="absolute h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          <motion.img
            src={shoe}
            alt="Court Cobalt sneaker"
            width={800}
            height={800}
            className="relative drop-shadow-[0_40px_40px_rgba(0,0,0,0.6)]"
            whileHover={{ scale: 1.05, rotate: -8 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:order-2"
        >
          <p className="text-xs uppercase tracking-widest text-accent mb-3">Innovation Lab</p>
          <h2 className="font-display text-5xl sm:text-6xl leading-none">
            Cushioning that
            <br />
            <span className="text-accent">defies gravity.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            Our patented AeroCore foam absorbs impact and rebounds 40% faster than industry standard.
            Tested by athletes. Worn by legends.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              { v: "40%", l: "More energy return" },
              { v: "-22%", l: "Lighter than leather" },
              { v: "100K", l: "Wear cycles tested" },
              { v: "12mm", l: "Drop precision" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card/50 p-5">
                <div className="font-display text-3xl text-foreground">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
