"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Room } from "@prisma/client";
import { getRooms } from "@/lib/getRooms";
import { FilterSection } from "@/components/FilterSection";
import { ProjectCard } from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type FilterState = {
  projectName: string;
  language: string;
  stars: number;
};

const useRooms = (initialFilters: FilterState) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedRooms = await getRooms("", "", 0);
      setAllRooms(fetchedRooms);
      const tags: string[] = fetchedRooms.flatMap((room: Room) => room.tags);
      const uniqueTags = Array.from(new Set(tags)).filter(
        (tag) => tag.trim() !== ""
      );
      setAllTags(uniqueTags);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const filterRooms = useCallback(
    (filters: FilterState) => {
      const filteredRooms = allRooms.filter(
        (room) =>
          (filters.projectName === "" ||
            room.name
              .toLowerCase()
              .includes(filters.projectName.toLowerCase())) &&
          (filters.language === "" || room.tags.includes(filters.language)) &&
          room.stars! >= filters.stars
      );
      setRooms(filteredRooms);
    },
    [allRooms]
  );

  useEffect(() => {
    filterRooms(initialFilters);
  }, [initialFilters, filterRooms]);

  return { rooms, loading, allTags, filterRooms };
};

const BrowseRooms: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    projectName: searchParams.get("projectName") || "",
    language: searchParams.get("language") || "",
    stars: Number(searchParams.get("stars")) || 0,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { rooms, loading, allTags, filterRooms } = useRooms(filters);

  const handleApplyFilters = useCallback(() => {
    const query = Object.entries(filters)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    router.push(`/browse-rooms?${query}`);
    filterRooms(filters);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [filters, router, filterRooms]);

  const handleRemoveFilters = useCallback(() => {
    const defaultFilters = { projectName: "", language: "", stars: 0 };
    setFilters(defaultFilters);
    router.push("/browse-rooms");
    filterRooms(defaultFilters);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [router, filterRooms]);

  useEffect(() => {
    filterRooms(filters);
  }, [filters, filterRooms]);

  const displayedRooms = useMemo(() => {
    return rooms.filter(
      (room) =>
        room.name.toLowerCase().includes(filters.projectName.toLowerCase()) &&
        (filters.language === "" || room.tags.includes(filters.language)) &&
        room.stars! >= filters.stars
    );
  }, [rooms, filters]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex relative">
    <div
      className="fixed top-88 inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(30%)] aspect-[1155/678] w-[60rem] h-[30] top-[-10rem] rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      />
    </div>

    <Button
      className="lg:hidden fixed top-20 left-3 z-50"
      onClick={toggleSidebar}
    >
      <Menu />
    </Button>

    <FilterSection
      filters={filters}
      setFilters={setFilters}
      allTags={allTags}
      onApplyFilters={handleApplyFilters}
      onRemoveFilters={handleRemoveFilters}
      isOpen={isSidebarOpen}
    />

    <div className="flex-grow p-4 lg:ml-64">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="p-2 flex justify-center items-center pb-4 h-fit min-h-[310px] min-w-[300px]"
              >
                Getting Rooms...
              </Skeleton>
            ))
        ) : displayedRooms.length > 0 ? (
          displayedRooms.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No rooms match the current filters.
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default BrowseRooms;