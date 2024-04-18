import { NextRequest, NextResponse } from "next/server";
import prisma from '@/db/Client';

export async function GET(req: NextRequest, res: NextResponse) {
  const projectName = req.nextUrl.searchParams.get('project');
  const language = req.nextUrl.searchParams.get('language');
  const stars = req.nextUrl.searchParams.get('stars');
console.log(projectName, language,'asdasd', stars);
let whereClause = {};

// Check if projectName is not an empty string
// Check if projectName is not an empty string
if (projectName !== '') {
  //@ts-ignore
  whereClause.name = {
    contains: projectName,
    mode: 'insensitive'
  };
}

// Check if language is not an empty string
if (language !== '') {
  //@ts-ignore
  whereClause.tags = {
    contains: language,
    mode: 'insensitive'
  };
}

// Check if stars is not null
if (stars !== '') {
  //@ts-ignore
  whereClause.stars = Number(stars);
}
const rooms = await prisma.room.findMany({
  where: whereClause,
});

  

  return NextResponse.json({ rooms });
}
