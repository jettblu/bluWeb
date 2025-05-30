import { BluFetch } from "../BluFetch";
import { Event } from "@prisma/client";

export async function handleGetEvents(): Promise<Event[] | null> {
  // try to add new friend on server
  try {
    const res = await BluFetch("/api/getEvents", {
      method: "GET",
      timeout: 8000,
      headers: { "Content-Type": "application/json" },
    });
    if (res.status != 200) {
      throw new Error("Bad request");
    }
    const allEvents: Event[] = res.data.events;
    return allEvents;
  } catch (e) {
    return null;
  }
}
