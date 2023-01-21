import { NextApiRequest, NextApiResponse } from "next";

import { Event } from "@prisma/client";
import { addEvents } from "../../prisma/script";

type Data = {
  events: Event[] | null;
  startDate?: Date;
  msg?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get data submitted in request's body.
  try {
    console.log("Adding events!");
    const { eventsToAdd, startDate } = req.body;
    const userId: string | string[] | undefined = req.headers["user-id"];
    console.log(userId);
    console.log(req.headers);
    if (!userId || typeof userId != "string") {
      return res
        .status(400)
        .json({ events: null, msg: "No user id available." });
    }
    console.log("EVENTS USER ID:");
    console.log(userId);
    if (!eventsToAdd) {
      return res
        .status(400)
        .json({ events: null, msg: "No new events were provided" });
    }
    const newEvents = await addEvents(eventsToAdd, userId, startDate);
    console.log("ADDED events");
    console.log(newEvents);
    // TODO: update to return added events
    return res.status(200).json({ events: null });
  } catch (e: any) {
    console.log(e.mes);
    return res.status(400).json({ events: null, msg: `${e.message}` });
  }
}
