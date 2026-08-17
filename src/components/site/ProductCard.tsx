import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, Heart, Plus } from "lucide-react";
import { toast } from "sonner";
import { formatNaira, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function ProductCard({
  product,
  layout = "grid",
  className,
}: {
  product: Product;
  layout?: "grid" | "list";
  className?: string;
}) {
  const { addItem, wishlist, toggleWishlist } = useCart();
  const [quickView, setQuickView] = useState(false);
  const wished = wishlist.includes(product.slug);

  const add = () => {
    addItem(product.slug, product.colors[0] ?? "Default", 1);
    toast.success(`${product.name} added to your bag`);
  };

  return (
    <>
      <article
        className={cn(
          "group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift",
          layout === "list" && "grid grid-cols-[130px_1fr] sm:grid-cols-[200px_1fr]",
          className,
        )}
      >
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className={cn("relative block overflow-hidden bg-blush-soft", layout === "grid" && "aspect-4/5")}
          aria-label={product.name}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={1000}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 rounded-full bg-ivory/85 px-3 py-1 text-[0.65rem] tracking-[0.2em] uppercase backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </Link>

        <div className={cn("flex flex-col gap-3 p-5", layout === "list" && "justify-center")}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-display text-xl">{product.name}</h3>
              <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {product.category}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleWishlist(product.slug)}
              aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
              aria-pressed={wished}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
            >
              <Heart className={cn("h-4 w-4", wished && "fill-rose-gold text-rose-gold")} />
            </button>
          </div>

          {layout === "list" && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold">{formatNaira(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatNaira(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-1 flex gap-2">
            <button
              type="button"
              onClick={add}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-transform duration-300 active:scale-[0.97]"
            >
              <Plus className="h-4 w-4" /> Add to cart
            </button>
            <button
              type="button"
              onClick={() => setQuickView(true)}
              aria-label={`Quick view ${product.name}`}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>

      <Dialog open={quickView} onOpenChange={setQuickView}>
        <DialogContent className="max-w-3xl overflow-hidden rounded-3xl border-border/60 bg-card p-0">
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <div className="grid gap-0 sm:grid-cols-2">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              width={1000}
              height={1000}
              className="h-64 w-full object-cover sm:h-full"
            />
            <div className="flex flex-col gap-4 p-6">
              <h3 className="font-display text-3xl">{product.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
              <p className="text-lg font-semibold">{formatNaira(product.price)}</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="rounded-full border border-border px-3 py-1 text-xs tracking-wide"
                  >
                    {color}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    add();
                    setQuickView(false);
                  }}
                  className="h-12 rounded-full bg-primary text-sm font-medium text-primary-foreground"
                >
                  Add to bag
                </button>
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  onClick={() => setQuickView(false)}
                  className="grid h-12 place-items-center rounded-full border border-border text-sm"
                >
                  View full details
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}