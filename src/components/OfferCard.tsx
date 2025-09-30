import { Link } from "react-router-dom";

type OfferCardProps = {
  id: string;
  title: string;
  image: string;
  basePath?: string; // defaults to /offers
};

export default function OfferCard({
  id,
  title,
  image,
  basePath = "/offers",
}: OfferCardProps) {
  return (
    <Link
      to={`${basePath}/${id}`}
      className="cursor-pointer overflow-hidden rounded-2xl border border-[#2a2a2a] bg-white/5 shadow-sm transition hover:bg-white/10"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-black/20">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="m-0 text-lg font-semibold">{title}</h3>
      </div>
    </Link>
  );
}
