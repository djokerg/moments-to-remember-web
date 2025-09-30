import { Link } from "react-router-dom";
import { User, Lock, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { createUser } from "../utils/userStore";

export default function RegisterPage() {
  const [success, setSuccess] = useState<null | { username: string }>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const username = String(form.get("username") || "").trim();
    const password = String(form.get("password") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const address = String(form.get("address") || "").trim();

    if (!username || !password) {
      setError("Korisničko ime i lozinka su obavezni");
      return;
    }

    const res = createUser({ username, password, phone, address });
    if (!res.ok) {
      setError(res.error);
      return;
    }

    setSuccess({ username });
  }

  if (success) {
    return (
      <div className="flex items-start justify-center p-6 pt-12 sm:pt-16">
        <div className="w-full max-w-3xl">
          <h1 className="m-0 mb-4 text-2xl font-semibold text-white">
            Uspešna registracija
          </h1>
          <p className="text-white/85">
            Dobro došli,{" "}
            <span className="font-semibold">{success.username}</span>! Sada se
            možete prijaviti.
          </p>
          <div className="mt-4">
            <Link
              to="/login"
              className="rounded-lg bg-[#005FB6] px-4 py-2.5 font-medium text-white hover:bg-[#076ad3] active:bg-[#0052a0]"
            >
              Idi na prijavu
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start justify-center p-6 pt-12 sm:pt-16">
      <div className="w-full max-w-3xl">
        <h1 className="m-0 mb-6 text-2xl font-semibold text-white">
          Registracija
        </h1>
        <form
          className="grid grid-cols-2 gap-4 sm:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <label className="flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-[#0a0a0a] shadow-sm">
            <User className="h-5 w-5 text-[#444]" />
            <input
              type="text"
              placeholder="Korisničko ime"
              name="username"
              className="w-full bg-transparent outline-none placeholder:text-[#666]"
            />
          </label>
          <label className="flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-[#0a0a0a] shadow-sm">
            <Lock className="h-5 w-5 text-[#444]" />
            <input
              type="password"
              placeholder="Lozinka"
              name="password"
              className="w-full bg-transparent outline-none placeholder:text-[#666]"
            />
          </label>
          <label className="flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-[#0a0a0a] shadow-sm">
            <Phone className="h-5 w-5 text-[#444]" />
            <input
              type="tel"
              placeholder="Broj telefona"
              name="phone"
              className="w-full bg-transparent outline-none placeholder:text-[#666]"
            />
          </label>
          <label className="flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-[#0a0a0a] shadow-sm">
            <MapPin className="h-5 w-5 text-[#444]" />
            <input
              type="text"
              placeholder="Adresa"
              name="address"
              className="w-full bg-transparent outline-none placeholder:text-[#666]"
            />
          </label>
          <div className="sm:col-span-2">
            {error ? (
              <div className="mb-2 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            ) : null}
            <button
              type="submit"
              className="mt-1 w-full rounded-lg bg-[#005FB6] px-4 py-2.5 font-medium text-white hover:bg-[#076ad3] active:bg-[#0052a0]"
            >
              Registruj se
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-white/80">
          Već imate nalog?{" "}
          <Link
            to="/login"
            className="rounded px-1 font-medium text-[#66b3ff] hover:text-[#99ccff]"
          >
            Prijavi se
          </Link>
        </p>
      </div>
    </div>
  );
}
