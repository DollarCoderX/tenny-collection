import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./products";

export type CartLine = {
  slug: string;
  color: string;
  quantity: number;
};

export type CartItem = CartLine & { product: Product };

type CartContextValue = {
  lines: CartLine[];
  items: CartItem[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: string, color: string, quantity?: number) => void;
  updateQuantity: (slug: string, color: string, quantity: number) => void;
  removeItem: (slug: string, color: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "tenny-cart";
const WISH_KEY = "tenny-wishlist";
export const DELIVERY_FEE = 3500;
export const FREE_DELIVERY_THRESHOLD = 100000;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawCart = localStorage.getItem(CART_KEY);
      if (rawCart) setLines(JSON.parse(rawCart));
      const rawWish = localStorage.getItem(WISH_KEY);
      if (rawWish) setWishlist(JSON.parse(rawWish));
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addItem = useCallback((slug: string, color: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.color === color);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug && l.color === color ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { slug, color, quantity }];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((slug: string, color: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => !(l.slug === slug && l.color === color))
        : prev.map((l) => (l.slug === slug && l.color === color ? { ...l, quantity } : l)),
    );
  }, []);

  const removeItem = useCallback((slug: string, color: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.color === color)));
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const items = lines
      .map((line) => {
        const product = products.find((p) => p.slug === line.slug);
        return product ? { ...line, product } : null;
      })
      .filter(Boolean) as CartItem[];

    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

    return {
      lines,
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clearCart: () => setLines([]),
      wishlist,
      toggleWishlist,
    };
  }, [lines, isOpen, wishlist, addItem, updateQuantity, removeItem, toggleWishlist]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
