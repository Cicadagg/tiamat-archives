import { UseQueryResult } from "react-query";
import { useFetchEgos } from "./useFetchEgo";
import { useFetchEventsList } from "./useFetchEventsList";
import { useFetchIds } from "./useFetchIds";
import { useFetchMDEvents } from "./useFetchMDEvents";
import { useFetchMDGifts } from "./useFetchMDGifts";
import { useFetchStatuses } from "./useFetchStatuses";
import { useFetchGuides } from "./useFetchGuides";
import { useFetchTags } from "./useFetchTags";
import { useFetchNewsList } from "./useFetchNewsList";

type FetchHooksMap = {
  ego: typeof useFetchEgos;
  identities: typeof useFetchIds;
  guides: typeof useFetchGuides,
  statuses: typeof useFetchStatuses;
  tags: typeof useFetchTags;
  "md-gifts": typeof useFetchMDGifts;
  "md-events": typeof useFetchMDEvents;
  "events_list": typeof useFetchEventsList;
  "news_list": typeof useFetchNewsList;
};

const fetchHooksMap: FetchHooksMap = {
  ego: useFetchEgos,
  identities: useFetchIds,
  guides: useFetchGuides,
  statuses: useFetchStatuses,
  tags: useFetchTags,
  "md-gifts": useFetchMDGifts,
  "md-events": useFetchMDEvents,
  "events_list": useFetchEventsList,
  "news_list": useFetchNewsList
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
