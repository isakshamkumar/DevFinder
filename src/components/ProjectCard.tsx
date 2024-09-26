import React from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Room } from "@prisma/client";

type ProjectCardProps = {
  project: Room;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <Card
    style={{ backdropFilter: "blur(190px)" }}
    className="p-2 pb-4 h-fit min-h-[310px] bg-transparent"
  >
    <CardHeader>
      <CardTitle className="text-3xl text-gray-300">{project.name}</CardTitle>
      <CardDescription>{project.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex gap-2 flex-wrap">
      {project.tags.map((tag, id) => (
        <Badge key={id} className="px-3 py-1 bg-slate-300" variant="default">
          <Link href={"/"}>{tag}</Link>
        </Badge>
      ))}
    </CardContent>
    <Link
      className={cn(buttonVariants({ variant: "link" }))}
      href={project.github}
    >
      <Github className="mr-2" />
      <span className="text-xl underline text-gray-200">
        Project Github Link
      </span>
    </Link>
    <Button className="block ml-5 mt-5 bg-slate-200">
      <Link href={`/browse-rooms/${project.id}`}>View Room</Link>
    </Button>
  </Card>
);