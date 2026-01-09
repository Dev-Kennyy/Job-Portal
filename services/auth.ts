import { authFetch } from "@/lib/authFetch";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ================= LOGIN =================
export async function loginUser(loginInfo: {
  email: string;
  password: string;
}) {
  if (!baseURL) {
    throw new Error("API base URL is not defined");
  }

  const response = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });

  if (!response.ok) {
    let errorMessage = "Login failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || "Login failed";
    } catch {
      // If JSON parsing fails, try to get text
      const errorText = await response.text();
      errorMessage = errorText || "Login failed";
    }
    throw new Error(errorMessage);
  }

  // ✅ READ RESPONSE ONCE
  const data = await response.json();

  // ✅ SAVE JWT
  sessionStorage.setItem("accessToken", data.accessToken);

  console.log(data);

  return data;
}

// ================= REGISTER =================
export async function registerUser(registerInfo: {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  if (!baseURL) {
    throw new Error("API base URL is not defined");
  }

  const response = await fetch(`${baseURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include", // 🔥 REQUIRED
    body: JSON.stringify(registerInfo),
  });

  if (!response.ok) {
    let errorMessage = "Registration failed";
    try {
      const errorData = await response.json();
      errorMessage =
        errorData.message || errorData.error || "Registration failed";
    } catch {
      // If JSON parsing fails, try to get text
      const errorText = await response.text();
      errorMessage = errorText || "Registration failed";
    }
    throw new Error(errorMessage);
  }
  if (response.ok) {
    console.log("Registered successful");
  }

  return response.json();
}

//?GET CURRENT USER
export interface AuthUser {
  _id: string;
  email: string;
  role: "admin" | "user";
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    // 🔐 Calls backend: GET /user with Authorization header
    const user = await authFetch("/user", {
      method: "GET",
    });

    return user as AuthUser;
  } catch (error) {
    return null;
  }
}

// ================= LOGOUT =================
export function logoutUser() {
  sessionStorage.removeItem("accessToken");
  // Clear applied jobs on logout
  if (typeof window !== "undefined") {
    localStorage.removeItem("application-storage");
  }
}
