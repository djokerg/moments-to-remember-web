import weddingImg from "../assets/wedding.jpg";
import birthdayImg from "../assets/birthday.jpg";
import girlsPartyImg from "../assets/girlsparty.jpg";
import businessImg from "../assets/businesslunch.jpg";
import militaryImg from "../assets/military.jpg";
import graduationImg from "../assets/graduation.jpg";

export type Offer = {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
};

export const OFFERS: Offer[] = [
  {
    id: "wedding",
    title: "Venčanje",
    image: weddingImg,
    price: 1200,
    description:
      "Kreiramo elegantna venčanja sa potpunom organizacijom, dekoracijom i besprekornom logistikom.",
  },
  {
    id: "birthday",
    title: "Rođendan",
    image: birthdayImg,
    price: 300,
    description:
      "Vaše rođendane činimo posebnim i zabavnim! Kreiramo trenutke koji će se dugo prepričavati.",
  },
  {
    id: "girls-party",
    title: "Devojačko veče",
    image: girlsPartyImg,
    price: 400,
    description:
      "Stil, glamur i nezaboravna atmosfera – savršeno devojačko veče za pamćenje.",
  },
  {
    id: "business",
    title: "Poslovni ručak",
    image: businessImg,
    price: 600,
    description:
      "Profesionalna organizacija poslovnih ručkova – besprekorna usluga i ambijent.",
  },
  {
    id: "millitary",
    title: "Ispraćaj",
    image: militaryImg,
    price: 450,
    description:
      "Svečani ispraćaji organizovani sa dostojanstvom i pažnjom prema detaljima.",
  },
  {
    id: "graduation",
    title: "Diplomiranje",
    image: graduationImg,
    price: 500,
    description:
      "Proslava diplomiranja uz sjajnu zabavu, fotografije i muziku koja se pamti.",
  },
];

export function getOfferById(id: string): Offer | undefined {
  return OFFERS.find((o) => o.id === id);
}
