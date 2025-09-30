import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  clearCart,
  getCart,
  getCartTotal,
  removeFromCart,
} from "../utils/cart";
import { createOrder } from "../utils/orders";

export default function CartPage() {
  const { username } = useAuth();
  const [items, setItems] = useState(getCart());
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = useMemo(() => getCartTotal(), []);

  function handleRemove(id: string) {
    removeFromCart(id);
    setItems(getCart());
  }

  function handleCheckout() {
    if (items.length === 0) return;
    const user = username || "anon";
    for (const i of items) {
      createOrder({
        username: user,
        offerId: i.offerId,
        title: i.title,
        price: i.price,
        date: i.date,
        guests: i.guests,
      });
    }
    clearCart();
    setItems([]);
    setMessage("Uspešno ste izvršili kupovinu. Hvala!");
    setTimeout(() => setMessage(null), 4000);
  }

  return (
    <div className="flex items-start justify-center p-6 pt-12 sm:pt-16">
      <div className="w-full max-w-4xl">
        <h1 className="m-0 mb-4 text-2xl font-semibold text-white">Korpa</h1>
        {message ? (
          <div className="mb-3 rounded-lg bg-green-500/15 px-3 py-2 text-sm text-green-200">
            {message}
          </div>
        ) : null}
        <div className="rounded-2xl border border-[#2a2a2a] bg-white/5 p-4">
          {items.length === 0 ? (
            <div className="text-white/80">Vaša korpa je prazna.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((i) => (
                <div
                  key={i.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-[#2a2a2a] bg-white/5 p-3 text-white"
                >
                  <div>
                    <div className="font-semibold">{i.title}</div>
                    <div className="text-sm text-white/80">
                      Datum: {i.date} • Gostiju: {i.guests}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-semibold">{i.price.toFixed(2)} €</div>
                    <button
                      onClick={() => handleRemove(i.id)}
                      className="rounded-lg border border-[#2a2a2a] px-3 py-1.5 text-sm hover:bg-white/10"
                    >
                      Ukloni
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-white">
          <div className="text-lg font-semibold">
            Ukupno: {total.toFixed(2)} €
          </div>
          <button
            disabled={items.length === 0}
            onClick={handleCheckout}
            className="rounded-lg bg-[#1a9c5b] px-4 py-2.5 font-medium text-white hover:bg-[#20b46c] active:bg-[#158a4d] disabled:opacity-50"
          >
            Potvrdi kupovinu
          </button>
        </div>
      </div>
    </div>
  );
}
