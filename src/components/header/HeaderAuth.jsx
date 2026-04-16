import { BookOpen, Sparkles, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HeaderAuth = ({ setProfile, setShowSidebar }) => {
  return (
    <div className="flex items-center gap-9 text-[20px]">
      <div className="flex items-center gap-2 text-text hover:text-primary cursor-pointer">
        <Sparkles />
        <Link to="/courses">Browse Courses</Link>
      </div>

      <button
        type="button"
        onClick={() => setShowSidebar(true)}
        className="flex items-center gap-2 text-text hover:text-primary cursor-pointer"
      >
        <BookOpen />
        <p>Enrolled Courses</p>
      </button>

      <div className="relative bg-[#EEEDFC] w-14 h-14 rounded-full flex items-center justify-center text-[#4F46E5] cursor-pointer">
        <User
          onClick={() => setProfile(true)}
          className="w-9.5 h-9.5 text-[#736BEA]"
        />
        <div className="absolute bottom-0 right-0 w-3.75 h-3.75 bg-[#F4A316] rounded-full border-2 border-white"></div>
      </div>
    </div>
  );
};

export default HeaderAuth;
