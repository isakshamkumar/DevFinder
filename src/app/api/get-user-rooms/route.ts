import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/db/Client'
export async function POST (req: NextRequest, res: NextResponse) {
  const { userId } = await req.json()
  const rooms = await prisma.room.findMany({
    where: {
      userId
    }
  })

  return NextResponse.json({ rooms })
}
