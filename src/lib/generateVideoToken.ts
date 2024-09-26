export async function generateTokenAction(id: string) {
  if (!id) {
    throw new Error("No session found");
  }

  const response = await fetch("https://devfinderr.skumar.site/api/generateToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  const data = await response.json();
  return data.token;
}
