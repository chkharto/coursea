import React from "react";
import { Link } from "react-router-dom";

const StartLearningCard = ({ course }) => {
  const image =
    course.thumbnail || course.image || "https://via.placeholder.com/400x240";

  return (
    <div className="bg-white rounded-xl p-5">
      <img
        src={image}
        alt={course.title}
        className="w-full h-65.5 object-cover rounded-lg"
      />

      <div className="mt-4">
        <div className="flex justify-between items-start mt-2">
          <p className="text-[14px] text-[#8A8A8A] font-medium">
            {course.category.name}
          </p>

          <span className="text-text font-medium text-[14px]">
            ⭐ {course.avgRating}
          </span>
        </div>
        <h2 className="text-[24px] font-semibold text-[#141414] mt-2">
          {course.title}
        </h2>

        <p className="text-[16px] text-[#666666] font-medium mt-3 line-clamp-3">
          {course.description}
        </p>

        <div className="flex justify-between items-end mt-6">
          <div className="flex items-center justify-center gap-2">
            <p className="text-[12px] font-medium text-text">Starting from</p>
            <p className="text-[32px] font-semibold text-[#141414]">
              ${course.basePrice}
            </p>
          </div>

          <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-lg cursor-pointer">
            <Link to="/details">Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartLearningCard;
