import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-10 w-full bg-[#002a52] border-b border-[#004a90]">
      <div className="mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2"></div>
        <div className="flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-1 py-2 text-[#e6f0fa]/90 hover:text-white hover:underline underline-offset-8 decoration-[#66b3ff] transition-colors"
              >
                Prijavi se
              </Link>
              <Link
                to="/register"
                className="px-1 py-2 text-[#e6f0fa]/90 hover:text-white hover:underline underline-offset-8 decoration-[#66b3ff] transition-colors"
              >
                Registruj se
              </Link>
            </>
          ) : role === "admin" ? (
            <>
              <Link
                to="/profile"
                className="px-1 py-2 text-[#e6f0fa]/90 hover:text-white hover:underline underline-offset-8 decoration-[#66b3ff] transition-colors"
              >
                Profil
              </Link>
              <Link
                to="/events"
                className="px-1 py-2 text-[#e6f0fa]/90 hover:text-white hover:underline underline-offset-8 decoration-[#66b3ff] transition-colors"
              >
                Događaji
              </Link>
              <Link
                to="/bookings"
                className="px-1 py-2 text-[#e6f0fa]/90 hover:text-white hover:underline underline-offset-8 decoration-[#66b3ff] transition-colors"
              >
                Zakazivanja
              </Link>
              <button
                className="px-1 py-2 text-[#ffbfbf]/90 hover:text-[#ffd6d6] hover:underline underline-offset-8 decoration-[#ffbfbf] transition-colors"
                onClick={handleLogout}
              >
                Odjavi se
              </button>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="px-1 py-2 text-[#e6f0fa]/90 hover:text-white hover:underline underline-offset-8 decoration-[#66b3ff] transition-colors"
              >
                Profil
              </Link>
              <Link
                to="/about-us"
                className="px-1 py-2 text-[#e6f0fa]/90 hover:text-white hover:underline underline-offset-8 decoration-[#66b3ff] transition-colors"
              >
                O nama
              </Link>
              <Link
                to="/cart"
                className="px-1 py-2 text-[#e6f0fa]/90 hover:text-white hover:underline underline-offset-8 decoration-[#66b3ff] transition-colors"
              >
                Korpa
              </Link>
              <Link
                to="/offers"
                className="px-1 py-2 text-[#e6f0fa]/90 hover:text-white hover:underline underline-offset-8 decoration-[#66b3ff] transition-colors"
              >
                Ponude
              </Link>
              <Link
                to="/notifications"
                className="px-1 py-2 text-[#e6f0fa]/90 hover:text-white hover:underline underline-offset-8 decoration-[#66b3ff] transition-colors"
              >
                Obaveštenja
              </Link>
              <button
                className="px-1 py-2 text-[#ffbfbf]/90 hover:text-[#ffd6d6] hover:underline underline-offset-8 decoration-[#ffbfbf] transition-colors"
                onClick={handleLogout}
              >
                Odjavi se
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
