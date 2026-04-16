import React, { useEffect, useState } from "react";
import { getInProgressCourses } from "../../api/courseService";
import EnrolledCourses from "./EnrolledCourses";
import { Package } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ setShowSidebar }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getInProgressCourses();
        console.log("SIDEBAR COURSES:", data);

        const normalized = data?.data || data?.courses || data || [];
        setCourses(Array.isArray(normalized) ? normalized : []);
      } catch (err) {
        setError(err.message || "Failed to fetch enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-black/25"
        onClick={() => setShowSidebar(false)}
      />

      <aside className="w-[794px] h-full bg-white px-6 py-8 overflow-y-auto shadow-2xl relative">
        <div className="flex items-center justify-between mb-6 pr-8">
          <h2 className="text-[40px] font-semibold text-[#0A0A0A] leading-none">
            Enrolled Courses
          </h2>

          <p className="text-[16px] text-[#0A0A0A] font-semibold whitespace-nowrap">
            Total Enrollments {courses.length}
          </p>
        </div>

        {loading && <p className="text-[14px] text-[#666666]">Loading...</p>}

        {!loading && error && (
          <p className="text-[14px] text-red-500">{error}</p>
        )}

        {!loading && !error && courses.length > 0 && (
          <div className="space-y-4">
            {courses.map((course) => (
              <EnrolledCourses key={course.id} course={course} />
            ))}
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
            <div className="mb-6 flex items-center justify-center">
              <Package className="w-[130px] h-[130px] text-[#D1D1D1]" />
            </div>

            <h3 className="text-[24px] font-semibold text-[#130E67]">
              No Enrolled Courses Yet
            </h3>

            <p className="text-[14px] text-[#130E67] mt-1 font-medium leading-6 max-w-[274px]">
              Your learning journey starts here! Browse courses to get started.
            </p>

            <button
              type="button"
              className="mt-6 bg-[#4F46E5] text-white text-[14px] font-medium px-[25px] py-[17px] rounded-lg hover:bg-[#4338CA] transition cursor-pointer"
            >
              <Link to="/courses">Browse Courses</Link>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
