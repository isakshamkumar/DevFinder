"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Meteors } from "@/components/ui/meteor";
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
import { dummyProjects } from "@/app/data";
import { getRooms, getUserRooms } from "@/lib/getRooms";
import { useSession } from "next-auth/react";
const SideFilterBar = () => {
  const allTags = useMemo(() => {
    return dummyProjects.flatMap((project) => project.tags);
  }, []);
  const [projects, setprojects] = useState([]);

  const router = useRouter();
  const [filters, setFilters] = useState({
    projectName: "",
    language: "",
    stars: 0, // Default range for stars
  });
const session=useSession()

//@ts-ignore
const userId= session.data?.user?.id
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

  useEffect(() => {
    const getAllRooms = async () => {
      const rooms = await getUserRooms(userId??'');
      setprojects(rooms);
    };
    getAllRooms();
  }, [userId]);
  if(!session.data){
    return <div>No session</div>
  }
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
      // router.push(`/${query}`);
      // implement filterby language based on the tags
      // const filteredProjects= dummyProjects.filter(proj=>proj.tags.includes(filters.language))
      // setprojects(filteredProjects)
      // // now filter project based on repostars
      // const filteredProjects= dummyProjects.filter(proj=>proj.repoStars>=filters.stars)
      // setprojects(filteredProjects)
      // const fp= dummyProjects.filter(proj=>proj.tags.in)
      // const filteredProjects= dummyProjects.filter(proj=>proj.title.trim().toLocaleLowerCase().includes(filters.projectName.trim().toLocaleLowerCase()))
      // setprojects(filteredProjects)
      // // now make a big filter that considers filter by stars, filter by language and filter by title
      // const filteredProjects= dummyProjects.filter(proj=>proj.repoStars>=filters.stars&&proj.tags.includes(filters.language)&&proj.title.trim().toLocaleLowerCase().includes(filters.projectName.trim().toLocaleLowerCase()))
      // setprojects(filteredProjects)
      // but initially they will not be defined, orif user only wants to apply one filter then the && condition will fail, so refactor it
      const filteredProjects = dummyProjects.filter(
        (proj) =>
          proj.repoStars >= filters.stars &&
          proj.tags.includes(filters.language) &&
          proj.title
            .trim()
            .toLocaleLowerCase()
            .includes(filters.projectName.trim().toLocaleLowerCase())
      );
      // setprojects(filteredProjects)
    }
  };

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
              {allTags.map((tag, index) => (
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
        </div>
      </div>
      <div
        style={{ flex: "4 4 0%" }}
        className="relative grid grid-col-1 lg:grid-cols-2  xl:grid-cols-3 gap-5 pl-6  h-full"
      >
        {!projects && <div>No Rooms Created..</div>}
        {projects && projects.map((proj) => (
          <Card
            key={proj.id}
            style={{ backdropFilter: "blur(190px)" }}
            className=" p-2 pb-4 h-fit S bg-transparent"
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
