import { NextRequest, NextResponse } from "next/server";
import prisma from '@/db/Client'
export async function POST(req: NextRequest, res: NextResponse) {


    const {roomId}= await req.json()
  const room= await prisma.room.findUnique({
    where:{
        id:roomId
    }
  })
  
  return NextResponse.json({ room });
}
  // console.log("token", token);

