import { NextRequest, NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

export async function POST(req: NextRequest, res: NextResponse) {
  const { id } = await req.json();

  const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY ?? "";
  const api_secret = process.env.GET_STREAM_SECRET_KEY ?? "";
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(id);
  return NextResponse.json({ token });
}

