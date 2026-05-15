import API_URL from "./api";

export async function register(userData: any) {

  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("ERROR BACKEND:", data);
    throw new Error(JSON.stringify(data));
  }

  return data;
}