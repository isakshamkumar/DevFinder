import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type FilterState = {
  projectName: string;
  language: string;
  stars: number;
};

type FilterSectionProps = {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  allTags: string[];
  onApplyFilters: () => void;
  onRemoveFilters: () => void;
  isOpen: boolean;
};

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  setFilters,
  allTags,
  onApplyFilters,
  onRemoveFilters,
  isOpen
}) => (
  <div className={`fixed top-20 ${isOpen && 'left-16'} lg:left-24 h-screen overflow-y-auto z-40 w-64 transition-all duration-300 ease-in-out ${
    isOpen ? 'translate-x-0' : '-translate-x-[20rem] '
  } lg:translate-x-0 flex flex-col gap-4 p-4 bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-lg`}>
    <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Filters</h2>
    <input
      type="text"
      name="projectName"
      value={filters.projectName}
      onChange={(e) =>
        setFilters((prev) => ({ ...prev, projectName: e.target.value }))
      }
      placeholder="Filter by Project Name"
      className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-white/50 dark:bg-black/50 placeholder-gray-500 dark:placeholder-gray-400"
    />
    <Separator className="bg-black/20 dark:bg-white/20 rounded-2xl" />
    <Select
      value={filters.language}
      onValueChange={(value) =>
        setFilters((prev) => ({ ...prev, language: value }))
      }
    >
      <SelectTrigger className="w-full bg-white/50 dark:bg-black/50">
        <SelectValue placeholder="Filter by Language" />
      </SelectTrigger>
      <SelectContent className="bg-white/80 dark:bg-black/80 backdrop-blur-md">
        {allTags.map((tag, index) => (
          <SelectItem value={tag} key={index}>
            {tag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Separator className="h-[0.5px] bg-black/20 dark:bg-white/20 rounded-2xl" />
    <div className="space-y-2 my-2">
      <label htmlFor="stars-filter" className="text-black dark:text-white">
        Filter By Repo Stars ≥ {filters.stars}
      </label>
      <Slider
        id="stars-filter"
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, stars: value[0] }))
        }
        defaultValue={[filters.stars]}
        min={0}
        max={100}
        step={25}
        className="bg-white/30 dark:bg-black/30"
      />
    </div>
    <Separator className="h-[0.5px] bg-black/20 dark:bg-white/20 rounded-2xl" />
    <Button onClick={onApplyFilters} variant="default" className="bg-green-700/80 hover:bg-green-700/60 text-white">
      Apply Filters
    </Button>
    <Button onClick={onRemoveFilters} variant="destructive" className="bg-opacity-80 hover:bg-opacity-100">
      Remove Filters
    </Button>
  </div>
);