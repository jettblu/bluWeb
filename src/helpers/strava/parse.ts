import { stringToActivityType } from "../utils";
import { Activity, ActivityType } from "./types";

export function parseStravaActivity(activity:any):Activity{
    const activityType:ActivityType = activity.type?stringToActivityType(activity.type):ActivityType.other;
    // TODO: UPDATE TO HANDLE UNDEFINED RESPONSE
    const activityParsed:Activity = {
        type:activityType,
        distance:activity.distance,
        startDate: new Date(activity.start_date),
        movingTime: activity.moving_time,
        elapsedTime: activity.elapsed_time
    }
    return activityParsed;
}

export function parseStravaActivityList(activities:any[]):Activity[]{
    // parse each activity
    const formattedActivities:Activity[] = []
    for(const activity of activities){
        try{
            const newFormattedActivity:Activity = parseStravaActivity(activity);
            formattedActivities.push(newFormattedActivity);
        }
        catch(e){
            // for noW just continue
            continue;
        }
    }
    return formattedActivities;
}
