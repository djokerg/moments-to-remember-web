import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  clearNotificationsForUser,
  listNotificationsForUser,
} from "../utils/notifications";

type Item = ReturnType<typeof listNotificationsForUser>[number];

export default function NotificationsPage() {
  const { username, isAuthenticated } = useAuth();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (username) {
      setItems(listNotificationsForUser(username));
    }
  }, [username]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-start justify-center p-6 pt-12 sm:pt-16">
        <div className="w-full max-w-3xl text-white">
          <h1 className="m-0 mb-4 text-2xl font-semibold">Obaveštenja</h1>
          <p className="opacity-85">
            Morate biti prijavljeni da biste videli obaveštenja.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center p-6 pt-12 sm:pt-16">
      <div className="w-full max-w-4xl text-white">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="m-0 text-2xl font-semibold">Obaveštenja</h1>
          {items.length > 0 ? (
            <button
              onClick={() => {
                if (!username) return;
                clearNotificationsForUser(username);
                setItems([]);
              }}
              className="rounded-lg border border-[#2a2a2a] px-3 py-1.5 text-sm hover:bg-white/10"
            >
              Očisti sve
            </button>
          ) : null}
        </div>
        {items.length === 0 ? (
          <div className="rounded-xl border border-[#2a2a2a] bg-white/5 p-4 text-white/80">
            Nema novih obaveštenja.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((n) => (
              <div
                key={n.id}
                className="rounded-xl border border-[#2a2a2a] bg-white/5 p-4"
              >
                <div className="text-sm text-white/70">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
                <div className="mt-1 text-lg font-semibold">{n.title}</div>
                <div className="mt-1 text-white/90">{n.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
