import { BluFetch } from "../BluFetch";

export async function logout(): Promise<void> {
  console.log("Running logout code");
  // try to add new friend on server
  try {
    const res = await BluFetch("/api/auth/logout", {
      method: "POST",
      timeout: 8000,
      headers: { "Content-Type": "application/json" },
    });
    if (res.status != 200) {
      throw new Error("Unable to logout");
    }
  } catch (e) {
    // for now do nothing
  }
}
