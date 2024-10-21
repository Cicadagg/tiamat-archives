import { UseQueryResult } from "react-query";
import { useFetchEgo } from "./useFetchEgo";
import { useFetchIds } from "./useFetchIds";
import { useFetchMDEvents } from "./useFetchMDEvents";
import { useFetchMDGifts } from "./useFetchMDGifts";
import { useFetchStatuses } from "./useFetchStatuses";
import { useFetchGuides } from "./useFetchGuides";

type FetchHooksMap = {
  ego: typeof useFetchEgo;
  identities: typeof useFetchIds;
  guides: typeof useFetchGuides,
  statuses: typeof useFetchStatuses;
  "md-gifts": typeof useFetchMDGifts;
  "md-events": typeof useFetchMDEvents;
};

const fetchHooksMap: FetchHooksMap = {
  ego: useFetchEgo,
  identities: useFetchIds,
  guides: useFetchGuides,
  statuses: useFetchStatuses,
  "md-gifts": useFetchMDGifts,
  "md-events": useFetchMDEvents
};

export const useFetchByKeys = (keys: string[]): UseQueryResult<unknown[], unknown>[] => {
  return keys.map((key) => {
    const fetchHook = fetchHooksMap[key as keyof typeof fetchHooksMap];
    if (!fetchHook) {
      throw new Error(`No fetch hook found for key: ${key}`);
    }
    return fetchHook();
  }) as UseQueryResult<unknown[], unknown>[];
};
