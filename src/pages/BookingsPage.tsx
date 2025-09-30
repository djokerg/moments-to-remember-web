import { useEffect, useState } from "react";
import { listOrders, setOrderStatus } from "../utils/orders";
import type { OrderItem } from "../utils/orders";
import { Check, X } from "lucide-react";
import { addNotification } from "../utils/notifications";

export default function BookingsPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    setOrders(listOrders().filter((o) => o.status === "pending"));
  }, []);

  function handleSetStatus(id: string, status: "approved" | "denied") {
    setOrderStatus(id, status);
    const fresh = listOrders();
    const order = fresh.find((o) => o.id === id);
    if (order && status === "approved") {
      addNotification({
        username: order.username,
        title: "Vaša porudžbina je odobrena",
        message: `Ponuda: ${order.title} | Datum: ${order.date} | Gostiju: ${
          order.guests
        } | Cena: ${order.price.toFixed(2)} €`,
      });
    }
    setOrders(fresh.filter((o) => o.status === "pending"));
  }

  return (
    <div className="flex items-start justify-center p-6 pt-12 sm:pt-16">
      <div className="w-full max-w-6xl text-white">
        <h1 className="m-0 mb-4 text-2xl font-semibold">Zakazivanja</h1>
        {orders.length === 0 ? (
          <div className="rounded-xl border border-[#2a2a2a] bg-white/5 p-4 text-white/80">
            Trenutno nema zakazivanja.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
            <table className="min-w-full border-collapse">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-medium">
                    Kupac
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium">
                    Ponuda
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium">
                    Datum
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium">
                    Gostiju
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium">
                    Cena
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-3 py-2 text-right text-sm font-medium">
                    Akcije
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-[#2a2a2a]">
                    <td className="px-3 py-2 text-sm">{o.username}</td>
                    <td className="px-3 py-2 text-sm">{o.title}</td>
                    <td className="px-3 py-2 text-sm">{o.date}</td>
                    <td className="px-3 py-2 text-sm">{o.guests}</td>
                    <td className="px-3 py-2 text-sm">
                      {o.price.toFixed(2)} €
                    </td>
                    <td className="px-3 py-2 text-sm capitalize">{o.status}</td>
                    <td className="px-3 py-2">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleSetStatus(o.id, "approved")}
                          className="rounded-lg bg-green-600/80 p-2 hover:bg-green-600"
                          aria-label="Odobri"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleSetStatus(o.id, "denied")}
                          className="rounded-lg bg-red-600/80 p-2 hover:bg-red-600"
                          aria-label="Odbij"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
