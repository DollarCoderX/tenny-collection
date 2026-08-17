import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Bags", to: "/shop", search: { category: "bags" } },
  { label: "Slippers", to: "/shop", search: { category: "slippers" } },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-panel border-b border-border/60 py-3" : "bg-transparent py-5",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:px-8"
      >
        <Link to="/" className="flex min-w-0 flex-col leading-none">
          <span className="font-display text-xl tracking-tight sm:text-2xl">Tenny Collection</span>
          <span className="mt-1 hidden text-[0.6rem] tracking-[0.32em] text-muted-foreground uppercase sm:block">
            Bags · Slippers · Style
          </span>
        </Link>

        <ul className="hidden items-center justify-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                search={("search" in link ? link.search : {}) as never}
                className="relative text-sm text-foreground/75 transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-rose-gold after:transition-all after:duration-300 hover:after:w-full"
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-foreground" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1 justify-self-end sm:gap-2">
          <Link
            to="/shop"
            aria-label="Search products"
            className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link
            to="/contact"
            aria-label="Account and support"
            className="hidden h-11 w-11 place-items-center rounded-full transition-colors hover:bg-secondary sm:grid"
          >
            <User className="h-[18px] w-[18px]" />
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open shopping bag, ${count} items`}
            className="relative grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute top-1.5 right-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-secondary lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="glass-panel mx-4 mt-4 space-y-1 rounded-3xl p-3 shadow-soft">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                search={("search" in link ? link.search : {}) as never}
                className="block rounded-2xl px-4 py-3 text-base transition-colors hover:bg-secondary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}