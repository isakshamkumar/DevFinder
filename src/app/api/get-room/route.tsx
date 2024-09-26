import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/Client";
export async function POST(req: NextRequest, res: NextResponse) {
  const { roomId } = await req.json();
  if (!roomId) {
    return NextResponse.json({ error: "No room id provided" }, { status: 400 });
  }
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  return NextResponse.json({ room });
}
