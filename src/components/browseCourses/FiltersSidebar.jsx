import React from "react";
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

const CategorySection = ({ items, selected, onToggle }) => {
  return (
    <div className="mb-12">
      <h3 className="text-[18px] text-[#666666] font-medium mb-4">
        Categories
      </h3>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const label = item?.name || item;
          const isActive = selected.includes(label);
          const Icon = categoryIcons[label];

          return (
            <button
              key={item?.id || label}
              type="button"
              onClick={() => onToggle(label)}
              className={`h-13 px-3 py-2 rounded-xl text-[16px] flex items-center gap-3 transition ${
                isActive
                  ? "bg-[#F3F1FF] text-[#4F46E5] border border-[#4F46E5]"
                  : "bg-[#FAFAFA] text-[#666666] border border-transparent"
              }`}
            >
              {Icon && <Icon className="w-7 h-7" />}
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TopicsSection = ({ items, selected, onToggle }) => {
  return (
    <div className="mb-12">
      <h3 className="text-[18px] text-[#666666] font-medium mb-4">Topics</h3>

      <div className="flex flex-wrap gap-3">
        {items.map((item) => {
          const label = item?.name || item;
          const isActive = selected.includes(label);

          return (
            <button
              key={item?.id || label}
              type="button"
              onClick={() => onToggle(label)}
              className={`px-2 py-3 rounded-xl font-medium text-[16px] transition ${
                isActive
                  ? "bg-[#F3F1FF] text-[#4F46E5] border border-[#4F46E5]"
                  : "bg-[#FAFAFA] text-[#666666] border border-transparent"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const InstructorSection = ({
  instructors,
  selectedInstructors,
  toggleItem,
  setSelectedInstructors,
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-[18px] text-[#666666] font-medium mb-4">
        Instructor
      </h3>

      <div className="space-y-3">
        {instructors.map((item) => {
          const label = item?.name || item;
          const avatar = item?.avatar || null;
          const isActive = selectedInstructors.includes(label);

          return (
            <button
              key={item?.id || label}
              type="button"
              onClick={() =>
                toggleItem(label, selectedInstructors, setSelectedInstructors)
              }
              className={`px-3 py-2 rounded-xl text-[16px] font-medium flex items-center justify-between transition gap-3 ${
                isActive
                  ? "border border-[#4F46E5] bg-[#F5F3FF] text-[#4F46E5]"
                  : "border-[#E5E7EB] text-[#666666] bg-white"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={label}
                    className="w-7.5 h-7.5 rounded-sm object-cover shrink-0"
                  />
                ) : (
                  <div className="w-7.5 h-7.5 rounded-sm bg-[#E5E7EB] shrink-0" />
                )}

                <span>{label}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="w-full h-0.5 mt-6 bg-[#666666]"></div>

      <button type="button" className="text-[14px] font-medium text-[#666666] mt-4">
        {selectedInstructors.length} Filters Active
      </button>
    </div>
  );
};

const FiltersSidebar = ({
  categories,
  topics,
  instructors,
  selectedCategories,
  selectedTopics,
  selectedInstructors,
  toggleItem,
  clearAllFilters,
  setSelectedCategories,
  setSelectedTopics,
  setSelectedInstructors,
}) => {
  return (
    <aside className="w-[320px] shrink-0">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[40px] font-semibold text-[#0A0A0A]">Filters</h2>

        <button
          type="button"
          onClick={clearAllFilters}
          className="text-[16px] flex gap-1 font-medium text-[#8A8A8A]"
        >
          Clear All Filters
          <X className="cursor-pointer" />
        </button>
      </div>

      <CategorySection
        items={categories}
        selected={selectedCategories}
        onToggle={(value) =>
          toggleItem(value, selectedCategories, setSelectedCategories)
        }
      />

      <TopicsSection
        items={topics}
        selected={selectedTopics}
        onToggle={(value) =>
          toggleItem(value, selectedTopics, setSelectedTopics)
        }
      />

      <InstructorSection
        instructors={instructors}
        selectedInstructors={selectedInstructors}
        toggleItem={toggleItem}
        setSelectedInstructors={setSelectedInstructors}
      />
    </aside>
  );
};

export default FiltersSidebar;
