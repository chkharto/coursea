import { Rocket } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full bg-white shadow-md flex items-center justify-between px-6">
      <div className="bg-[#4F46E5] w-15 h-15 rounded-[14px] flex items-center justify-center text-white">
        <Rocket className="m-2" />
      </div>
    </div>
  );
};

export default Header;
