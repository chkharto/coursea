import React from "react";
import img from "../../assets/images/card2.png";
import {
  CodeXml,
  Palette,
  ChartNoAxesCombined,
  Network,
  Lightbulb,
  X,
} from "lucide-react";
const categoryIcons = {
  Development: CodeXml,
  Design: Palette,
  Business: ChartNoAxesCombined,
  "Data Science": Network,
  Marketing: Lightbulb,
};

const CourseCard = ({ course }) => {
  const title = course?.title || "Advanced React & TypeScript Development";
  const image =
    course?.image && course.image.trim() !== "" ? course.image : img;
  const instructor = course?.instructor?.name || "Marilyn Mango";
  const duration = course?.durationWeeks || 12;
  const rating = course?.avgRating ?? 4.9;
  const price = course?.basePrice ?? 299;
  const category = course?.category?.name || "Development";

  return (
    <div className="top-8 rounded-xl bg-white z-20 p-5">
      <img
        src={image}
        alt={title}
        className="w-full h-45.25 rounded-[10px] object-cover"
      />

      <div className="mt-3">
        <div className="flex items-center justify-between text-[14px] font-medium text-[#ADADAD]">
          <p>
            {instructor} | {duration} Weeks
          </p>

          <div className="flex items-center gap-1">
            <span className="text-[#DFB300]">★</span>
            <span>{rating}</span>
          </div>
        </div>

        <h3 className="mt-2 text-[24px] font-semibold text-[#0A0A0A] leading-[1.2] min-h-[72px]">
          {title}
        </h3>

        <div className="mt-3">
          <span className="inline-flex items-center rounded-xl bg-[#F5F5F5] px-3 py-2 text-[16px] gap-2 font-medium text-[#666666]">
            {(() => {
              const Icon = categoryIcons[category];
              return Icon ? <Icon className="w-6 h-6 text-[#666666]" /> : null;
            })()}
            {category}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[12px] text-[#A0A0A0]">Starting from</p>
            <p className="text-[24px] font-semibold text-[#141414]">${price}</p>
          </div>

          <button
            type="button"
          className="bg-[#4F46E5] cursor-pointer text-[#FFFFFF] text-[16px] font-medium px-5 py-2 rounded-lg hover:bg-[#4338CA] transition"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
