import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  getCourses,
  getCategories,
  getTopics,
  getInstructors,
} from "../../api/courseService";
import CourseCard from "./CourseCard";
import FiltersSidebar from "./FiltersSidebar";

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [showSort, setShowSort] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Most Popular", value: "popular" },
    { label: "Title: A-Z", value: "title_asc" },
  ];

  const selectedSortLabel =
    sortOptions.find((item) => item.value === sort)?.label || "Newest First";

  const buildQuery = () => {
    const params = new URLSearchParams();

    params.set("page", page);
    params.set("limit", 9);

    if (sort) params.set("sort", sort);

    if (selectedCategories.length) {
      params.set("categories", selectedCategories.join(","));
    }

    if (selectedTopics.length) {
      params.set("topics", selectedTopics.join(","));
    }

    if (selectedInstructors.length) {
      params.set("instructors", selectedInstructors.join(","));
    }

    return `?${params.toString()}`;
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, topicsRes, instructorsRes] = await Promise.all([
          getCategories(),
          getTopics(),
          getInstructors(),
        ]);

        const normalizedCategories =
          categoriesRes?.data || categoriesRes || [];
        const normalizedTopics = topicsRes?.data || topicsRes || [];
        const normalizedInstructors =
          instructorsRes?.data || instructorsRes || [];

        setCategories(
          Array.isArray(normalizedCategories) ? normalizedCategories : []
        );
        setTopics(Array.isArray(normalizedTopics) ? normalizedTopics : []);
        setInstructors(
          Array.isArray(normalizedInstructors) ? normalizedInstructors : []
        );
      } catch (err) {
        console.log("FILTERS ERROR:", err.message);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const query = buildQuery();
        const data = await getCourses(query);
        console.log("COURSES RESPONSE:", data);

        const normalizedCourses = data?.data || data?.courses || data || [];
        setCourses(Array.isArray(normalizedCourses) ? normalizedCourses : []);

        setMeta(data?.meta || data?.pagination || {});
      } catch (err) {
        setError(err.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [page, sort, selectedCategories, selectedTopics, selectedInstructors]);

  const totalCount = useMemo(() => {
    return meta?.total || meta?.totalItems || courses.length || 0;
  }, [meta, courses]);

  const totalPages = useMemo(() => {
    return meta?.lastPage || meta?.totalPages || 10;
  }, [meta]);

  const toggleItem = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
    setPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTopics([]);
    setSelectedInstructors([]);
    setPage(1);
  };

  return (
    <section className="px-44 py-10">
      <div className="text-[18px] font-medium text-[#666666] mb-6">
        Home <span className="mx-1">›</span>
        <span className="text-[#736BEA]">Browse</span>
      </div>

      <div className="flex gap-10 items-start">
        <FiltersSidebar
          categories={categories}
          topics={topics}
          instructors={instructors}
          selectedCategories={selectedCategories}
          selectedTopics={selectedTopics}
          selectedInstructors={selectedInstructors}
          toggleItem={toggleItem}
          setSelectedCategories={setSelectedCategories}
          setSelectedTopics={setSelectedTopics}
          setSelectedInstructors={setSelectedInstructors}
          clearAllFilters={clearAllFilters}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[16px] font-medium text-[#666666]">
              Showing {courses.length} of {totalCount}
            </p>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSort((prev) => !prev)}
                className="h-12.5 px-4 rounded-[10px] bg-white flex items-center gap-2 text-[16px]"
              >
                <span className="text-[#666666]">Sort By:</span>
                <span className="text-[#4F46E5] font-medium">
                  {selectedSortLabel}
                </span>
                <ChevronDown className="w-5 h-5 text-[#666666] cursor-pointer" />
              </button>

              {showSort && (
                <div className="absolute right-0 top-13 w-full rounded-xl bg-white z-100 py-2.5 px-5">
                  {sortOptions.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setSort(item.value);
                        setShowSort(false);
                        setPage(1);
                      }}
                      className="w-full text-left px-4 py-2 rounded-xl text-[16px] text-[#333333]  hover:bg-[#DDDBFA] hover:text-[#4F46E5] cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {loading && (
            <p className="text-[#666666] text-[14px]">Loading courses...</p>
          )}

          {!loading && error && (
            <p className="text-red-500 text-[14px]">{error}</p>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="w-8 h-8 rounded border border-[#E5E7EB] text-[12px] disabled:opacity-40"
                >
                  ←
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const pageNumber = i + 1;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`w-10 h-10 rounded-sm text-[16px] border cursor-pointer ${
                        page === pageNumber
                          ? "bg-[#281ED2] text-white border-[#4F46E5]"
                          : "border-[#E5E7EB] text-[#666666]"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setPage((prev) => prev + 1)}
                  className="w-8 h-8 rounded border border-[#E5E7EB] text-[12px]"
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrowseCourses;