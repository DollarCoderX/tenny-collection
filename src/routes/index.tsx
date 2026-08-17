import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero.jpg";
import catBags from "@/assets/cat-bags.jpg";
import catSlippers from "@/assets/cat-slippers.jpg";
import catNew from "@/assets/cat-new.jpg";
import storyImage from "@/assets/story.jpg";
import bannerImage from "@/assets/banner.jpg";
import ig1 from "@/assets/ig-1.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { Spotlight } from "@/components/site/Spotlight";
import { BRAND_EMAIL } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tenny Collection — Elegant Bags & Slippers for Women" },
      {
        name: "description",
        content:
          "Carry your style. Elegant handbags, tote bags and slippers curated by Tenny Collection, with delivery across Nigeria.",
      },
      { property: "og:title", content: "Tenny Collection — Carry Your Style" },
      {
        property: "og:description",
        content: "Elegant bags and effortless footwear for women who love to stand out.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const categories = [
  {
    title: "Bags",
    copy: "Carry confidence everywhere.",
    image: catBags,
    search: { category: "bags" as const },
  },
  {
    title: "Slippers",
    copy: "Comfort meets effortless style.",
    image: catSlippers,
    search: { category: "slippers" as const },
  },
  {
    title: "New Arrivals",
    copy: "Fresh pieces, made to be noticed.",
    image: catNew,
    search: { category: "all" as const },
  },
];

const socialImages = [ig1, ig2, ig3, ig4];

function Index() {
  const bestSellers = products.filter((p) => p.bestseller || p.badge);

  return (
    <>
      <Hero />

      <section
        className="mx-auto max-w-7xl px-5 py-24 sm:px-8"
        aria-labelledby="categories-heading"
      >
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Explore</p>
            <h2 id="categories-heading" className="mt-3 font-display text-4xl sm:text-5xl">
              Featured categories
            </h2>
          </div>
          <Link to="/shop" className="text-sm underline underline-offset-4">
            View everything
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 100}>
              <Link
                to="/shop"
                search={cat.search}
                className="group relative block overflow-hidden rounded-[2rem] shadow-soft transition-shadow duration-500 hover:shadow-lift"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="aspect-4/5 w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                  <h3 className="font-display text-3xl">{cat.title}</h3>
                  <p className="mt-1 text-sm opacity-90">{cat.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
                    Shop now
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-8" aria-labelledby="bestsellers-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Loved most</p>
              <h2 id="bestsellers-heading" className="mt-3 font-display text-4xl sm:text-5xl">
                Best sellers
              </h2>
            </div>
            <Link
              to="/shop"
              search={{ category: "all" }}
              className="text-sm underline underline-offset-4"
            >
              Shop all
            </Link>
          </Reveal>
        </div>

        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-8">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              className="w-[78vw] shrink-0 snap-start sm:w-[340px]"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <img
            src={storyImage}
            alt="Woman holding a Tenny Collection handbag"
            loading="lazy"
            width={1104}
            height={1312}
            className="rounded-[2rem] object-cover shadow-soft"
          />
        </Reveal>
        <Reveal delay={120} className="space-y-5">
          <p className="eyebrow">Brand story</p>
          <h2 className="font-display text-4xl sm:text-6xl">More than an accessory.</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Tenny Collection exists to help women express elegance, confidence and individuality
            through pieces chosen with care. Every bag and every pair is selected for its finish,
            its comfort and the way it quietly lifts an outfit.
          </p>
          <p className="font-display text-2xl">Discover your everyday luxury.</p>
          <Link
            to="/about"
            className="inline-grid h-12 place-items-center rounded-full bg-primary px-8 text-sm text-primary-foreground"
          >
            Our Story
          </Link>
        </Reveal>
      </section>

      <Spotlight />

      <section className="relative mt-16 flex min-h-[60vh] items-center overflow-hidden">
        <img
          src={bannerImage}
          alt="Tenny Collection editorial campaign"
          loading="lazy"
          width={1920}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/90 via-ivory/50 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
          <Reveal className="max-w-lg">
            <h2 className="font-display text-4xl leading-tight sm:text-6xl">
              Your Style. Your Statement.
            </h2>
            <Link
              to="/shop"
              className="mt-8 inline-grid h-13 place-items-center rounded-full bg-primary px-9 py-4 text-sm text-primary-foreground"
            >
              Shop Tenny Collection
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8" aria-labelledby="social-heading">
        <Reveal className="text-center">
          <p className="eyebrow">Community</p>
          <h2 id="social-heading" className="mt-3 font-display text-4xl sm:text-5xl">
            Follow the Tenny Girl.
          </h2>
          <a
            href={`mailto:${BRAND_EMAIL}?subject=Feature%20me%20on%20Tenny%20Collection`}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition-colors hover:bg-secondary"
          >
            <Instagram className="h-4 w-4" /> @TennyCollection
          </a>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {socialImages.map((img, i) => (
            <Reveal key={img} delay={i * 80}>
              <img
                src={img}
                alt="Tenny Collection styled by the community"
                loading="lazy"
                width={800}
                height={800}
                className="aspect-square w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <img
        src={heroImage}
        alt="Blush leather handbag and quilted slippers styled on ivory linen"
        width={1600}
        height={1200}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/70 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8">
        <div className="max-w-xl">
          <p className="reveal is-visible eyebrow">Tenny Collection</p>
          <h1
            className="reveal is-visible mt-5 font-display text-6xl leading-[0.98] sm:text-8xl"
            style={{ animationDelay: "120ms" }}
          >
            Carry Your Style.
          </h1>
          <p
            className="reveal is-visible mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
            style={{ animationDelay: "260ms" }}
          >
            Elegant bags and effortless footwear, curated for women who love to stand out.
          </p>
          <div
            className="reveal is-visible mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "380ms" }}
          >
            <Link
              to="/shop"
              className="grid h-14 place-items-center rounded-full bg-primary px-9 text-sm font-medium text-primary-foreground transition-transform duration-300 active:scale-[0.98]"
            >
              Shop Collection
            </Link>
            <Link
              to="/shop"
              search={{ category: "bags" }}
              className="grid h-14 place-items-center rounded-full border border-primary/30 bg-ivory/60 px-9 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-ivory"
            >
              Explore Bags
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're on the list — watch your inbox for new arrivals.");
    setEmail("");
  };

  return (
    <section className="bg-secondary/50 py-24">
      <Reveal className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        <p className="eyebrow">Newsletter</p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">Stay in the know.</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Be the first to discover new arrivals, exclusive drops and special offers.
        </p>
        <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <label className="flex-1">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-14 w-full rounded-full border border-border bg-background px-6 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <button
            type="submit"
            className="h-14 rounded-full bg-primary px-9 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]"
          >
            Subscribe
          </button>
        </form>
      </Reveal>
    </section>
  );
}
