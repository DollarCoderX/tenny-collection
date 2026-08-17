import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import spotlightImage from "@/assets/spotlight.jpg";
import { formatNaira, getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const specs = [
  { label: "Structured build", value: "Holds its shape all day" },
  { label: "Everyday capacity", value: 'Fits a 13" laptop' },
  { label: "Finish", value: "Soft grained, wipe clean" },
];

export function Spotlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { addItem } = useCart();
  const product = getProduct("tenny-signature-tote");
  const [color, setColor] = useState(product?.colors[0] ?? "Sand");

  useEffect(() => {
    const onScroll = () => {
      const node = sectionRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const value = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(value);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!product) return null;

  const scale = 0.86 + progress * 0.2;

  return (
    <section ref={sectionRef} className="relative h-[240vh] bg-secondary/40">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p
              className="eyebrow transition-all duration-500"
              style={{
                opacity: progress > 0.1 ? 1 : 0,
                transform: `translateY(${progress > 0.1 ? 0 : 14}px)`,
              }}
            >
              Signature piece
            </p>
            <h2
              className="mt-3 font-display text-4xl transition-all duration-700 sm:text-6xl"
              style={{
                opacity: progress > 0.15 ? 1 : 0,
                transform: `translateY(${progress > 0.15 ? 0 : 20}px)`,
              }}
            >
              {product.name}
            </h2>
            <ul className="mt-8 space-y-3">
              {specs.map((spec, i) => (
                <li
                  key={spec.label}
                  className="flex items-baseline gap-4 border-b border-border/60 pb-3 transition-all duration-700"
                  style={{
                    opacity: progress > 0.28 + i * 0.12 ? 1 : 0,
                    transform: `translateY(${progress > 0.28 + i * 0.12 ? 0 : 16}px)`,
                  }}
                >
                  <span className="w-40 shrink-0 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    {spec.label}
                  </span>
                  <span className="text-sm">{spec.value}</span>
                </li>
              ))}
            </ul>

            <div
              className="mt-8 transition-all duration-700"
              style={{
                opacity: progress > 0.62 ? 1 : 0,
                transform: `translateY(${progress > 0.62 ? 0 : 16}px)`,
              }}
            >
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={cn(
                      "h-10 rounded-full border px-4 text-xs tracking-wide transition-colors",
                      color === c
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "border-border hover:bg-secondary",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <span className="text-xl font-semibold">{formatNaira(product.price)}</span>
                <button
                  type="button"
                  onClick={() => {
                    addItem(product.slug, color, 1);
                    toast.success(`${product.name} added to your bag`);
                  }}
                  className="h-12 rounded-full bg-primary px-8 text-sm text-primary-foreground transition-transform active:scale-[0.98]"
                >
                  Add to Bag
                </button>
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="text-sm underline underline-offset-4"
                >
                  Full details
                </Link>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src={spotlightImage}
              alt={product.name}
              loading="lazy"
              width={1408}
              height={1408}
              className="mx-auto w-full max-w-md rounded-[2.5rem] object-cover will-change-transform"
              style={{ transform: `scale(${scale})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
