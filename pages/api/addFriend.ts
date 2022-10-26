import { Friend } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import strava from "strava-v3"
import { addFriend } from "../../prisma/script";

import { secondsInAYear } from "../../src/constants";
import { Activity } from "../../src/helpers/strava/types";

type Data = {
    friend:Friend|null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    console.log("HIT!")
    // Get data submitted in request's body.
    try{
        const body = req.body;
        const name = body.name;
        const email = body.email;
        console.log(req)
        if(!name || !email){
            return res.status(400).json({friend:null});
        }
        const newFriend = await addFriend(name, email);
        console.log("New friend:");
        console.log(newFriend);
        return res.status(200).json({friend:newFriend})
    }
    catch(e:any){
        console.log(e.message);
        return res.status(400).json({friend:null});
    }
}