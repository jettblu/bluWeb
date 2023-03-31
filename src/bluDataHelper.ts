import { useEffect, useState } from "react";
import { getTotalDistance } from "./helpers/strava";
import {
  Activity,
  ActivityType,
  defaultActivity,
} from "./helpers/strava/types";

export function useBluData() {
  // init state

  const [loadingStravaData, setLoadingStravaData] = useState(true);
  const [totalMilesRan, setTotalMilesRan] = useState(0);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [recentRun, setRecentRun] = useState<Activity>(defaultActivity);

  function updateActivities(newActivities: Activity[]) {
    const newTotalMilesRan: number = getTotalDistance(
      newActivities,
      ActivityType.run
    );
    const newRuns: Activity[] = newActivities.filter(
      (a) => a.type == ActivityType.run
    );
    // assuming we receive activities w/ bigger index meaning more recent
    const newRecentRun: Activity | null =
      newRuns.length > 0 ? newRuns[newRuns.length - 1] : null;

    setTotalMilesRan(newTotalMilesRan);
    setActivities(activities);
    if (newRecentRun) {
      setRecentRun(newRecentRun);
    }
    setLoadingStravaData(false);
  }

  function updateIsLoadingStravaData(isLoading: boolean) {
    setLoadingStravaData(isLoading);
  }

  return {
    activities,
    updateActivities,
    totalMilesRan,
    recentRun,
    loadingStravaData,
  };
}
