import { useFetchEgo } from "./useFetchEgo";
import { useFetchIds } from "./useFetchIds";
import { useFetchMDEvents } from "./useFetchMDEvents";
import { useFetchMDGifts } from "./useFetchMDGifts";
import { useFetchStatuses } from "./useFetchStatuses";
 
type FetchHooksMap = {
  ego: typeof useFetchEgo;
  identities: typeof useFetchIds;
  statuses: typeof useFetchStatuses;
  "md-gifts": typeof useFetchMDGifts;
  "md-events": typeof useFetchMDEvents;
};

const fetchHooksMap: FetchHooksMap = {
    ego:useFetchEgo,
    identities: useFetchIds,
    statuses: useFetchStatuses,
    "md-gifts": useFetchMDGifts,
    "md-events": useFetchMDEvents
};

type FetchDataResult = ReturnType<FetchHooksMap[keyof FetchHooksMap]>[];

export const useFetchByKeys = (keys: string[]) => {

  return keys.map((key) => {
    const fetchHook = fetchHooksMap[key as keyof typeof fetchHooksMap];
    if (!fetchHook) {
      throw new Error(`No fetch hook found for key: ${key}`);
    }
    return fetchHook();
  }) as FetchDataResult;

};
