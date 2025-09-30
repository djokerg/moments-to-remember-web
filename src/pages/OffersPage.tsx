import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { listOffers } from "../utils/offersStore";
import OfferCard from "../components/OfferCard";
import PagerDots from "../components/PagerDots";

const PAGE_SIZE = 3;

export default function OffersPage() {
  const [pageIndex, setPageIndex] = useState(0); // 0 or 1

  const all = listOffers();
  const visible = all.slice(
    pageIndex * PAGE_SIZE,
    pageIndex * PAGE_SIZE + PAGE_SIZE
  );
  const canPrev = pageIndex > 0;
  const pageCount = Math.ceil(all.length / PAGE_SIZE);
  const canNext = pageIndex < pageCount - 1;

  return (
    <main className="p-4 pt-12 sm:pt-16">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
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

      <PagerDots
        total={pageCount}
        activeIndex={pageIndex}
        onSelect={setPageIndex}
      />
    </main>
  );
}
