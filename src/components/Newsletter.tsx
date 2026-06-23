import { motion } from "framer-motion";

export function Newsletter() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 sm:p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          <div className="relative">
            <p className="text-xs uppercase tracking-widest text-primary mb-3">Members Only</p>
            <h2 className="font-display text-4xl sm:text-6xl leading-none">
              Get the drop first.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Early access to releases. No spam. Just heat.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="you@domain.com"
                className="flex-1 rounded-full bg-background/60 border border-border px-5 py-3 text-sm outline-none focus:border-primary transition"
              />
              <button
                type="submit"
                className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-widest hover:scale-105 transition"
              >
                Join
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
