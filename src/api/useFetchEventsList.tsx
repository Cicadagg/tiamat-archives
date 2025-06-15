import { eventsListApiKey1, eventsListApiKey2 } from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { eventsListKeys } from "../constants/eventsListKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '1DdcLyjQmW7m6P6ie2J4acddU8-M6BjUIo52Lq3WOMI8';
const RANGE = 'events_list_db_rows'; // название листа в гугл таблице
const API_KEY1 = eventsListApiKey1;
const API_KEY2 = eventsListApiKey2;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const CACHE_KEY = 'events_list_cache';
const CACHE_TIME = 35 * 60 * 1000; // 35 минут в миллисекундах

const getDataFromCache = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_TIME) {
      return data;
    }
  }
  return null;
};

const setDataToCache = (data: any) => {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

const useFetchEventsListAction = () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }

  const result = fetchAndValidateData([apiUrl1,apiUrl2],eventsListKeys).then(result => {
    setDataToCache(result);
    return result;
  });
  return result; 
};

export const useFetchEventsList = () => {
  return useQuery("events_list", useFetchEventsListAction, {
    staleTime: CACHE_TIME,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 8,
    retryDelay: (attempt) =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    onError: (error) => {
      console.error("Error fetching events list:", error);
    },
  });
};

// Create a custom QueryClient to handle cache persistence
export const createQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: CACHE_TIME,
        cacheTime: Infinity,
      },
    },
  });

  // Hydrate the cache from localStorage on client-side
  if (typeof window !== 'undefined') {
    const cachedData = getDataFromCache();
    if (cachedData) {
      queryClient.setQueryData("events_list", cachedData);
    }
  }

  return queryClient;
};
