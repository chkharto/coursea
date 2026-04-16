import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSlide = ({ slide, next, prev, current, total, setCurrent }) => {
  return (
    <div
      className="rounded-3xl p-12 text-white relative overflow-hidden h-105 gap-3"
      style={{
        backgroundImage: `url(${slide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent"></div>

      <div className="relative z-10 ">
        <h1 className="text-[48px] font-bold mb-4">{slide.title}</h1>
        <p className="text-[24px] mb-6 max-w-304.5">{slide.desc}</p>
        <button className="bg-[#4F46E5] text-white px-6 py-2 rounded mt-10 h-16">
          <Link to="/courses" className="flex items-center gap-2">
          {slide.button}
          </Link>
        </button>
      </div>

      {/* arrows */}
      <div className="absolute right-12 bottom-13.75 flex gap-6 z-20">
        <CircleChevronLeft onClick={prev} className={`w-13.5 h-13.5 cursor-pointer ${current === 0 && "text-[#C1BCBC80]"} `} />

        <CircleChevronRight onClick={next} className={`w-13.5 h-13.5 cursor-pointer ${current === total - 1 && "text-[#C1BCBC80]"} `} />
      </div>

      {/* dots */}
      <div className="absolute bottom-19.5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-14.25 h-2 rounded cursor-pointer ${
              i === current ? "bg-white" : "bg-[#C1BCBC80]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlide;
