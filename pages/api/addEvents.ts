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
    const { eventsToAdd, startDate } = req.body;
    const userId: string | string[] | undefined = req.headers["user-id"];
    if (!userId || typeof userId != "string") {
      return res
        .status(400)
        .json({ events: null, msg: "No user id available." });
    }
    if (!eventsToAdd) {
      return res
        .status(400)
        .json({ events: null, msg: "No new events were provided" });
    }
    const newEvents = await addEvents(eventsToAdd, userId, startDate);
    // TODO: update to return added events
    return res.status(200).json({ events: null });
  } catch (e: any) {
    return res.status(400).json({ events: null, msg: `${e.message}` });
  }
}
