import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { getInProgressCourses } from "../../api/courseService";
import ContinueLearningCard from "./ContinueLearningCard";
import img from "../../assets/images/card2.png";

const fakeCourses = [
  {
    id: 1,
    progress: 65,
    course: {
      title: "Advanced React & TypeScript Development",
      image: img,
      avgRating: 4.9,
      instructor: {
        name: "Marilyn Mango",
      },
    },
  },
  {
    id: 2,
    progress: 65,
    course: {
      title: "Advanced React & TypeScript Development",
      image: img,
      avgRating: 4.9,
      instructor: {
        name: "Marilyn Mango",
      },
    },
  },
  {
    id: 3,
    progress: 65,
    course: {
      title: "Advanced React & TypeScript Development",
      image: img,
      avgRating: 4.9,
      instructor: {
        name: "Marilyn Mango",
      },
    },
  },
];

const ContinueLearning = ({ setLogin }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getInProgressCourses();
        console.log("IN PROGRESS COURSES:", data);

        const normalized = data?.data || data?.courses || data || [];
        setCourses(Array.isArray(normalized) ? normalized : []);
      } catch (err) {
        setError(err.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [isLoggedIn]);

  return (
    <>
      {courses.length > 0 || !isLoggedIn && (
        <section className="px-44 mt-16 mb-20">
          <div>
            <h1 className="text-[40px] font-semibold">Continue Learning</h1>

            <div className="flex items-center justify-between mt-4">
              <p className="text-[#3D3D3D]">Pick up where you left</p>
              <button
                type="button"
                className="text-[#4F46E5] underline text-[20px] cursor-pointer"
              >
                See All
              </button>
            </div>
          </div>

          {isLoggedIn ? (
            <>
              {loading && <p className="mt-8">Loading...</p>}

              {!loading && error && (
                <p className="mt-8 text-red-500">{error}</p>
              )}

              {!loading && !error && (
                <div className="grid grid-cols-3 gap-6 mt-10">
                  {courses.map((course) => (
                    <ContinueLearningCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="relative mt-10">
              <div className="grid grid-cols-3 gap-6 blur-[7px] select-none">
                {fakeCourses.map((course) => (
                  <ContinueLearningCard key={course.id} course={course} />
                ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-75 bg-white border border-[#D9D9D9] rounded-2xl shadow-lg px-8 py-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#E9E7FF] flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-[#4F46E5]" />
                  </div>

                  <p className="text-[14px] text-[#111827] mb-5 leading-6">
                    Sign in to track your learning progress
                  </p>

                  <button
                    type="button"
                    onClick={() => setLogin(true)}
                    className="bg-[#4F46E5] text-white text-[14px] font-medium px-6 py-2 rounded-lg hover:bg-[#4338CA] transition cursor-pointer"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ContinueLearning;
