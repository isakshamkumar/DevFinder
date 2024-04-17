import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { dummyProjects } from "@/app/data";
import { Badge } from "@/components/ui/badge";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ReactPlayer from "react-player";
import VideoPlayer from "./components/VideoPlayer";
import { Meteors } from "@/components/ui/meteor";
import { Separator } from "@/components/ui/separator";
import { getRoom } from "@/lib/getRooms";

const Page =async (props: { params: { roomId: string } }) => {
  const roomId = props.params.roomId;
  // const project = dummyProjects.find((proj) => proj.id === parseInt(roomId));
  const project= await getRoom(roomId)

  if (!project) {
    return (
      <div className="text-4xl font-bold text-center mt-20">
        Room not found!
      </div>
    );
  }

  const { name, description, tags, screenshots, videos, github,issue } = project!;

  return (
    <div suppressHydrationWarning className=" bg-transparent relative   mx-auto px-4 py-8">
      {/* <Meteors/> */}
      <Card  className="shadow-lg flex flex-col justify-between min-h-[810px] border-none bg-transparent">
        <CardHeader className="p-4 ">
          <CardTitle className="text-4xl font-bold mb-2 text-black dark:text-white">
            {name}
          </CardTitle>
          <CardDescription className="text-gray-400 mb-4">
            {description}
          </CardDescription>
          <div className="flex gap-3 flex-wrap my-4">
            {tags.split(",").map((tag, index) => (
              <Badge variant={"default"} key={index} className=" px-3 py-1 rounded-md">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardDescription className="text-gray-400 text-4xl mb-4 ml-3">
           ISSUE: {issue}
          </CardDescription>
        <CardContent className="p-4">
          <div className="mb-4">
            {screenshots && screenshots.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-400">
                  Screenshots
                </h3>
                <div className="flex flex-wrap">
                  {screenshots.map((screenshot, index) => (
                    <Dialog key={index}>
                      <DialogTrigger >
                        <img
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-md mr-2 mb-2 shadow-md cursor-pointer"
                        />
                      </DialogTrigger>
                      <DialogContent style={{width:'100vw'}} className="w-screen h-full p-12">
                        <img
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover rounded-md mr-2 mb-2 shadow-md"
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            )}

            {videos && videos.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-400">
                  Videos
                </h3>
                <div className="flex w-full flex-wrap">
                  {videos.map((video, index) => (
                   
                      <VideoPlayer key={index} video={video} index={index} />
                  
                  ))}
                </div>
              </div>
            )}

            {/* Show message if no screenshots or videos */}
            {(!screenshots || screenshots.length === 0) &&
              (!videos || videos.length === 0) && (
                <p className="text-gray-500">No screenshots or videos provided.</p>
              )}
          </div>
        </CardContent>
        <Separator className="bg-black dark:bg-gray-800"/>
        <CardFooter className="bg-transparent p-4 rounded-b-md flex justify-between items-center">
          <Link href={github}>  
            <Button variant="default">
              <Github className="mr-2" />
              View on GitHub
            </Button>
          </Link>
          {/* Join Room Button */}
          <Button asChild variant="default" className="px-6 py-2"><Link href={`/view-room/${project.id}`} > Join Room</Link></Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
