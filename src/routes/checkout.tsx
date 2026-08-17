import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  MessageCircle,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";
import {
  buildOrderRequestMessage,
  getWhatsAppOrderUrl,
  WHATSAPP_PHONE_DISPLAY,
} from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout - Tenny Collection" },
      {
        name: "description",
        content: "Complete your Tenny Collection order with delivery details.",
      },
      { property: "og:title", content: "Checkout - Tenny Collection" },
      { property: "og:description", content: "Complete your Tenny Collection order." },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

const states = [
  "Lagos",
  "Abuja (FCT)",
  "Oyo",
  "Ogun",
  "Rivers",
  "Kano",
  "Kaduna",
  "Enugu",
  "Anambra",
  "Delta",
  "Other",
];

const field =
  "h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function CheckoutPage() {
  const { items, subtotal, deliveryFee, total } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const read = (name: string) => String(form.get(name) ?? "").trim();
    const message = buildOrderRequestMessage({
      name: read("name"),
      email: read("email"),
      phone: read("phone"),
      city: read("city"),
      state: read("state"),
      address: read("address"),
      notes: read("notes"),
      items,
      subtotal,
      deliveryFee,
      total,
    });

    setSubmitting(true);
    window.open(getWhatsAppOrderUrl(message), "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      toast.success("Your WhatsApp order request is ready to send.");
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 pt-40 pb-32 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add something you love before heading to checkout.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-grid h-12 place-items-center rounded-full bg-primary px-8 text-sm text-primary-foreground"
        >
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h1 className="font-display text-5xl">Checkout</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Delivery across Nigeria. Submit your details and send the drafted order request directly
          to WhatsApp.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-3xl border border-border/60 bg-card p-6 shadow-soft"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-2 block text-muted-foreground">Full name</span>
                <input required name="name" autoComplete="name" className={field} />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-muted-foreground">Email</span>
                <input required type="email" name="email" autoComplete="email" className={field} />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-muted-foreground">Phone number</span>
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="080 0000 0000"
                  className={field}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-muted-foreground">City</span>
                <input required name="city" autoComplete="address-level2" className={field} />
              </label>
            </div>

            <label className="block text-sm">
              <span className="mb-2 block text-muted-foreground">Delivery address</span>
              <input required name="address" autoComplete="street-address" className={field} />
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-muted-foreground">State</span>
              <select required name="state" defaultValue="Lagos" className={field}>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-muted-foreground">Order notes (optional)</span>
              <textarea
                name="notes"
                rows={4}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>

            <div className="flex gap-3 rounded-2xl bg-secondary/60 p-4 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-rose-gold" />
              <p>
                Your order request will be drafted professionally for {WHATSAPP_PHONE_DISPLAY}. On
                mobile it opens WhatsApp; on desktop it opens WhatsApp Web.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-60"
            >
              <MessageCircle className="h-4 w-4" />
              {submitting ? "Preparing request..." : "Send order request on WhatsApp"}
            </button>

            {sent && (
              <div className="flex items-center gap-2 rounded-2xl border border-rose-gold/40 bg-blush-soft px-4 py-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-rose-gold" />
                WhatsApp opened with your order request. Review it, then tap send.
              </div>
            )}
          </form>

          <aside className="relative h-fit overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft lg:sticky lg:top-32">
            <div className="absolute -left-3 top-32 h-6 w-6 rounded-full bg-background" />
            <div className="absolute -right-3 top-32 h-6 w-6 rounded-full bg-background" />

            <div className="relative bg-primary px-6 py-5 text-primary-foreground">
              <div className="receipt-float absolute right-6 top-5 grid h-12 w-12 place-items-center rounded-full bg-primary-foreground/10">
                <Flame className="h-5 w-5" />
              </div>
              <p className="text-xs tracking-[0.24em] uppercase opacity-75">Order receipt</p>
              <h2 className="mt-2 font-display text-3xl">Tenny Collection</h2>
              <p className="mt-1 text-xs opacity-75">Request preview for WhatsApp checkout</p>
            </div>

            <div className="border-b border-dashed border-border px-6 py-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <ReceiptText className="h-4 w-4 text-rose-gold" />
                  Receipt No.
                </span>
                <span className="font-medium">TC-{String(items.length).padStart(2, "0")}</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <PackageCheck className="h-4 w-4 text-rose-gold" />
                  Status
                </span>
                <span className="receipt-pulse rounded-full bg-blush-soft px-3 py-1 text-xs text-accent-foreground">
                  Ready to send
                </span>
              </div>
            </div>

            <ul className="space-y-0 px-6">
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.color}`}
                  className="flex gap-3 border-b border-dashed border-border/80 py-4 last:border-b-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    loading="lazy"
                    width={120}
                    height={120}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.color} / Qty {item.quantity}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatNaira(item.product.price)} each
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatNaira(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="space-y-3 border-t border-dashed border-border px-6 py-5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd>{formatNaira(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Delivery fee</dt>
                <dd>{deliveryFee === 0 ? "Free" : formatNaira(deliveryFee)}</dd>
              </div>
              <div className="flex justify-between rounded-2xl bg-secondary px-4 py-3 text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatNaira(total)}</dd>
              </div>
            </dl>

            <div className="border-t border-dashed border-border px-6 py-5 text-center text-xs text-muted-foreground">
              Payment and delivery are confirmed through WhatsApp after availability is checked.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
