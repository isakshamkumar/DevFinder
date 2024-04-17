import { NextRequest, NextResponse } from "next/server";
import prisma from '@/db/Client'
export async function POST(req: NextRequest, res: NextResponse) {
  const {
    projectname,
    projectdescription,
    projectgithub,
    projectlivelink,
    issue,
    tags,
    id
  } = await req.json();
  console.log(projectname,
    projectdescription,
    projectgithub,
    projectlivelink,
    issue,
    tags,
    id);
  
const user= await prisma.user.findUnique({
  where:{
    id
  }
})
/**
 *  screenshots:['https://courseify.s3.amazonaws.com/WhatsApp+Image+2023-12-05+at+01.06.57_2f7a8437.jpg','https://courseify.s3.amazonaws.com/WhatsApp+Image+2023-12-05+at+01.06.57_2f7a8437.jpg','https://courseify.s3.amazonaws.com/WhatsApp+Image+2023-12-05+at+01.06.57_2f7a8437.jpg','https://courseify.s3.amazonaws.com/WhatsApp+Image+2023-12-05+at+01.06.57_2f7a8437.jpg','https://courseify.s3.amazonaws.com/WhatsApp+Image+2023-12-05+at+01.06.57_2f7a8437.jpg'],
      issue: "Facing difficulty in setting up Redux store.",
      videos:['https://courseify.s3.amazonaws.com/React+App+and+12+more+pages+-+Personal+-+Microsoft%E2%80%8B+Edge+2023-11-18+00-50-28.mp4','https://courseify.s3.amazonaws.com/React+App+and+12+more+pages+-+Personal+-+Microsoft%E2%80%8B+Edge+2023-11-18+00-50-28.mp4','https://courseify.s3.amazonaws.com/React+App+and+12+more+pages+-+Personal+-+Microsoft%E2%80%8B+Edge+2023-11-18+00-50-28.mp4',]
    },
 */
if(user){
  const newRoom= await prisma.room.create({
    data:{
      name:projectname,
      description:projectdescription,
      github:projectgithub,
      liveLink:projectlivelink,
      issue:issue,
      tags:tags,
      screenshots:['https://courseify.s3.amazonaws.com/WhatsApp+Image+2023-12-05+at+01.06.57_2f7a8437.jpg','https://courseify.s3.amazonaws.com/WhatsApp+Image+2023-12-05+at+01.06.57_2f7a8437.jpg','https://courseify.s3.amazonaws.com/WhatsApp+Image+2023-12-05+at+01.06.57_2f7a8437.jpg','https://courseify.s3.amazonaws.com/WhatsApp+Image+2023-12-05+at+01.06.57_2f7a8437.jpg','https://courseify.s3.amazonaws.com/WhatsApp+Image+2023-12-05+at+01.06.57_2f7a8437.jpg'],
      videos:['https://courseify.s3.amazonaws.com/React+App+and+12+more+pages+-+Personal+-+Microsoft%E2%80%8B+Edge+2023-11-18+00-50-28.mp4','https://courseify.s3.amazonaws.com/React+App+and+12+more+pages+-+Personal+-+Microsoft%E2%80%8B+Edge+2023-11-18+00-50-28.mp4','https://courseify.s3.amazonaws.com/React+App+and+12+more+pages+-+Personal+-+Microsoft%E2%80%8B+Edge+2023-11-18+00-50-28.mp4'],
      user:{
        connect:{
          id:id
        }
      }
    }
  })
  return NextResponse.json({ newRoom });
}
  // console.log("token", token);
}
