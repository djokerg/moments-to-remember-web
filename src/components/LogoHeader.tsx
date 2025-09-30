import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function LogoHeader() {
  return (
    <header className="h-[15vh] min-h-[120px] max-h-[240px] bg-[#005FB6] border-b border-[#004a90]">
      <div className="mx-auto flex h-full items-center justify-center px-4">
        <Link to="/" className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-14 w-14" />
          <div>
            <h1 className="m-0 text-2xl font-semibold">Trenuci za pamćenje</h1>
            <p className="m-0 opacity-70">Obezbedite događaj iz snova</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
