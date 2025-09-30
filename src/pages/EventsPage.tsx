import { useState } from "react";
import { listOffers, addOffer } from "../utils/offersStore";
import OfferCard from "../components/OfferCard";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const PAGE_SIZE = 3;

export default function EventsPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const all = listOffers();
  const visible = all.slice(
    pageIndex * PAGE_SIZE,
    pageIndex * PAGE_SIZE + PAGE_SIZE
  );
  const pageCount = Math.ceil(all.length / PAGE_SIZE) || 1;
  const canPrev = pageIndex > 0;
  const canNext = pageIndex < pageCount - 1;

  function handleAddOffer(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !image.trim() || !description.trim() || price <= 0) {
      setError("Popunite sva polja i unesite validnu cenu");
      return;
    }
    addOffer({
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
      price,
    });
    setTitle("");
    setPrice(0);
    setImage("");
    setDescription("");
    // state changes above will trigger re-render; listOffers re-reads storage
  }

  return (
    <main className="p-4 pt-12 sm:pt-16">
      <div className="mx-auto w-full max-w-7xl text-white">
        <div className="mb-20 mx-auto flex items-center gap-3">
          <button
            aria-label="Prethodne ponude"
            onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
            disabled={!canPrev}
            className="hidden rounded-lg border border-[#2a2a2a] bg-white/5 p-2 text-white/85 hover:bg-white/10 disabled:opacity-40 sm:block"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {visible.map((offer) => (
              <OfferCard
                key={offer.id}
                id={offer.id}
                title={offer.title}
                image={offer.image}
                basePath="/events"
              />
            ))}
          </section>

          <button
            aria-label="Sledeće ponude"
            onClick={() => setPageIndex((i) => Math.min(pageCount - 1, i + 1))}
            disabled={!canNext}
            className="hidden rounded-lg border border-[#2a2a2a] bg-white/5 p-2 text-white/85 hover:bg-white/10 disabled:opacity-40 sm:block"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="rounded-2xl border border-[#2a2a2a] bg-white/5 p-4">
          <h2 className="m-0 mb-3 text-lg font-semibold flex items-center gap-2">
            <Plus className="h-5 w-5" /> Dodaj novu ponudu
          </h2>
          {error ? (
            <div className="mb-2 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          ) : null}
          <form
            onSubmit={handleAddOffer}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Naslov"
              className="rounded-lg bg-white p-2 text-[#0a0a0a] outline-none"
            />
            <input
              type="number"
              step="0.01"
              min={0}
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value || "0"))}
              placeholder="Cena (€)"
              className="rounded-lg bg-white p-2 text-[#0a0a0a] outline-none"
            />
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="URL slike"
              className="rounded-lg bg-white p-2 text-[#0a0a0a] outline-none sm:col-span-2"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opis"
              rows={3}
              className="rounded-lg bg-white p-2 text-[#0a0a0a] outline-none sm:col-span-2"
            />
            <div className="sm:col-span-2 text-right">
              <button
                type="submit"
                className="rounded-lg bg-[#005FB6] px-4 py-2.5 font-medium text-white hover:bg-[#076ad3] active:bg-[#0052a0]"
              >
                Dodaj
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
