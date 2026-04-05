import { BookOpen, Sparkles, User } from "lucide-react";
import React from "react";

const HeaderAuth = () => {
  return (
    <div className="flex items-center gap-9 text-[20px]">
      <div className="flex items-center gap-2 text-text hover:text-primary cursor-pointer">
        <Sparkles />
        <p>Browse Courses</p>
      </div>
      <div className="flex items-center gap-2 text-text hover:text-primary cursor-pointer">
        <BookOpen />
        <p>Enrolled Courses</p>
      </div>
      <div className="relative bg-[#EEEDFC] w-14 h-14 rounded-full flex items-center justify-center text-[#4F46E5] cursor-pointer">
        <User className="w-9.5 h-9.5 text-[#736BEA]" />
        <div className="absolute bottom-0 right-0 w-3.75 h-3.75 bg-[#F4A316] rounded-full border-2 border-white"></div>
      </div>
    </div>
  );
};

export default HeaderAuth;
