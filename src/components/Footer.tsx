import { Link } from "@tanstack/react-router";

type Col = { h: string; l: { label: string; to: string; hash?: string }[] };

const cols: Col[] = [
  {
    h: "Shop",
    l: [
      { label: "New Drops", to: "/new-drops" },
      { label: "Collections", to: "/collections" },
      { label: "Men", to: "/", hash: "shop" },
      { label: "Women", to: "/", hash: "shop" },
    ],
  },
  {
    h: "Company",
    l: [
      { label: "Story", to: "/", hash: "story" },
      { label: "Athletes", to: "/", hash: "story" },
      { label: "Sustainability", to: "/", hash: "story" },
      { label: "Careers", to: "/", hash: "story" },
    ],
  },
  {
    h: "Support",
    l: [
      { label: "Help Center", to: "/collections" },
      { label: "Shipping", to: "/collections" },
      { label: "Returns", to: "/collections" },
      { label: "Contact", to: "/", hash: "story" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-3xl tracking-widest flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            SOLE
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Premium sneakers crafted for athletes, designed for legends.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.h}>
            <div className="text-xs uppercase tracking-widest text-foreground mb-4">{col.h}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.l.map((i) => (
                <li key={i.label}>
                  <Link to={i.to} hash={i.hash} className="hover:text-foreground transition">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
        <div>© 2026 SOLE. All rights reserved.</div>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-foreground">Privacy</Link>
          <Link to="/" className="hover:text-foreground">Terms</Link>
          <Link to="/" className="hover:text-foreground">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
