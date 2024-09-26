"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamVideo,
  StreamTheme,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Skeleton } from "@/components/ui/skeleton";
import { generateTokenAction } from "@/lib/generateVideoToken";
import { User } from "stream-chat";
import { fetchUserRoomDetails } from "@/lib/getRooms";
import NotFound from "./not-found";
import { ProjectCard } from "@/components/ProjectCard";
import { Room } from "@prisma/client";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY as string;

export default function Video({ params: { roomId } }: { params: { roomId: string } }) {
  const [proj, setProj] = useState<Room | null>(null);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status !== "authenticated") return;

    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchUserRoomDetails(roomId);
        setProj(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError("Failed to load room details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const initializeStreamClient = async (user: User) => {
      try {
        const client = new StreamVideoClient({
          apiKey,
          user,
          tokenProvider: async () => generateTokenAction(user.id),
        });
        setClient(client);

        const call = client.call("default", roomId);
        await call.join({ create: true });
        setCall(call);
      } catch (error) {
        console.error("Error initializing Stream client:", error);
        setError("Failed to initialize video call. Please try again.");
      }
    };

    fetchRoomDetails();

    if (session.data?.user && !client) {
      const { id, name, image } = session.data.user as User;
      initializeStreamClient({ id, name, image });
    }

    return () => {
      if (call) {
        call.leave().then(() => client?.disconnectUser()).catch(console.error);
      }
    };
  }, [session, client, roomId, call]);

  if (session.status !== "authenticated") {
    return <NotFound />;
  }

  if (!client || !call) {
    return <div className="flex justify-center items-center h-screen">Initializing video call...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-3/4 border bg-card text-card-foreground shadow-sm p-2 sm:p-4 min-h-[60vh] lg:min-h-screen rounded-lg">
        <StreamVideo client={client}>
          <StreamTheme>
            <StreamCall call={call}>
              <SpeakerLayout />
              <CallControls onLeave={() => router.push("/browse-rooms")} />
              <CallParticipantsList onClose={() => undefined} />
            </StreamCall>
          </StreamTheme>
        </StreamVideo>
      </div>

      <div className="lg:w-1/4 border-t lg:border-l lg:border-t-0 mt-4 lg:mt-0 overflow-y-auto">
        {loading ? (
          <div className="p-4">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : proj ? (
          <ProjectCard project={proj} />
        ) : (
          <div className="p-4">No project details available.</div>
        )}
      </div>
    </div>
  );
}