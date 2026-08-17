import { useState } from "react";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import { toast } from "sonner";
import { formatNaira, getProduct, relatedProducts } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — Tenny Collection" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Tenny Collection` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} — Tenny Collection` },
        { property: "og:description", content: product.description.slice(0, 155) },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
    };
  },
  component: ProductPage,
  notFoundComponent: ProductNotFound,
});

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-40 text-center">
      <h1 className="font-display text-4xl">We couldn't find that piece</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        It may have sold out or moved. Browse the full collection instead.
      </p>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem, wishlist, toggleWishlist } = useCart();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors[0] ?? "Default");
  const [quantity, setQuantity] = useState(1);
  const wished = wishlist.includes(product.slug);
  const related = relatedProducts(product);

  const add = () => {
    addItem(product.slug, color, quantity);
    toast.success(`${product.name} (${color}) added to your bag`);
  };

  return (
    <div className="pt-28 pb-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <div className="group overflow-hidden rounded-[2rem] bg-blush-soft">
            <img
              src={product.images[activeImage]}
              alt={`${product.name} — view ${activeImage + 1}`}
              width={1000}
              height={1000}
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {product.images.length > 1 && (
            <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-colors",
                    activeImage === i ? "border-rose-gold" : "border-transparent",
                  )}
                >
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:pt-6">
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold">{formatNaira(product.price)}</span>
            {product.oldPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatNaira(product.oldPrice)}
              </span>
            )}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <p className="eyebrow mb-3">Colour</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-11 rounded-full border px-5 text-sm transition-colors",
                    color === c
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-border hover:bg-secondary",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="grid h-12 w-12 place-items-center rounded-full hover:bg-secondary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="grid h-12 w-12 place-items-center rounded-full hover:bg-secondary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => toggleWishlist(product.slug)}
              aria-pressed={wished}
              className="grid h-12 w-12 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
              aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
            >
              <Heart className={cn("h-4 w-4", wished && "fill-rose-gold text-rose-gold")} />
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={add}
              className="h-14 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => {
                addItem(product.slug, color, quantity);
                navigate({ to: "/checkout" });
              }}
              className="h-14 rounded-full border border-primary text-sm font-medium transition-colors hover:bg-secondary"
            >
              Buy Now
            </button>
          </div>

          <dl className="mt-10 space-y-4 border-t border-border/70 pt-8 text-sm">
            <div>
              <dt className="eyebrow mb-2">Product details</dt>
              <dd>
                <ul className="space-y-1.5 text-muted-foreground">
                  {product.details.map((d) => (
                    <li key={d}>· {d}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="flex gap-3 rounded-2xl bg-secondary/60 p-4">
              <Truck className="h-4 w-4 shrink-0 text-rose-gold" />
              <div>
                <dt className="font-medium">Shipping</dt>
                <dd className="text-muted-foreground">
                  Lagos delivery in 1–2 working days, nationwide in 2–5 working days. Free delivery
                  on orders above {formatNaira(100000)}.
                </dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl bg-secondary/60 p-4">
              <RotateCcw className="h-4 w-4 shrink-0 text-rose-gold" />
              <div>
                <dt className="font-medium">Returns</dt>
                <dd className="text-muted-foreground">
                  Unused items in original packaging can be returned within 7 days of delivery.
                  Email us to start a return.
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl">You may also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}