export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-3xl tracking-widest flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            SOLE
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Premium sneakers crafted for athletes, designed for legends.
          </p>
        </div>
        {[
          { h: "Shop", l: ["New Drops", "Basketball", "Running", "Lifestyle"] },
          { h: "Company", l: ["Story", "Athletes", "Sustainability", "Careers"] },
          { h: "Support", l: ["Help Center", "Shipping", "Returns", "Contact"] },
        ].map((col) => (
          <div key={col.h}>
            <div className="text-xs uppercase tracking-widest text-foreground mb-4">{col.h}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.l.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-foreground transition">{i}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
        <div>© 2026 SOLE. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
