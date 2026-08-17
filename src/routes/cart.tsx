import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Tenny Collection" },
      { name: "description", content: "Review the pieces in your Tenny Collection shopping bag." },
      { property: "og:title", content: "Your Bag — Tenny Collection" },
      { property: "og:description", content: "Review your Tenny Collection shopping bag." },
      { property: "og:url", content: "/cart" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, deliveryFee, total, updateQuantity, removeItem } = useCart();

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h1 className="font-display text-5xl">Your bag</h1>

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border p-16 text-center">
            <p className="font-display text-3xl">Nothing here yet</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Add a bag or a pair of slippers and they'll appear here.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-grid h-12 place-items-center rounded-full bg-primary px-8 text-sm text-primary-foreground"
            >
              Shop the collection
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.color}`}
                  className="grid grid-cols-[96px_1fr] gap-4 rounded-3xl border border-border/60 bg-card p-4 shadow-soft sm:grid-cols-[120px_1fr]"
                >
                  <Link to="/product/$slug" params={{ slug: item.slug }} className="block">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      loading="lazy"
                      width={240}
                      height={240}
                      className="aspect-square w-full rounded-2xl object-cover"
                    />
                  </Link>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          to="/product/$slug"
                          params={{ slug: item.slug }}
                          className="truncate font-display text-xl"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{item.color}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug, item.color)}
                        aria-label={`Remove ${item.product.name}`}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border hover:bg-secondary"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.slug, item.color, item.quantity - 1)}
                          className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.slug, item.color, item.quantity + 1)}
                          className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-semibold">
                        {formatNaira(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-3xl border border-border/60 bg-card p-6 shadow-soft lg:sticky lg:top-32">
              <h2 className="font-display text-2xl">Order summary</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Subtotal</dt>
                  <dd>{formatNaira(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Delivery estimate</dt>
                  <dd>{deliveryFee === 0 ? "Free" : formatNaira(deliveryFee)}</dd>
                </div>
                <div className="flex justify-between border-t border-border/70 pt-3 text-base font-semibold">
                  <dt>Total</dt>
                  <dd>{formatNaira(total)}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-6 grid h-13 place-items-center rounded-full bg-primary py-4 text-sm text-primary-foreground"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/shop"
                className="mt-3 grid place-items-center rounded-full border border-border py-4 text-sm"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
