// import prisma from '../db/Client'
export const getRooms = async (
  projectName: string,
  language: string,
  stars: number
) => {
  const response = await fetch(
    `/api/get-rooms?project=${projectName}&language=${language}&stars`
  );
  const data = await response.json();
  return data.rooms;
};

export const getRoom = async (id: string) => {
  const response = await fetch("http://localhost:3000/api/get-room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomId: id }),
  });
  const data = await response.json();
  return data.room;
};

export const getUserRooms = async (id: string) => {
  const response = await fetch("http://localhost:3000/api/get-user-rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: id }),
  });
  const data = await response.json();
  return data.rooms;
};
