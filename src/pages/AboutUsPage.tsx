import { Mail, MapPin, Phone } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-8 pt-14 sm:pt-20">
      <div className="w-full max-w-4xl">
        <div className="rounded-3xl bg-[#005FB6] p-10 text-white shadow-2xl sm:p-14">
          <div className="flex items-center gap-4">
            <Mail className="h-7 w-7" />
            <span className="text-lg sm:text-xl">
              trenuci_za_pamcenje@gmail.com
            </span>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <MapPin className="h-7 w-7" />
            <span className="text-lg sm:text-xl">
              Bulevar Kralja ALeksandra 70, 1. sprat
            </span>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <Phone className="h-7 w-7" />
            <span className="text-lg sm:text-xl">+381 64 858 646</span>
          </div>
        </div>
      </div>
    </div>
  );
}
