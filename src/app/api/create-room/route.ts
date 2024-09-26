import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOption } from "@/lib/auth";
import prisma from "@/db/Client";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      projectName,
      projectDescription,
      projectGithub,
      projectLiveLink,
      issue,
      tags,
      screenshots,
      video,
      id,
    } = await req.json();

    if (
      !projectName ||
      !projectDescription ||
      !projectGithub ||
      !issue ||
      !tags
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const processedTags = tags.split(",").map((tag: string) => tag.trim());
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const newRoom = await prisma.room.create({
      data: {
        name: projectName,
        description: projectDescription,
        github: projectGithub,
        liveLink: projectLiveLink || "",
        issue: issue,
        tags: processedTags,
        screenshotKeys: screenshots || [],
        videoKeys: video,
        user: {
          connect: {
            id: id,
          },
        },
      },
    });

    return NextResponse.json({ newRoom }, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
