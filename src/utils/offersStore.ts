import type { Offer } from "./offers";
import { OFFERS } from "./offers";

const OFFERS_KEY = "demo-offers-store";

function readOffers(): Offer[] {
  try {
    const raw = localStorage.getItem(OFFERS_KEY);
    return raw ? (JSON.parse(raw) as Offer[]) : [];
  } catch {
    return [];
  }
}

function writeOffers(items: Offer[]) {
  try {
    localStorage.setItem(OFFERS_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

function seedIfEmpty() {
  const existing = readOffers();
  if (!existing || existing.length === 0) {
    writeOffers(OFFERS);
  }
}

seedIfEmpty();

export function listOffers(): Offer[] {
  return readOffers();
}

export function getOfferByIdFromStore(id: string): Offer | undefined {
  return readOffers().find((o) => o.id === id);
}

type AddOfferInput = Omit<Offer, "id"> & { id?: string };

export function addOffer(input: AddOfferInput): Offer {
  const items = readOffers();
  const id =
    input.id ?? `of_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const offer: Offer = { ...input, id } as Offer;
  items.push(offer);
  writeOffers(items);
  return offer;
}

export function updateOffer(
  id: string,
  updates: Partial<Omit<Offer, "id">>
): Offer | undefined {
  const items = readOffers();
  const idx = items.findIndex((o) => o.id === id);
  if (idx === -1) return undefined;
  const updated: Offer = { ...items[idx], ...updates, id } as Offer;
  items[idx] = updated;
  writeOffers(items);
  return updated;
}
