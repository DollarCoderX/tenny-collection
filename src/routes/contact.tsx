import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { BRAND_EMAIL } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Tenny Collection" },
      {
        name: "description",
        content:
          "Questions about an order, sizing or a piece you love? Email Tenny Collection at adewusirodiat8@gmail.com.",
      },
      { property: "og:title", content: "Contact — Tenny Collection" },
      { property: "og:description", content: "Get in touch with the Tenny Collection team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const field =
  "h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function ContactPage() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    setSending(true);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${BRAND_EMAIL}?subject=${encodeURIComponent(
      `Message from ${name}`,
    )}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Opening your email app to send the message.");
    }, 400);
  };

  return (
    <div className="pt-32 pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 max-w-2xl font-display text-5xl leading-tight sm:text-6xl">
            We'd love to hear from you.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Orders, sizing, delivery or styling — send us a note and we'll reply personally.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="space-y-5 rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:p-8"
            >
              <label className="block text-sm">
                <span className="mb-2 block text-muted-foreground">Name</span>
                <input required name="name" autoComplete="name" className={field} />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-muted-foreground">Email</span>
                <input required type="email" name="email" autoComplete="email" className={field} />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-muted-foreground">Message</span>
                <textarea
                  required
                  name="message"
                  rows={6}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="h-14 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-60"
              >
                {sending ? "Opening email…" : "Send Message"}
              </button>
            </form>
          </Reveal>

          <Reveal delay={100} className="space-y-4">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
              <Mail className="h-5 w-5 text-rose-gold" />
              <p className="mt-4 font-display text-2xl">Email us</p>
              <a
                href={`mailto:${BRAND_EMAIL}`}
                className="mt-2 block text-sm break-all text-muted-foreground underline-offset-4 hover:underline"
              >
                {BRAND_EMAIL}
              </a>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
              <Clock className="h-5 w-5 text-rose-gold" />
              <p className="mt-4 font-display text-2xl">Response time</p>
              <p className="mt-2 text-sm text-muted-foreground">
                We reply within 24 hours, Monday to Saturday.
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
              <MapPin className="h-5 w-5 text-rose-gold" />
              <p className="mt-4 font-display text-2xl">Delivery</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Nationwide delivery across Nigeria, 1–5 working days depending on your state.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
