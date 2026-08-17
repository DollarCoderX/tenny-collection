import { createFileRoute, Link } from "@tanstack/react-router";
import storyImage from "@/assets/story.jpg";
import bannerImage from "@/assets/banner.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Tenny Collection" },
      {
        name: "description",
        content:
          "Tenny Collection curates bags, slippers and accessories for women who want elegance to feel effortless.",
      },
      { property: "og:title", content: "Our Story — Tenny Collection" },
      {
        property: "og:description",
        content: "Why Tenny Collection exists, and how each piece is selected.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const sections = [
  {
    title: "Our Philosophy",
    body: "We believe elegance should feel effortless — pieces you reach for without thinking, that still look considered when you arrive. Everything we stock has to pass that test first.",
  },
  {
    title: "What We Offer",
    body: "Structured totes and everyday handbags, quilted slippers and refined slides, plus the small accessories that finish a look. New pieces arrive in small, thoughtful drops.",
  },
  {
    title: "Why Tenny Collection",
    body: "Careful selection, honest pricing in Naira, and personal service. We answer every message ourselves, and we help you choose the right piece rather than the loudest one.",
  },
];

function AboutPage() {
  return (
    <div className="pb-28">
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <img
          src={bannerImage}
          alt="Woman carrying a Tenny Collection handbag"
          width={1920}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] sm:text-7xl">
            Elegance should feel effortless.
          </h1>
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <img
            src={storyImage}
            alt="Tenny Collection handbag styled in a warm interior"
            loading="lazy"
            width={1104}
            height={1312}
            className="rounded-[2rem] object-cover shadow-soft"
          />
        </Reveal>
        <Reveal delay={100} className="space-y-5">
          <p className="eyebrow">Where it began</p>
          <h2 className="font-display text-4xl sm:text-5xl">
            Built around how women actually dress.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Tenny Collection started with a simple frustration: finding bags and slippers that felt
            elevated without the price of a designer label, and without the wear-and-tear of fast
            fashion. So we started sourcing pieces ourselves — testing the hardware, the stitching,
            the way a strap sits on the shoulder after a long day.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Today we serve women across Nigeria who want their accessories to say something quiet
            and confident. Each drop is small on purpose, so nothing in the collection feels
            everywhere.
          </p>
          <Link
            to="/shop"
            className="inline-grid h-12 place-items-center rounded-full bg-primary px-8 text-sm text-primary-foreground"
          >
            Shop the collection
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <article className="h-full rounded-3xl border border-border/60 bg-card p-8 shadow-soft">
                <h2 className="font-display text-3xl">{s.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
