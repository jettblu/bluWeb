import { ActivityType } from "./strava/types";

export function metersToMiles(meters:number):number{
    return meters * 0.000621371;
}

export function secondsToMinutes(seconds:number):number{
    return seconds/60;
}

export function stringToActivityType(typeString:string):ActivityType{
    const activityTypeString:string = typeString.toLowerCase().trim();
    switch(activityTypeString){
        case("run"):{
            return ActivityType.run
        }
        case("swim"):{
            return ActivityType.swim
        }
        default:{
            return ActivityType.other;
        }
    }
}

export const isValidEmailAddress = function(email:string){
    /* Checks for anystring@anystring.anystring */
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}