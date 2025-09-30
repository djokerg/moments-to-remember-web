export type OrderStatus = "pending" | "approved" | "denied";

export type OrderItem = {
  id: string; // order id
  username: string; // who placed the order
  offerId: string;
  title: string;
  price: number;
  date: string;
  guests: number;
  status: OrderStatus;
  createdAt: string;
};

const ORDERS_KEY = "demo-orders";

function readOrders(): OrderItem[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as OrderItem[]) : [];
  } catch {
    return [];
  }
}

function writeOrders(items: OrderItem[]) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function listOrders(): OrderItem[] {
  return readOrders().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createOrder(
  input: Omit<OrderItem, "id" | "status" | "createdAt">
): OrderItem {
  const items = readOrders();
  const order: OrderItem = {
    ...input,
    id: `or_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  items.push(order);
  writeOrders(items);
  return order;
}

export function setOrderStatus(id: string, status: OrderStatus) {
  const items = readOrders();
  const idx = items.findIndex((o) => o.id === id);
  if (idx !== -1) {
    items[idx] = { ...items[idx], status };
    writeOrders(items);
  }
}
