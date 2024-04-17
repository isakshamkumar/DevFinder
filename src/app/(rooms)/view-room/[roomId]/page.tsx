"use client";
import {
  CallControls,
  CallParticipantsList,
  DeviceSelectorAudioInput,
  DeviceSelectorVideo,
  DeviceSettings,
  SpeakerLayout,
  StreamCall,
  StreamClientOptions,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  ToggleAudioPublishingButton,
  User,
  VideoPreview,
  
} from "@stream-io/video-react-sdk";
// import { Channel } from "stream-chat-react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
// import { Chat, Channel, MessageList, MessageInput } from 'stream-chat-react';

import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { dummyProjects } from "@/app/data";
import { Github, GithubIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { generateTokenAction } from "@/lib/generateVideoToken";
import { useEffect, useState } from "react";
import { useCreateChatClient } from "@/app/hooks/useCreateChatClient";
import { Skeleton } from "@/components/ui/skeleton";
// ideally, Stream Video theme should be imported before your own styles
// as this would make it easier for you to override certain video-theme rules
// import './my-styles.css';

export default function Video(props:{params:{roomId:string}}) {
  const roomId = props.params.roomId;
  console.log(roomId,'roomid');
  
  // // const room = dummyProjects.find((proj) => proj.id === parseInt(roomId));
  // const [client, setClient] = useState<any>(null);
  // const[call,setCall]=useState<any>(null)
   
  const apiKey = "ezumkcut4wyx";
  // const router = useRouter();
  // const session=useSession()
  const[proj,setproj]=useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const [call, setCall] = useState<any>(null);
  const router = useRouter();
  const session=useSession();

   
  // const chatClient = useCreateChatClient({
  //   apiKey,
  //   tokenOrProvider: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2x1bXBzOGN4MDAwMHR0dzVoaHRldTl3YyJ9.SYLc9aOKoQ0vei4-Pq2NDgzxEPFSTa2ZLtIX-HlQagQ",
  //   userData: user,
  // });
  useEffect(() => {
    const getRoomDetails=async()=>{
      const response=await fetch('/api/get-room',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          roomId:roomId
        })
      })
      const data=await response.json()
      setproj(data.room)
    }
    getRoomDetails()
   
    if (session.status === "authenticated" && session.data?.user && !client) {
      console.log('use effect');
      
    
      //@ts-ignore
    const userId = session.data?.user.id!;
    //@ts-ignore
    const userName = session.data.user.name!;
    //@ts-ignore
    const userEmail = session.data.user.email!;
    //@ts-ignore
    const userImage = session.data.user.image!;

    const user = { id: userId, name: userName, image: userImage };

      const initializeClient = async () => {
        //@ts-ignore
        const client = new StreamVideoClient({
          apiKey,
          user,
          tokenProvider: async () => generateTokenAction(userId),
        });
        setClient(client);
        const call = client.call("default", roomId);
        call.join({ create: true });
        setCall(call);
      };

      initializeClient();
    }

    return () => {
      if (call) {
        call.leave().then(() => client.disconnectUser()).catch(console.error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [ session]);

 if (session.status !== "authenticated") {
    return <div>Loading...</div>;
 }

 if (!client || !call) {
    return <div>Initializing video client...</div>;
 }

 
  // const token =
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaGkifQ.4DNFJe95SXMbsXIvVt_AKHOZI22Bgh1uHeCHa3-UdfY";
  // const user: User = { id: userId,name:userName,image:userImage};
  /**user: {
    id: userId,
    name: userName,
  
    image: userImage,
  } */
  // const client = new StreamVideoClient({ apiKey, user  , tokenProvider: async()=> await generateTokenAction(userId) });
  // const call = client.call("default", "my-firstt-call");
  // call.join({ create: true });
    // const { setTheme } = useTheme();
   

     
    // if (!chatClient || !client) return <div>No chat or video client</div>;
    // const channel = chatClient!.channel('messaging', `channel-id-${userId}`, {
    //   name: 'Channel Name',
    //   members: [userId],
    //  });
    return (
      <div className="grid grid-cols-4 min-h-screen ">
    
        <div className="rounded-lg col-span-3 border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
          {/* <Chat client={chatClient}> */}
            <StreamVideo client={client}>
              <StreamTheme>
                <StreamCall call={call}>
                  <SpeakerLayout />
                  <CallControls onLeave={() => router.push("/browse-rooms")} />
                
                   <CallParticipantsList onClose={() => undefined} />
                 
                </StreamCall>
                {/* <Channel channel={channel}> */}
                  {/* <MessageList /> */}
                  {/* <MessageInput /> */}
                {/* </Channel> */}
              </StreamTheme>
            </StreamVideo>
          {/* </Chat> */}
        </div>
        <div className=" border-r border-b border-t col-span-1">
          {proj ? <Card
            key={proj.id}
            style={{ backdropFilter: "blur(190px)" }}
            className=" p-2 pb-4 h-fit S bg-transparent"
          >
            <CardHeader>
              <CardTitle className="text-3xl text-gray-300">
                {proj.name}
              </CardTitle>
              <CardDescription>{proj.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              {proj.tags.split(",").map((tag, id) => (
                <Badge
                  key={id}
                  className="px-3 py-1 bg-slate-300"
                  variant="default"
                >
                  <Link href={"/"}>{tag}</Link>{" "}
                </Badge>
              ))}
            </CardContent>
            <Link
              className={cn(buttonVariants({ variant: "link" }))}
              href={"/"}
            >
              <Github className="mr-2" />{" "}
              <span className="text-xl underline text-gray-200">
                Project Github Link
              </span>{" "}
            </Link>
            <CardDescription className="text-xl p-4">Issue: {proj.issue}</CardDescription>
         
          </Card>:<Skeleton
                 
                  className="p-2 pb-4 h-fit"
                />}
      
        </div>
     
      {/* Additional UI components can be placed here */}
   </div>
    )

}


