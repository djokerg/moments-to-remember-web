export type CartItem = {
  id: string; // unique cart item id
  offerId: string;
  title: string;
  price: number;
  date: string; // ISO or yyyy-mm-dd
  guests: number;
  createdAt: string;
};

const CART_KEY = "demo-cart-items";

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function getCart(): CartItem[] {
  return readCart();
}

export function addToCart(item: Omit<CartItem, "id" | "createdAt">): CartItem {
  const items = readCart();
  const newItem: CartItem = {
    ...item,
    id: `ci_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  writeCart(items);
  return newItem;
}

export function removeFromCart(id: string) {
  const items = readCart().filter((i) => i.id !== id);
  writeCart(items);
}

export function clearCart() {
  writeCart([]);
}

export function getCartTotal(): number {
  return readCart().reduce((sum, i) => sum + i.price, 0);
}
