import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Sprout, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type ProductCategory = "produce" | "tech";

interface Product {
  name: string;
  description: string;
  price: string;
  unit: string;
  category: ProductCategory;
  available: boolean;
}

// Edit this array to add/remove products — the grid adapts automatically.
const products: Product[] = [
  {
    name: "Sunflower Microgreens",
    description: "Nutty, crunchy, restaurant-grade. Harvested same morning.",
    price: "रू 250",
    unit: "per 100g tray",
    category: "produce",
    available: true,
  },
  {
    name: "Pea Shoots",
    description: "Sweet and tender — the chef favorite for plating.",
    price: "रू 300",
    unit: "per 100g tray",
    category: "produce",
    available: true,
  },
  {
    name: "Radish Mix",
    description: "Peppery purple-stem blend. Bold garnish, bolder flavor.",
    price: "रू 280",
    unit: "per 100g tray",
    category: "produce",
    available: true,
  },
  {
    name: "ESP32 Farm Starter Kit",
    description:
      "Pre-flashed board, soil moisture + DHT22 sensors, wiring, and setup guide in Nepali & English.",
    price: "रू 4,500",
    unit: "per kit",
    category: "tech",
    available: false,
  },
];

export function ShopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );

      const cards = gridRef.current?.querySelectorAll(".product-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: `top ${75 - i * 4}%`,
              end: `top ${45 - i * 4}%`,
              scrub: 0.4,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleOrder = (product: Product) => {
    if (!product.available) return;
    // TODO: replace with cart + eSewa/Khalti checkout flow
    window.location.href = `mailto:hello@aiqb.dev?subject=Order: ${encodeURIComponent(
      product.name
    )}`;
  };

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative z-[14] bg-background py-20 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div ref={headerRef} className="mb-14 lg:mb-20 max-w-2xl">
          <p className="text-mono text-xs tracking-[0.18em] text-white/50 uppercase mb-4">
            The Shop
          </p>
          <h2 className="text-4xl lg:text-5xl text-white font-display leading-tight mb-5">
            From our trays to your table.
          </h2>
          <p className="text-base text-white/60 font-body leading-relaxed">
            Order fresh greens for Kathmandu Valley delivery, or pick up the
            sensor kits we run our own farm on.{" "}
            <span className="text-white/80">
              eSewa and Khalti accepted at checkout.
            </span>
          </p>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {products.map((product) => (
            <GlassCard
              key={product.name}
              className="product-card flex flex-col p-6 min-h-[300px]"
            >
              {product.category === "produce" ? (
                <Sprout className="w-5 h-5 text-accent mb-4" strokeWidth={1.5} />
              ) : (
                <Cpu className="w-5 h-5 text-marigold mb-4" strokeWidth={1.5} />
              )}

              <h3 className="text-xl text-white font-display mb-2">
                {product.name}
              </h3>

              <p className="text-sm text-white/55 font-body leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="mt-auto">
                <p className="text-2xl text-white font-display">
                  {product.price}
                  <span className="text-xs text-white/40 font-body ml-2">
                    {product.unit}
                  </span>
                </p>

                <GlassButton
                  variant="small"
                  className="mt-4 w-full"
                  disabled={!product.available}
                  onClick={() => handleOrder(product)}
                >
                  {product.available ? "Order now" : "Coming soon"}
                </GlassButton>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Payment note */}
        <p className="text-mono text-[11px] tracking-[0.14em] text-white/30 uppercase mt-10 text-center">
          Payments via eSewa · Khalti · Cash on delivery (Kathmandu Valley)
        </p>
      </div>
    </section>
  );
}
