import React from "react";
import img from "../../assets/images/card2.png";

const ContinueLearningCard = ({ course }) => {
  const title = course?.course?.title || course?.title || "Course Title";
  const image = course?.course?.image || course?.image || img;
  const rating = course?.course?.avgRating || course?.avgRating || 4.9;
  const instructor =
    course?.course?.instructor?.name ||
    course?.instructor?.name ||
    "Instructor";
  const progress = course?.progress || course?.enrollment?.progress || 0;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <img
          src={image}
          alt={title}
          className="w-30 h-30 rounded-xl object-cover shrink-0" 
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[14px] text-[#9CA3AF] truncate">
                Lecturer {instructor}
              </p>

              <h3 className="text-[20px] font-semibold text-[#141414] leading-tight mt-2 wrap-break-word">
                {title}
              </h3>
            </div>

            <div className="flex items-center gap-1 shrink-0 text-[13px] font-medium">
              <span className="text-[#F59E0B]">★</span>
              <span className="text-[#141414]">{rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="flex-1">
          <p className="text-[12px] text-[#141414] mb-2">
            {progress}% Complete
          </p>

          <div className="w-full h-3 bg-[#DCD9FA] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F46E5] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          className="border border-[#8C84F6] text-[#4F46E5] text-[16px] font-medium px-8 py-3 rounded-2xl hover:bg-[#F5F3FF] transition shrink-0"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ContinueLearningCard;