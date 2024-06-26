export enum ActivityType {
  run = 0,
  swim = 1,
  other = 2,
}

/**
 * rype for physical activities
 * @param type - Run, swim, etc.
 * @param distance - Distance traversed (meters)
 * @param movingTime - time spent moving (seconds)
 * @param elapsedTime - total time (seconds)
 * @param startDate - date the activity was logged
 */
export type Activity = {
  type: ActivityType;
  // distance in meters
  distance: number;
  // time in seconds
  movingTime: number;
  elapsedTime: number;
  // activity date
  startDate: Date;
};

export const defaultActivity: Activity = {
  type: ActivityType.run,
  distance: 0,
  movingTime: 0,
  elapsedTime: 0,
  startDate: new Date("5-25-2002"),
};
