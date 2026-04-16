import React, { useEffect, useState } from "react";
import { getFeaturedCourses } from "../../api/courseService";
import StartLearningCard from "./StartLearningCard";

const StartLearning = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedCourses();

        console.log("data d:", data);

        setCourses(data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="px-44 mt-16">
      <div>
        <h1 className="text-[40px] font-semibold">
          Start Learning Today
        </h1>
        <p className="text-[#3D3D3D]">
          Choose from our most popular courses and begin your journey
        </p>
      </div>

      {loading && <p className="mt-8">Loading...</p>}
      {error && <p className="mt-8 text-red-500">{error}</p>}

      <div className="grid grid-cols-3 gap-6 mt-10">
        {courses.map((course) => (
          <StartLearningCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default StartLearning;