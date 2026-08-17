import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, deliveryFee, total, updateQuantity, removeItem } =
    useCart();

  return (
    <div
      className={cn("fixed inset-0 z-[60]", isOpen ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close cart"
        onClick={closeCart}
        className={cn(
          "absolute inset-0 bg-foreground/25 backdrop-blur-[2px] transition-opacity duration-400",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-card shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-l-3xl",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-border/70 px-6 py-5">
          <h2 className="font-display text-2xl">Your bag</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="font-display text-2xl">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">
              Discover bags and slippers made for everyday elegance.
            </p>
            <Link
              to="/shop"
              onClick={closeCart}
              className="mt-2 grid h-12 w-full max-w-xs place-items-center rounded-full bg-primary text-sm text-primary-foreground"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.color}`}
                  className="grid grid-cols-[80px_1fr] gap-4 rounded-2xl border border-border/60 p-3"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    loading="lazy"
                    width={160}
                    height={160}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.color}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug, item.color)}
                        aria-label={`Remove ${item.product.name}`}
                        className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.slug, item.color, item.quantity - 1)}
                          className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.slug, item.color, item.quantity + 1)}
                          className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatNaira(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-3 border-t border-border/70 px-6 py-5">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery estimate</span>
                <span>{deliveryFee === 0 ? "Free" : formatNaira(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatNaira(total)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="grid h-12 place-items-center rounded-full bg-primary text-sm text-primary-foreground transition-transform active:scale-[0.98]"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/cart"
                onClick={closeCart}
                className="grid h-12 place-items-center rounded-full border border-border text-sm"
              >
                View cart
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
