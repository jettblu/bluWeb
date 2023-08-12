"use client";

import { createContext, useContext } from "react";
import { useBluData } from "../src/bluDataHelper";
import { Activity, defaultActivity } from "../src/helpers/strava/types";

interface IDataContext {
  activities: Activity[];
  totalMilesRan: number;
  loadingStravaData: boolean;
  updateActivities: (newActivities: Activity[]) => any;
  recentRun: Activity;
}

const bluDataContext = createContext<IDataContext>({
  activities: [],
  updateActivities: ([]) => {},
  totalMilesRan: 0,
  recentRun: defaultActivity,
  loadingStravaData: true,
});

export function BluDataProvider(props: any) {
  const { value, children } = props;
  const bluData = useBluData();
  return (
    <bluDataContext.Provider value={bluData}>
      {children}
    </bluDataContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
export const useBluDataContext = () => useContext(bluDataContext);
