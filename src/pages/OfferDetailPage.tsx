import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getOfferByIdFromStore, updateOffer } from "../utils/offersStore";
import { addToCart } from "../utils/cart";
import { addComment, listCommentsForOffer } from "../utils/comments";
import { useAuth } from "../context/AuthContext";
import { Star } from "lucide-react";

export default function OfferDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const { username, role } = useAuth();
  const isAdminEdit =
    location.pathname.startsWith("/events") && role === "admin";
  const offer = useMemo(
    () => (id ? getOfferByIdFromStore(id) : undefined),
    [id]
  );

  const [date, setDate] = useState("");
  const [guests, setGuests] = useState<number>(50);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState(() =>
    id ? listCommentsForOffer(id) : []
  );

  // Admin edit form state
  const [editTitle, setEditTitle] = useState(offer?.title || "");
  const [editPrice, setEditPrice] = useState<number>(offer?.price || 0);
  const [editImage, setEditImage] = useState(offer?.image || "");
  const [editDescription, setEditDescription] = useState(
    offer?.description || ""
  );
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  useEffect(() => {
    if (id) setComments(listCommentsForOffer(id));
  }, [id]);

  useEffect(() => {
    if (offer) {
      setEditTitle(offer.title);
      setEditPrice(offer.price);
      setEditImage(offer.image);
      setEditDescription(offer.description);
    }
  }, [offer]);

  if (!offer) {
    return (
      <div className="flex items-start justify-center p-6 pt-12 sm:pt-16">
        <div className="w-full max-w-3xl text-white">
          <h1 className="m-0 mb-4 text-2xl font-semibold">Ponuda</h1>
          <p className="opacity-85">Ponuda nije pronađena.</p>
          <div className="mt-6">
            <Link
              to="/offers"
              className="rounded-lg bg-[#005FB6] px-4 py-2.5 font-medium text-white hover:bg-[#076ad3] active:bg-[#0052a0]"
            >
              Nazad na ponude
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function handleAddToCart(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (!date) {
      setError("Molimo izaberite datum");
      return;
    }
    if (!guests || guests <= 0) {
      setError("Molimo unesite validan broj gostiju");
      return;
    }
    addToCart({
      offerId: offer!.id,
      title: offer!.title,
      price: offer!.price,
      date,
      guests,
    });
    setMessage("Ponuda je dodata u korpu");
  }

  function handleSaveOffer(e: React.FormEvent) {
    e.preventDefault();
    setSaveMsg(null);
    setError(null);
    if (!id || !offer) return;
    if (
      !editTitle.trim() ||
      !editImage.trim() ||
      !editDescription.trim() ||
      editPrice <= 0
    ) {
      setError("Popunite sva polja i unesite validnu cenu");
      return;
    }
    const updated = updateOffer(id, {
      title: editTitle.trim(),
      image: editImage.trim(),
      description: editDescription.trim(),
      price: editPrice,
    });
    if (updated) {
      setSaveMsg("Ponuda je sačuvana");
      // Refresh local edit state so UI reflects changes immediately
      setEditTitle(updated.title);
      setEditPrice(updated.price);
      setEditImage(updated.image);
      setEditDescription(updated.description);
    }
  }

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!id) return;
    if (!username) {
      setError("Morate biti prijavljeni da biste ostavili komentar");
      return;
    }
    if (!comment.trim()) {
      setError("Komentar ne može biti prazan");
      return;
    }
    addComment({ offerId: id, username, rating, text: comment.trim() });
    setComment("");
    setRating(5);
    setComments(listCommentsForOffer(id));
  }

  return (
    <div className="flex items-start justify-center p-6 pt-12 sm:pt-16">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 text-white lg:grid-cols-[1fr_340px]">
        <div>
          <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-white/5">
            <div className="aspect-[16/10] w-full overflow-hidden bg-black/20">
              <img
                src={offer.image}
                alt={offer.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6">
              <h1 className="m-0 text-xl font-semibold sm:text-2xl">
                {offer.title}
              </h1>
              <p className="mt-2 opacity-90">{offer.description}</p>
              <div className="mt-3 text-lg font-semibold">
                Cena: {offer.price.toFixed(2)} €
              </div>
            </div>
          </div>

          <section className="mt-6">
            <h2 className="m-0 mb-3 text-lg font-semibold">Komentari</h2>
            <form
              onSubmit={handleAddComment}
              className="mb-4 rounded-xl border border-[#2a2a2a] bg-white/5 p-4"
            >
              {error ? (
                <div className="mb-2 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              ) : null}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setRating(i)}
                    aria-label={`Ocena ${i}`}
                    className="p-1"
                  >
                    <Star
                      className={
                        i <= rating
                          ? "h-5 w-5 fill-yellow-400 text-yellow-400"
                          : "h-5 w-5 text-white/50"
                      }
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Vaš komentar"
                className="mt-3 w-full resize-vertical rounded-lg bg-white/10 p-3 outline-none placeholder:text-white/60"
                rows={3}
              />
              <div className="mt-3 text-right">
                <button
                  type="submit"
                  className="rounded-lg bg-[#005FB6] px-4 py-2.5 font-medium text-white hover:bg-[#076ad3] active:bg-[#0052a0]"
                >
                  Pošalji komentar
                </button>
              </div>
            </form>
            <div className="flex flex-col gap-3">
              {comments.length === 0 ? (
                <div className="rounded-xl border border-[#2a2a2a] bg-white/5 p-4 text-white/80">
                  Još nema komentara.
                </div>
              ) : (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-xl border border-[#2a2a2a] bg-white/5 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{c.username}</div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={
                              i < c.rating
                                ? "h-4 w-4 fill-yellow-400 text-yellow-400"
                                : "h-4 w-4 text-white/40"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 text-white/90">{c.text}</div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <aside className="rounded-2xl border border-[#2a2a2a] bg-white/5 p-4 sm:p-5">
          {isAdminEdit ? (
            <>
              <h2 className="m-0 mb-3 text-lg font-semibold">Uredi ponudu</h2>
              {saveMsg ? (
                <div className="mb-3 rounded-lg bg-green-500/15 px-3 py-2 text-sm text-green-200">
                  {saveMsg}
                </div>
              ) : null}
              {error ? (
                <div className="mb-3 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              ) : null}
              <form onSubmit={handleSaveOffer} className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-white/85">Naslov</span>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="rounded-lg bg-white p-2 text-[#0a0a0a] outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-white/85">Cena (€)</span>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={editPrice}
                    onChange={(e) =>
                      setEditPrice(parseFloat(e.target.value || "0"))
                    }
                    className="rounded-lg bg-white p-2 text-[#0a0a0a] outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-white/85">URL slike</span>
                  <input
                    type="text"
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                    className="rounded-lg bg-white p-2 text-[#0a0a0a] outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-white/85">Opis</span>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="rounded-lg bg-white p-2 text-[#0a0a0a] outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-1 rounded-lg bg-[#005FB6] px-4 py-2.5 font-medium text-white hover:bg-[#076ad3] active:bg-[#0052a0]"
                >
                  Sačuvaj
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="m-0 mb-3 text-lg font-semibold">Rezervacija</h2>
              {message ? (
                <div className="mb-3 rounded-lg bg-green-500/15 px-3 py-2 text-sm text-green-200">
                  {message}
                </div>
              ) : null}
              {error ? (
                <div className="mb-3 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              ) : null}
              <form onSubmit={handleAddToCart} className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-white/85">Datum</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="rounded-lg bg-white p-2 text-[#0a0a0a] outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-white/85">Broj gostiju</span>
                  <input
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(e) =>
                      setGuests(parseInt(e.target.value || "0", 10))
                    }
                    className="rounded-lg bg-white p-2 text-[#0a0a0a] outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-1 rounded-lg bg-[#005FB6] px-4 py-2.5 font-medium text-white hover:bg-[#076ad3] active:bg-[#0052a0]"
                >
                  Dodaj u korpu
                </button>
              </form>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
