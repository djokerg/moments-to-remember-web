import Carousel from "../components/Carousel";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  useAuth();

  return (
    <main className="flex flex-col gap-4 p-4">
      <Carousel />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <InfoCard
          heading="Sve na jednom mestu"
          text="Od ideje do poslednjeg gosta — jedan tim, jedna odgovornost."
        />
        <InfoCard
          heading="Transparentne cene"
          text="Jasan plan i ponuda bez skrivenih troškova."
        />
        <InfoCard
          heading="Lako zakazivanje"
          text="Jednostavno online zakazivanje i prilagođavanje događaja. Sve što treba je da se registrujete."
        />
      </section>
    </main>
  );
}

function InfoCard({ heading, text }: { heading: string; text: string }) {
  return (
    <article className="rounded-xl border border-[#2a2a2a] bg-gradient-to-b from-white/5 to-white/0 p-4">
      <h3 className="m-0 text-lg font-semibold">{heading}</h3>
      <p className="m-0 opacity-85">{text}</p>
    </article>
  );
}
