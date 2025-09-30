import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { changePassword, findUser, updateUser } from "../utils/userStore";
import { Link } from "react-router-dom";
import { User, Phone, MapPin, Lock } from "lucide-react";

type Message = { type: "success" | "error"; text: string } | null;

export default function ProfilePage() {
  const { isAuthenticated, username: authUsername, loginAsUser } = useAuth();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileMsg, setProfileMsg] = useState<Message>(null);
  const [passwordMsg, setPasswordMsg] = useState<Message>(null);

  useEffect(() => {
    if (!authUsername) return;
    const user = findUser(authUsername);
    if (user) {
      setUsername(user.username);
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [authUsername]);

  if (!isAuthenticated || !authUsername) {
    return (
      <div className="flex items-start justify-center p-6 pt-12 sm:pt-16">
        <div className="w-full max-w-2xl">
          <h1 className="m-0 mb-4 text-2xl font-semibold text-white">Profil</h1>
          <p className="text-white/85">
            Morate biti prijavljeni da biste pristupili ovoj stranici.
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

  const currentUsername = authUsername as string;

  function handleUpdateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProfileMsg(null);
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setProfileMsg({ type: "error", text: "Korisničko ime je obavezno" });
      return;
    }
    const res = updateUser(currentUsername, {
      username: trimmedUsername,
      phone: phone.trim(),
      address: address.trim(),
    });
    if (!res.ok) {
      setProfileMsg({ type: "error", text: res.error });
      return;
    }
    if (res.user.username !== authUsername) {
      loginAsUser(res.user.username);
    }
    setProfileMsg({ type: "success", text: "Uspešno ste izmenili podatke" });
  }

  function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPasswordMsg(null);
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordMsg({ type: "error", text: "Sva polja su obavezna" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Lozinke se ne poklapaju" });
      return;
    }
    const res = changePassword(currentUsername, oldPassword, newPassword);
    if (!res.ok) {
      setPasswordMsg({ type: "error", text: res.error });
      return;
    }
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMsg({ type: "success", text: "Lozinka je uspešno promenjena" });
  }

  return (
    <div className="flex items-start justify-center p-6 pt-12 sm:pt-16">
      <div className="w-full max-w-3xl">
        <h1 className="m-0 mb-6 text-2xl font-semibold text-white">
          Moj profil
        </h1>

        <section className="mb-8">
          <h2 className="m-0 mb-3 text-lg font-semibold text-white">
            Lični podaci
          </h2>
          <form
            className="grid grid-cols-2 gap-4 sm:grid-cols-2"
            onSubmit={handleUpdateProfile}
          >
            <label className="flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-[#0a0a0a] shadow-sm">
              <User className="h-5 w-5 text-[#444]" />
              <input
                type="text"
                placeholder="Korisničko ime"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#666]"
              />
            </label>
            <label className="flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-[#0a0a0a] shadow-sm">
              <Phone className="h-5 w-5 text-[#444]" />
              <input
                type="tel"
                placeholder="Broj telefona"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#666]"
              />
            </label>
            <label className="sm:col-span-2 flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-[#0a0a0a] shadow-sm">
              <MapPin className="h-5 w-5 text-[#444]" />
              <input
                type="text"
                placeholder="Adresa"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#666]"
              />
            </label>
            <div className="sm:col-span-2">
              {profileMsg ? (
                <div
                  className={
                    profileMsg.type === "error"
                      ? "mb-2 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200"
                      : "mb-2 rounded-lg bg-green-500/15 px-3 py-2 text-sm text-green-200"
                  }
                >
                  {profileMsg.text}
                </div>
              ) : null}
              <button
                type="submit"
                className="mt-1 w-full rounded-lg bg-[#005FB6] px-4 py-2.5 font-medium text-white hover:bg-[#076ad3] active:bg-[#0052a0]"
              >
                Izmeni
              </button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="m-0 mb-3 text-lg font-semibold text-white">
            Promena lozinke
          </h2>
          <form
            className="grid grid-cols-2 gap-4 sm:grid-cols-2"
            onSubmit={handleChangePassword}
          >
            <label className="flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-[#0a0a0a] shadow-sm">
              <Lock className="h-5 w-5 text-[#444]" />
              <input
                type="password"
                placeholder="Stara lozinka"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#666]"
              />
            </label>
            <label className="flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-[#0a0a0a] shadow-sm">
              <Lock className="h-5 w-5 text-[#444]" />
              <input
                type="password"
                placeholder="Nova lozinka"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#666]"
              />
            </label>
            <label className="sm:col-span-2 flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-[#0a0a0a] shadow-sm">
              <Lock className="h-5 w-5 text-[#444]" />
              <input
                type="password"
                placeholder="Ponovite novu lozinku"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#666]"
              />
            </label>
            <div className="sm:col-span-2">
              {passwordMsg ? (
                <div
                  className={
                    passwordMsg.type === "error"
                      ? "mb-2 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200"
                      : "mb-2 rounded-lg bg-green-500/15 px-3 py-2 text-sm text-green-200"
                  }
                >
                  {passwordMsg.text}
                </div>
              ) : null}
              <button
                type="submit"
                className="mt-1 w-full rounded-lg bg-[#005FB6] px-4 py-2.5 font-medium text-white hover:bg-[#076ad3] active:bg-[#0052a0]"
              >
                Promeni lozinku
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
