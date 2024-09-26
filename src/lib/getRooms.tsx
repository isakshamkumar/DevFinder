export const getRooms = async (
  projectName: string,
  language: string,
  stars: number
) => {
  const response = await fetch(
    `https://devfinderr.skumar.site/api/get-rooms?project=${projectName}&language=${language}&stars`
  );
  const data = await response.json();
  return data.rooms;
};

export const getRoom = async (id: string) => {
  const response = await fetch("https://devfinderr.skumar.site/api/get-room", {
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
  const response = await fetch("https://devfinderr.skumar.site/api/get-user-rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: id }),
  });
  const data = await response.json();
  return data.rooms;
};
export const fetchUserRoomDetails = async (roomId: string) => {
  const response = await fetch("https://devfinderr.skumar.site/api/get-room", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId }),
  });
  const data = await response.json();  
  return data.room;
}