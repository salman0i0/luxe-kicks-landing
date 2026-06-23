import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProductGrid } from "@/components/ProductGrid";
import { Feature } from "@/components/Feature";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOLE — Step Into Greatness | Premium Sneakers" },
      {
        name: "description",
        content:
          "Discover premium sneakers engineered for performance and crafted for legends. Shop new drops, basketball, running, and lifestyle silhouettes.",
      },
      { property: "og:title", content: "SOLE — Step Into Greatness" },
      {
        property: "og:description",
        content: "Premium sneakers engineered for performance and crafted for legends.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain relative min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ProductGrid />
        <Feature />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
