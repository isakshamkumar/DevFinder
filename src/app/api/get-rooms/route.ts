import { NextRequest, NextResponse } from "next/server";
import prisma from '@/db/Client'
export async function GET(req: NextRequest, res: NextResponse) {
  const rooms= await prisma.room.findMany({})
  return NextResponse.json({ rooms });
}
  // console.log("token", token);

