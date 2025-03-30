import { md_eventsApiKey1, md_eventsApiKey2, md_eventsApiKey3 } from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { md_eventsKeys } from "../constants/md-eventsKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '1RLhaNaaQge3yt04s3q2B0HTw9kdprgYJ2j8EJ_p6D2g'; // старое
const RANGE = 'md_events_db_rows'; // старое
const API_KEY1 = md_eventsApiKey1;
const API_KEY2 = md_eventsApiKey2;
const API_KEY3 = md_eventsApiKey3;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;
const apiUrl3 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY3}`;

const CACHE_KEY = 'md-events_cache';
const CACHE_TIME = 3600000; // 1 час в миллисекундах

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

const useFetchEventsAction = () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }

  const result = fetchAndValidateData([apiUrl1,apiUrl2,apiUrl3],md_eventsKeys).then(result => {
    setDataToCache(result);
    return result;
  });
  return result; 
};

export const useFetchMDEvents = () => {
  return useQuery("md-events", useFetchEventsAction, {
    staleTime: CACHE_TIME,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 8,
    retryDelay: (attempt) =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    onError: (error) => {
      console.error("Error fetching md-events:", error);
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
      queryClient.setQueryData("md-events", cachedData);
    }
  }

  return queryClient;
};