import signatureTote from "@/assets/p-signature-tote.jpg";
import cloudTote from "@/assets/p-monogram-tote.jpg";
import miniBag from "@/assets/p-mini-bag.jpg";
import roseSlippers from "@/assets/p-glass-wedge.jpg";
import luxeSlippers from "@/assets/p-luxe-slippers.jpg";
import bowSlides from "@/assets/p-coach-slippers.jpg";
import spotlight from "@/assets/spotlight.jpg";
import catNew from "@/assets/p-doodle-tote.jpg";

export type Category = "bags" | "slippers";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  images: string[];
  colors: string[];
  badge?: "New" | "Bestseller";
  bestseller?: boolean;
  createdAt: string;
  description: string;
  details: string[];
};

export const products: Product[] = [
  {
    slug: "tenny-signature-tote",
    name: "Tenny Signature Totes",
    category: "bags",
    price: 10000,
    oldPrice: 15000,
    images: [catNew],
    colors: ["Pink", "White", "Black"],
    badge: "Bestseller",
    bestseller: true,
    createdAt: "2026-06-02",
    description:
      "A roomy everyday tote in smooth grained leather-look finish, cut with clean lines and a structured base so it holds its shape from morning meetings to evening plans.",
    details: [
      "Dimensions: 34cm W x 30cm H x 13cm D",
      "Twin shoulder handles with reinforced stitching",
      "Lined interior with zip pocket and card slots",
      "Wipe clean with a soft dry cloth",
    ],
  },
  {
    slug: "tenny-cloud-tote",
    name: "Tenny Cloud Tote",
    category: "bags",
    price: 9000,
    images: [cloudTote],
    colors: ["Pink", "Black", "White", "Brown"],
    badge: "New",
    bestseller: true,
    createdAt: "2026-07-28",
    description:
      "Softly padded and quilted, the Cloud Tote is light on the shoulder and generous inside — made for the days you carry a little of everything.",
    details: [
      "Dimensions: 32cm W x 33cm H x 12cm D",
      "Padded quilted body with slim strap handles",
      "Internal slip pocket",
      "Spot clean only",
    ],
  },
  {
    slug: "classic-mini-bag",
    name: "Classic Mini Bag",
    category: "bags",
    price: 42500,
    oldPrice: 49000,
    images: [miniBag],
    colors: ["Ivory", "Blush"],
    bestseller: true,
    createdAt: "2026-05-14",
    description:
      "A compact flap bag with a fine chain strap. Small enough to feel considered, sized for your phone, cards and lipstick.",
    details: [
      "Dimensions: 19cm W x 13cm H x 7cm D",
      "Detachable chain shoulder strap",
      "Magnetic flap closure",
      "Dust bag included",
    ],
  },
  {
    slug: "rose-quilted-slippers",
    name: "Glass Whige Slippers",
    category: "slippers",
    price: 20000,
    oldPrice: 25000,
    images: [roseSlippers],
    colors: ["Black"],
    badge: "Bestseller",
    bestseller: true,
    createdAt: "2026-06-20",
    description:
      "Quilted uppers with a soft bow and a cushioned footbed. An easy slip-on that still looks put together.",
    details: [
      "Cushioned footbed",
      "Padded quilted upper with bow detail",
      "Available in sizes 37 to 42",
      "Indoor and light outdoor wear",
    ],
  },
  {
    slug: "everyday-luxe-slippers",
    name: "Everyday Luxe Slippers",
    category: "slippers",
    price: 21000,
    oldPrice: 26000,
    images: [luxeSlippers],
    colors: ["Cream", "Sand"],
    bestseller: true,
    createdAt: "2026-04-11",
    description:
      "A clean single-band slide with a contoured sole. Understated enough to wear with almost anything in your wardrobe.",
    details: [
      "Contoured moulded sole",
      "Smooth wide band upper",
      "Available in sizes 37 to 42",
      "Wipe clean",
    ],
  },
  {
    slug: "tenny-bow-slides",
    name: "Tenny Coach Slippers",
    category: "slippers",
    price: 12000,
    images: [bowSlides],
    colors: ["White", "Black", "Blue"],
    badge: "New",
    createdAt: "2026-08-05",
    description:
      "Satin-finish slides with a sculpted bow and a gentle pointed toe — the finishing touch for dressed-up evenings.",
    details: [
      "Satin-finish upper with sculpted bow",
      "Low block sole",
      "Available in sizes 37 to 42",
      "Store in the dust bag provided",
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const relatedProducts = (product: Product) =>
  products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

export const formatNaira = (value: number) =>
  `₦${value.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
