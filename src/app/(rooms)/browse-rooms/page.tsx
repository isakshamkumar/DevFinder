"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { Slider } from "@/components/ui/slider";
// import { Meteors } from "@/components/ui/meteor";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import { dummyProjects } from "@/app/data";
import { getRooms } from "@/lib/getRooms";
const SideFilterBar = () => {
  
  const [projects, setprojects] = useState([]);

   

  const router = useRouter();
  const [filters, setFilters] = useState({
    projectName: "",
    language: "",
    stars: 0, // Default range for stars
  });
  const [loading, setloading] = useState(false);
  const[allTags,setAllTags]=useState([])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStarsChange = (e) => {
    console.log(e, "value");

    setFilters((prevState) => ({
      ...prevState,
      stars: e[0],
    }));
  };
  const searchParams=useSearchParams()
 
  

  useEffect(() => {
    setloading(true);
    const projectName= searchParams.get("projectName") || "";
    const language= searchParams.get("language") || "";
    const stars= Number(searchParams.get("stars")) || 0;
    console.log(projectName, language, stars,'sdfaasd');
    
    const getAllRooms = async () => {
      const rooms = await getRooms(projectName,language,stars);
      setprojects(rooms);
      setloading(false);
    };
    getAllRooms();

  }, [searchParams]);
  useEffect(()=>{
    const getAllRooms = async () => {
      const projectName= searchParams.get("projectName") || "";
    const language= searchParams.get("language") || "";
    const stars= Number(searchParams.get("stars")) || 0;
    const rooms = await getRooms(projectName,language,stars);
     
         const tags= rooms.flatMap((project) => project.tags.split(","));
         //now check if tags do not repeat
         const uniqueTags = tags.filter((tag, index) => tags.indexOf(tag) === index);
        setAllTags(uniqueTags)
    };
    getAllRooms();
  },[])

  const handleApplyFilters = () => {
    if (filters.language === "" || filters.projectName === "") {
      alert("Please Apply Appropriate Settings");
      return;
    }
    if (projects) {
      // Construct query string based on filters
      const query = Object.entries(filters)
        .filter(
          ([key, value]) =>
            key !== "language" || (key === "language" && value !== "")
        )
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}=${value.join("-")}`;
          }
          return `${key}=${value}`;
        })
        .join("&");

      // Push the filtered route to the router
      router.push(`/browse-rooms?${query}`);
    }
  };
  const handleRemoveFilter=async()=>{
router.push(`/browse-rooms`)
  }

  return (
    <div className="flex  relative ">
      <div
        className="fixed top-88 inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl "
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
      <div
        className="bg-transparent p-4 rounded-md border h-screen shadow-md "
        style={{
          flex: " 1 1 0%",
          minWidth: "240px",
          position: "sticky",
          top: "0",
        }}
      >
        <div className=" sticky top-24 left-0  h-[400px] flex flex-col gap-4 p-4">
          <h2 className="text-2xl font-semibold mb-2">Filters</h2>
          <input
            type="text"
            name="projectName"
            value={filters.projectName}
            onChange={handleInputChange}
            placeholder="Filter by Project Name"
            className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />

          <Separator className=" bg-black dark:bg-white  rounded-2xl" />

          <Select
            value={filters.language}
            onValueChange={(value) =>
              setFilters((prevState) => ({
                ...prevState,
                language: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Language" />
            </SelectTrigger>
            <SelectContent>
              {allTags?.map((tag, index) => (
                <SelectItem value={tag} key={index}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Separator className="h-[0.5px] bg-black dark:bg-white  rounded-2xl" />
          <div className="space-y-2 my-2">
            <label htmlFor="label">
              Filter By Repo Stars{">="} {filters.stars}
            </label>

            <Slider
              id="label"
              name="stars"
              onValueChange={handleStarsChange}
              defaultValue={[0]}
              min={0}
              max={100}
              step={25}
            />
          </div>
          <Separator className="h-[0.5px] bg-black dark:bg-white  rounded-2xl" />

          <Button onClick={handleApplyFilters} variant={"destructive"}>
            Apply Filters
          </Button>
          <Button onClick={handleRemoveFilter} variant={"destructive"}>
            Remove Filters
          </Button>
        </div>
      </div>
      <div
        style={{ flex: "4 4 0%" }}
        className="relative grid grid-col-1 lg:grid-cols-2  xl:grid-cols-3 gap-5 pl-6  h-full"
      >
        {!loading ? (
          <>
            {projects.map((proj) => (
              <Card
                key={proj.id}
                style={{ backdropFilter: "blur(190px)" }}
                className=" p-2 pb-4 h-fit min-h-[310px] S bg-transparent"
              >
                <CardHeader>
                  <CardTitle className="text-3xl text-gray-300">
                    {proj.name}
                  </CardTitle>
                  <CardDescription>{proj.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2 flex-wrap">
                  {proj.tags.split(",").map((tag, id) => (
                    <Badge
                      key={id}
                      className="px-3 py-1 bg-slate-300"
                      variant="default"
                    >
                      <Link href={"/"}>{tag}</Link>{" "}
                    </Badge>
                  ))}
                </CardContent>
                <Link
                  className={cn(buttonVariants({ variant: "link" }))}
                  href={"/"}
                >
                  <Github className="mr-2" />{" "}
                  <span className="text-xl underline text-gray-200">
                    Project Github Link
                  </span>{" "}
                </Link>
                <Button className="block ml-5 mt-5 bg-slate-200">
                  <Link href={`/browse-rooms/${proj.id}`}>View Room</Link>{" "}
                </Button>
              </Card>
            ))}
          </>
        ) : (
          <>
            <div
              style={{ flex: "4 4 0%" ,width:'calc(100vw - 35rem)'}}
              className="relative grid grid-col-1 lg:grid-cols-2  xl:grid-cols-3 gap-5 pl-6   h-full"
            >
              {[1, 2, 3, 4, 5].map((ele, index) => (
                <Skeleton
                  key={index}
                  className="p-2 flex justify-center items-center pb-4 h-fit min-h-[310px] min-w-[300px] "
                >Getting Rooms...</Skeleton>
              ))}
            </div>
          </>
        )}
        {/* <div className="border border-red-500"> */}

        {/* <Pagination className="absolute bottom-0 ">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            // <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default SideFilterBar;
