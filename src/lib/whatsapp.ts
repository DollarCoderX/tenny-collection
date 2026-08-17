import type { CartItem } from "./cart";
import { formatNaira } from "./products";

export const WHATSAPP_PHONE_DISPLAY = "+234 907 955 6869";
export const WHATSAPP_PHONE_E164 = "2349079556869";

export type OrderRequestDetails = {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  address: string;
  notes: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export function buildOrderRequestMessage({
  name,
  email,
  phone,
  city,
  state,
  address,
  notes,
  items,
  subtotal,
  deliveryFee,
  total,
}: OrderRequestDetails) {
  const lines = items.map(
    (item, index) =>
      `${index + 1}. ${item.product.name} (${item.color}) x ${item.quantity} - ${formatNaira(
        item.product.price * item.quantity,
      )}`,
  );

  return [
    "Hello Tenny Collection,",
    "",
    "I would like to place an order. Please confirm availability, payment details, and delivery timeline.",
    "",
    "Order request:",
    ...lines,
    "",
    `Subtotal: ${formatNaira(subtotal)}`,
    `Delivery: ${deliveryFee === 0 ? "Free" : formatNaira(deliveryFee)}`,
    `Total: ${formatNaira(total)}`,
    "",
    "Customer details:",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Delivery address: ${address}, ${city}, ${state}`,
    notes ? `Notes: ${notes}` : "Notes: None",
    "",
    "Thank you.",
  ].join("\n");
}

export function getWhatsAppOrderUrl(message: string) {
  const encodedMessage = encodeURIComponent(message);

  if (typeof window !== "undefined") {
    const isMobile =
      /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(window.navigator.userAgent) ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isMobile) {
      return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodedMessage}`;
    }
  }

  return `https://web.whatsapp.com/send?phone=${WHATSAPP_PHONE_E164}&text=${encodedMessage}`;
}
