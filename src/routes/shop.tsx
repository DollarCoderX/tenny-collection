import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LayoutGrid, List, Search } from "lucide-react";
import { z } from "zod";
import { products, formatNaira } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  category: z.enum(["all", "bags", "slippers"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop All — Tenny Collection" },
      {
        name: "description",
        content:
          "Browse Tenny Collection bags, tote bags and slippers. Filter by category and price, sorted the way you shop.",
      },
      { property: "og:title", content: "Shop All — Tenny Collection" },
      {
        property: "og:description",
        content: "Browse handbags, totes and slippers from Tenny Collection.",
      },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

type Sort = "featured" | "newest" | "price-asc" | "price-desc" | "bestsellers";

const MAX_PRICE = 100000;

function ShopPage() {
  const { category = "all" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<Sort>("featured");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const results = useMemo(() => {
    let list = products.filter((p) => (category === "all" ? true : p.category === category));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }
    list = list.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case "newest":
        return [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "bestsellers":
        return [...list].sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
      default:
        return list;
    }
  }, [category, query, maxPrice, sort]);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">The collection</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">Shop Tenny</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Bags and slippers selected for their finish, comfort and how easily they slip into your
            everyday. Prices in Nigerian Naira.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 rounded-3xl border border-border/60 bg-card p-5 shadow-soft lg:grid-cols-[1.4fr_1fr_1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bags, slippers…"
              className="h-12 w-full rounded-full border border-border bg-background pr-4 pl-11 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          <div className="flex items-center gap-2">
            {(["all", "bags", "slippers"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => navigate({ search: { category: c } })}
                className={cn(
                  "h-12 flex-1 rounded-full border text-sm capitalize transition-colors",
                  category === c
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border hover:bg-secondary",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="flex flex-col justify-center gap-1 px-1">
            <span className="text-xs text-muted-foreground">
              Max price: {formatNaira(maxPrice)}
            </span>
            <input
              type="range"
              min={20000}
              max={MAX_PRICE}
              step={2500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-rose-gold"
            />
          </label>

          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="sort">
              Sort products
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-12 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="bestsellers">Best sellers</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
            <div className="flex rounded-full border border-border p-1">
              <button
                type="button"
                aria-label="Grid view"
                aria-pressed={layout === "grid"}
                onClick={() => setLayout("grid")}
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full",
                  layout === "grid" && "bg-secondary",
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                aria-pressed={layout === "list"}
                onClick={() => setLayout("list")}
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full",
                  layout === "list" && "bg-secondary",
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "piece" : "pieces"}
        </p>

        {results.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border p-16 text-center">
            <p className="font-display text-3xl">Nothing matches that yet</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Try a different search, widen the price range or switch category.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setMaxPrice(MAX_PRICE);
                navigate({ search: { category: "all" } });
              }}
              className="mt-6 h-12 rounded-full bg-primary px-8 text-sm text-primary-foreground"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "mt-8 grid gap-6",
              layout === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
            )}
          >
            {results.map((product, i) => (
              <Reveal key={product.slug} delay={i * 60}>
                <ProductCard product={product} layout={layout} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}