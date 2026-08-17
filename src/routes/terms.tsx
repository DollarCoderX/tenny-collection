import { createFileRoute } from "@tanstack/react-router";
import { BRAND_EMAIL } from "@/components/site/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Tenny Collection" },
      {
        name: "description",
        content: "Ordering, delivery, payment and returns terms for Tenny Collection.",
      },
      { property: "og:title", content: "Terms of Service — Tenny Collection" },
      { property: "og:description", content: "Ordering, delivery and returns terms." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-8">
      <h1 className="font-display text-5xl">Terms</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          All prices are listed in Nigerian Naira (₦) and include applicable taxes. Delivery fees
          are shown at checkout before you place an order.
        </p>
        <p>
          Orders are confirmed by email. Online card payment is not enabled yet, so our team will
          contact you with payment instructions after your order is submitted.
        </p>
        <p>
          Unused items in their original packaging may be returned within 7 days of delivery.
          Return shipping is covered by the customer unless the item arrived faulty.
        </p>
        <p>
          Product photography is representative; slight variation in colour can occur between
          screens and physical items.
        </p>
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${BRAND_EMAIL}`} className="underline underline-offset-4">
            {BRAND_EMAIL}
          </a>
          .
        </p>
      </div>
    </article>
  );
}