import { api } from "@/lib/api";

export async function ensureBackendToken() {
  if (typeof window === "undefined") {
    return;
  }

  const existingToken = window.localStorage.getItem("msme_token");
  if (existingToken) {
    return;
  }

  const sessionResponse = await fetch("/api/auth/session");
  const session = await sessionResponse.json();

  if (session?.user?.email && session?.user?.name) {
    const login = await api.post("/auth/google", {
      email: session.user.email,
      name: session.user.name,
      googleId: session.user.email
    });

    window.localStorage.setItem("msme_token", login.data.token);
  }
}
