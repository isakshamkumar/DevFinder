"use client";
import { useSession } from "next-auth/react";

export const useClientSession = () => {
  const session = useSession();
  if (session.data) {
    return session.data;
  } else {
    return null;
  }
};
