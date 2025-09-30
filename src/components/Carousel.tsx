import { useEffect, useMemo, useState } from "react";
import birthday from "../assets/birthday.jpg";
import wedding from "../assets/wedding.jpg";
import girlsnight from "../assets/girlsparty.jpg";

type Slide = {
  id: string;
  img: string;
  title: string;
  text: string;
};

const mockSlides: Slide[] = [
  {
    id: "1",
    img: birthday,
    title: "Rođendan",
    text: "Vaše rođendane činimo posebnim i zabavnim! Kreiramo trenutke koji će se dugo prepričavati.",
  },
  {
    id: "2",
    img: wedding,
    title: "Venčanje",
    text: "Sa posebnom pažnjom osmišljavamo venčanja o kakvima ste sanjali. Vašu ljubav pretvaramo u nezaboravne uspomene!",
  },
  {
    id: "3",
    img: girlsnight,
    title: "Devojačko veče",
    text: "Organizujemo devojačke večeri pune smeha, prijateljstva i iznenađenja. Uz nas, dobra atmosfera je zagarantovana!",
  },
];

export default function Carousel() {
  const slides = useMemo(() => mockSlides, []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const go = (delta: number) =>
    setIndex((i) => (i + delta + slides.length) % slides.length);
  const goTo = (i: number) => setIndex(i);

  const current = slides[index];

  return (
    <section className="w-full mx-auto flex flex-col items-center gap-2 my-4">
      <div className="w-full relative overflow-hidden rounded-xl aspect-[16/7] bg-[#111] border border-[#2a2a2a]">
        <img
          key={current.id}
          src={current.img}
          alt={current.title}
          className="w-full h-full object-cover block saturate-[.9] contrast-[1.05]"
        />
        <div className="absolute inset-x-0 bottom-0 px-5 py-4 text-white bg-gradient-to-b from-black/0 via-black/55 to-black/70">
          <h2 className="m-0 text-xl">{current.title}</h2>
          <p className="m-0 opacity-90">{current.text}</p>
        </div>
        <button
          aria-label="Previous"
          className="absolute top-1/2 -translate-y-1/2 left-3 px-2 py-1 rounded-lg border border-[#888] bg-black/45 text-white text-2xl leading-none"
          onClick={() => go(-1)}
        >
          ‹
        </button>
        <button
          aria-label="Next"
          className="absolute top-1/2 -translate-y-1/2 right-3 px-2 py-1 rounded-lg border border-[#888] bg-black/45 text-white text-2xl leading-none"
          onClick={() => go(1)}
        >
          ›
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full border border-[#777] ${
              i === index ? "bg-white scale-110" : "bg-[#ccc]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
