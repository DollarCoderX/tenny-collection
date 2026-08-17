import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";

export const BRAND_EMAIL = "adewusirodiat8@gmail.com";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">Tenny Collection</p>
          <p className="mt-2 text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Bags · Slippers · Style
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Carefully selected bags, slippers and accessories for women who like their elegance
            effortless. Delivered across Nigeria.
          </p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-3 text-muted-foreground">
            <li>
              <Link to="/shop" className="transition-colors hover:text-foreground">
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                search={{ category: "bags" }}
                className="transition-colors hover:text-foreground"
              >
                Bags
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                search={{ category: "slippers" }}
                className="transition-colors hover:text-foreground"
              >
                Slippers
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-foreground">
                Terms
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <p className="eyebrow mb-4">Get in touch</p>
          <a
            href={`mailto:${BRAND_EMAIL}`}
            className="break-all text-muted-foreground transition-colors hover:text-foreground"
          >
            {BRAND_EMAIL}
          </a>
          <div className="mt-6 flex gap-3">
            <a
              href={`mailto:${BRAND_EMAIL}`}
              aria-label="Email Tenny Collection"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-secondary"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${BRAND_EMAIL}?subject=Instagram%20enquiry`}
              aria-label="Instagram enquiry by email"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-secondary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={getWhatsAppOrderUrl(
                "Hello Tenny Collection, I would like to make an order enquiry. Please assist me.",
              )}
              target="_blank"
              rel="noreferrer"
              aria-label="Send an order enquiry"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-secondary"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70 px-5 py-6 text-center text-xs text-muted-foreground sm:px-8">
        © {new Date().getFullYear()} Tenny Collection. All rights reserved.
      </div>
    </footer>
  );
}
