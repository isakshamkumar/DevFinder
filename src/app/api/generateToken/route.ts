import { NextRequest, NextResponse } from "next/server";
import { StreamChat } from "stream-chat";


export async function POST(req:NextRequest,res:NextResponse) {

const {id}= await req.json()
// console.log( process.env.GET_STREAM_SECRET_KEY!,'asdasdaasfasfasasdsfasf');

// console.log(body,'body');
   const api_key = "ezumkcut4wyx";
    const api_secret = "4qatutemkdjcde9nc7xrbkz758gx33v2mdgue7bshtdz35ku39cfx6atcsdb9t5y"
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    const token = serverClient.createToken(id);
    // console.log("token", token);
return NextResponse.json({token})

    
}