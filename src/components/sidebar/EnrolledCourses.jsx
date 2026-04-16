import React from "react";
import { CalendarDays, Clock3, MapPin, MonitorPlay } from "lucide-react";
import img from "../../assets/images/card2.png";

const EnrolledCourses = ({ course }) => {
  const title =
    course?.course?.title || "Advanced React & TypeScript Development";

  const image = course?.course?.image || img;

  const rating = course?.course?.avgRating ?? 4.9;

  const instructor = course?.course?.instructor?.name || "Sarah Johnson";

  const progress = course?.progress ?? 0;

  const days = course?.schedule?.weeklySchedule?.label || "Monday - Wednesday";

  const time =
    course?.schedule?.timeSlot?.label || "Evening (6:00 PM - 8:00 PM)";

  const type = course?.schedule?.sessionType?.name || "In Person";

  const location =
    course?.schedule?.location ||
    course?.schedule?.sessionType?.location ||
    "Tbilisi, Chavchavadze St.30";

  return (
    <div className="bg-white border border-[#E7E7E7] rounded-2xl p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <img
          src={image}
          alt={title}
          className="w-67.25 h-47.75 rounded-md object-cover shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-[#8A8A8A] truncate">
                Instructor {instructor}
              </p>

              <h3 className="text-[20px] font-semibold text-[#141414] leading-tight mt-1 line-clamp-2">
                {title}
              </h3>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[#DFB300] text-[14px]">★</span>
              <span className="text-[14px] text-[#4B4B4B] font-medium">
                {rating}
              </span>
            </div>
          </div>

          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-[14px] text-[#666666]">
              <CalendarDays className="w-3 h-3" />
              <span>{days}</span>
            </div>

            <div className="flex items-center gap-2 text-[14px] text-[#666666]">
              <Clock3 className="w-3 h-3" />
              <span>{time}</span>
            </div>

            <div className="flex items-center gap-2 text-[14px] text-[#666666] capitalize">
              <MonitorPlay className="w-3 h-3" />
              <span>{type}</span>
            </div>

            <div className="flex items-center gap-2 text-[14px] text-[#666666]">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="flex-1">
          <p className="text-[16px] font-medium text-[#141414] mb-1.5">
            {progress}% Complete
          </p>

          <div className="w-full h-3.75 bg-[#DDDBFA] rounded-[30px] overflow-hidden">
            <div
              className="h-full bg-[#4F46E5] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          className="border-2 border-[#958FEF] text-[#4F46E5] text-[16px] font-medium px-6 py-2 rounded-lg hover:bg-[#F5F3FF] transition shrink-0"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default EnrolledCourses;
