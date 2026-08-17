import { createFileRoute } from "@tanstack/react-router";
import { BRAND_EMAIL } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Tenny Collection" },
      {
        name: "description",
        content: "How Tenny Collection collects, uses and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — Tenny Collection" },
      { property: "og:description", content: "How we handle your personal information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-8">
      <h1 className="font-display text-5xl">Privacy Policy</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          We collect only the information needed to process and deliver your order: your name, email
          address, phone number and delivery address.
        </p>
        <p>
          Your details are never sold or shared for marketing by third parties. We share your
          delivery information with our courier partners solely to fulfil your order.
        </p>
        <p>
          Your shopping bag and saved items are stored in your own browser, not on our servers, and
          can be cleared at any time from your browser settings.
        </p>
        <p>
          If you'd like a copy of the data we hold about you, or want it deleted, email{" "}
          <a href={`mailto:${BRAND_EMAIL}`} className="underline underline-offset-4">
            {BRAND_EMAIL}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
