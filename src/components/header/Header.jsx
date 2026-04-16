import { Rocket } from "lucide-react";
import HeaderAuth from "./HeaderAuth";
import HeaderGuest from "./HeaderGuest";
import { Link } from "react-router-dom";

const Header = ({ setLogin, setSignup, setProfile, setShowSidebar }) => {
  const token = localStorage.getItem("token");

  return (
    <div className="w-full shadow-md py-6">
      <div className="flex items-center justify-between px-44.25">
        <Link
          to="/"
          className="bg-[#4F46E5] w-15 h-15 rounded-[14px] flex items-center justify-center text-white cursor-pointer"
        >
          <Rocket className="w-7.5 h-7.5" />
        </Link>

        {token ? (
          <HeaderAuth setProfile={setProfile} setShowSidebar={setShowSidebar} />
        ) : (
          <HeaderGuest setLogin={setLogin} setSignup={setSignup} />
        )}
      </div>
    </div>
  );
};

export default Header;
