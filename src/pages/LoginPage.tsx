import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { verifyUser, ADMIN_USERNAME } from "../utils/userStore";
import { User, Lock } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const { isAuthenticated, loginAsUser, loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "").trim();
    setError(null);
    if (verifyUser(username, password)) {
      if (username.toLowerCase() === ADMIN_USERNAME.toLowerCase()) {
        loginAsAdmin(username || undefined);
      } else {
        loginAsUser(username || undefined);
      }
    } else {
      setError("Pogrešno korisničko ime ili lozinka");
      return;
    }
    navigate("/", { replace: true });
  }

  return (
    <div className="flex items-start justify-center p-6 pt-12 sm:pt-16">
      <div className="w-full max-w-md">
        <h1 className="m-0 mb-6 text-2xl font-semibold text-white">
          Prijava na sistem
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error ? (
            <div className="-mb-1 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          ) : null}
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
          <button
            type="submit"
            className="mt-1 rounded-lg bg-[#005FB6] px-4 py-2.5 font-medium text-white hover:bg-[#076ad3] active:bg-[#0052a0]"
          >
            Prijavi se
          </button>
        </form>
        <p className="mt-4 text-sm text-white/80">
          Nemate nalog?{" "}
          <Link
            to="/register"
            className="rounded px-1 font-medium text-[#66b3ff] hover:text-[#99ccff]"
          >
            Registruj se
          </Link>
        </p>
      </div>
    </div>
  );
}
