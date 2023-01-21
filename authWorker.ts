import { BluFetch } from "./src/helpers/BluFetch";

async function handleRefreshTokens() {
  try {
    const res = await BluFetch("/api/auth/refresh", {
      method: "POST",
      timeout: 8000,
      headers: { "Content-Type": "application/json" },
    });
    if (res.status != 200) {
      throw new Error("Bad request");
    }
  } catch (e) {
    // console.warn("Unable to refresh auth token. May need to log in again.");
  }
}

handleRefreshTokens().then(() => {});
// silent auth refresh
// runs every twelve minutes
setInterval(() => {
  handleRefreshTokens().then(() => {});
}, 720000);
