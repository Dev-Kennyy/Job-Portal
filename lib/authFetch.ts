const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function authFetch(endpoint: string, options: RequestInit = {}) {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No access token");
  }

  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}
