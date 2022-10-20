import { NextApiRequest, NextApiResponse } from "next";
import strava from "strava-v3"

import { secondsInAYear } from "../../src/constants";
import { Activity } from "../../src/helpers/strava/types";

type Data = {
    activities:Activity[]|null,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // Get data submitted in request's body.
    try{
        const body = req.body;
        const activities = await getActivities();
        return res.status(200).json({activities:activities})
    }
    catch(e:any){
        console.log(e.message);
        return res.status(400).json({activities:null});
    }
}

/**
 * Returns the number of miles I have ran in a given timeframe. Data pulled from Strava.
 */
async function getActivities(){
    const refreshToken = process.env.STRAVA_REFRESH_TOKEN;
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    const clientRedirectUri = "https://jetthays.com/";
    // if missing required params then return 
    if(!refreshToken || !clientId || !clientSecret || !clientRedirectUri){
        throw(new Error("Misssing required strava paramter. check environment variables."))
    }
    const nowSeconds = Math.floor(Date.now() / 1000);
    const tokenResult = await strava.oauth.refreshToken(refreshToken);
    const accessToken = tokenResult.access_token;
    strava.client(accessToken);
    // fetch all activities from a year ago
    const activities:any = await strava.athlete.listActivities({after:nowSeconds-secondsInAYear, page:1, per_page:200});
    return activities;
}