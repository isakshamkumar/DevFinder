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
import { getRooms, getUserRooms } from "@/lib/getRooms";
import { useSession } from "next-auth/react";
const SideFilterBar = () => {
  const [projects, setprojects] = useState([]);

 
const session=useSession()

//@ts-ignore
const userId= session.data?.user?.id


  

  useEffect(() => {
    const getAllRooms = async () => {
      const rooms = await getUserRooms(userId || '');
      setprojects(rooms);
      console.log(rooms);
      
    };
    getAllRooms();
  }, [userId]);
  if(!session.data){
    return <div>No session</div>
  }
 

  return (
    <div className="flex  relative ">
    
      <div
        style={{ flex: "4 4 0%" }}
        className="relative grid grid-col-1 lg:grid-cols-2  xl:grid-cols-3 gap-5 pl-6  h-full"
      >
        {projects.length===0 && <div>No Rooms Created..</div>}
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

      
      </div>
    </div>
  );
};

export default SideFilterBar;
