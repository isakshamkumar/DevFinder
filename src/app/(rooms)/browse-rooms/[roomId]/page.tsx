import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getRoom } from "@/lib/getRooms";
import { Github, ExternalLink, Calendar, Star } from "lucide-react";

type Room = {
  id: string;
  name: string;
  description: string;
  github: string;
  liveLink: string;
  issue: string;
  tags: string[];
  screenshotKeys: string[];
  videoKeys: string[];
  stars: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

const Screenshots: React.FC<{ screenshots: string[] }> = ({ screenshots }) => (
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-4">Screenshots</h3>
    {screenshots.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshots.map((screenshot, index) => (
          <Dialog key={index}>
            <DialogTrigger>
              <div className="relative aspect-video rounded-lg shadow-sm hover:shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer">
                <Image
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] md:max-w-[1000px] lg:max-w-[1200px]">
              <Image
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                width={1600}
                height={900}
                layout="responsive"
                objectFit="contain"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    ) : (
      <p className="italic text-muted-foreground text-bases">
        No screenshots available.
      </p>
    )}
  </div>
);

const Videos: React.FC<{ videos: string[] }> = ({ videos }) => (
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-4">Videos</h3>
    {videos.length > 0 ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative aspect-video rounded-lg shadow-sm hover:shadow-lg"
          >
            <video
              src={video}
              controls
              className="w-full h-full rounded-lg"
              poster="/video-placeholder.png"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    ) : (
      <p className="italic text-muted-foreground  text-base">
        No videos available.
      </p>
    )}
  </div>
);

const RoomDetailsPage = async ({ params }: { params: { roomId: string } }) => {
  const room: Room | null = await getRoom(params.roomId);

  if (!room) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md mx-auto shadow-xl">
          <CardHeader>
            <CardTitle>Room Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              The room you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link href="/browse-rooms">Back to Rooms</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const {
    name,
    description,
    tags,
    screenshotKeys,
    videoKeys,
    github,
    liveLink,
    issue,
    stars,
    createdAt,
  } = room;

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg rounded-xl border w-full">
        <CardHeader className="px-6 py-4">
          <div className="sm:flex sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-4xl font-bold">{name}</CardTitle>
              <CardDescription className="text-lg mt-2 text-muted-foreground">
                {description}
              </CardDescription>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2 text-amber-400">
              <Star className="h-6 w-6" />
              <span className="text-xl font-semibold">{stars}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Issue</h3>
            <p className="text-muted-foreground text-6xl">{issue}</p>
          </div>

          <Screenshots screenshots={screenshotKeys} />
          <Videos videos={videoKeys} />
        </CardContent>

        <Separator />
        <CardFooter className="px-6 py-4">
          <div className="sm:flex sm:items-center sm:justify-between gap-10 flex flex-col sm:flex-row w-full">
            <div className="space-x-4 flex items-center">
              <Button asChild variant="outline">
                <Link href={github}>
                  <Github className="mr-2 h-4 w-4" />
                  <span>GitHub</span>
                </Link>
              </Button>
              {liveLink && (
                <Button asChild variant="outline">
                  <Link href={liveLink}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>Live Demo</span>
                  </Link>
                </Button>
              )}
            </div>

            <div className="mt-4 sm:mt-0 text-sm text-muted-foreground flex items-center sm:justify-center">
              <Calendar className="inline-block align-text-bottom mr-1.5 h-4 w-4" />
              <span>Created on {new Date(createdAt).toLocaleDateString()}</span>
            </div>

            <div className="mt-4 sm:-mt-8 ml-auto">
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/view-room/${room.id}`}>Join Room</Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoomDetailsPage;
