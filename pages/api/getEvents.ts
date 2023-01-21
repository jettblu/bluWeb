import { NextApiRequest, NextApiResponse } from "next";

import { Event } from "@prisma/client";
import { addEvents, getEvents } from "../../prisma/script";

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
    const userId: string | string[] | undefined = req.headers["user-id"];
    if (!userId || typeof userId != "string") {
      return res
        .status(400)
        .json({ events: null, msg: "No user id available." });
    }
    const allEvents = await getEvents(userId);
    // TODO: update to return added events
    return res.status(200).json({ events: allEvents });
  } catch (e: any) {
    console.log(e.mes);
    return res.status(400).json({ events: null, msg: `${e.message}` });
  }
}
