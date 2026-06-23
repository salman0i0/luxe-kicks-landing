const items = [
  "Free Shipping over $120",
  "30-Day Returns",
  "Member Early Access",
  "Carbon-Neutral Delivery",
  "Lifetime Care",
];

export function Marquee() {
  const row = [...items, ...items, ...items];
  return (
    <div className="relative mt-12 sm:mt-16 lg:mt-20 border-y border-border bg-primary text-primary-foreground py-4 overflow-hidden">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-12 font-display tracking-widest text-lg">
            {t}
            <span className="text-primary-foreground/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
