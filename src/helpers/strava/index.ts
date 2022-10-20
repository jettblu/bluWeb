import { metersToMiles } from "../utils";
import { Activity, ActivityType } from "./types";

/**
 * Returns total distance for an activity range, filtering on type if provided
 */
export function getTotalDistance(activities:Activity[], activityType?:ActivityType):number{
    // filter activities if type is provided
    const activitiesToSum:Activity[] = activityType?activities.filter(a=>a.type==activityType):activities;
    let totalDistance:number = 0
    // sum distance and return in miles
    for(const activity of activities){
        const newDist:number = metersToMiles(activity.distance);
        totalDistance = totalDistance+newDist;
    }
    return totalDistance;
}