import { statusesApiKey1, statusesApiKey2 } from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { statusesKeys } from "../constants/statusesKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '1w3MrtYSiXLYEQwlhQWOrsjNSuMlxzc1uJii1YZ0orlA'; // старое
const RANGE1 = 'sinner_statuses_db_rows'; // старое
const RANGE2 = 'anomaly_statuses_db_rows'; // старое

const API_KEY1 = statusesApiKey1; 
const API_KEY2 = statusesApiKey2; 

const apiUrl1_1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE1}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl1_2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE2}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const apiUrl2_1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE1}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2_2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE2}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const CACHE_KEY = 'statuses_cache';
const CACHE_TIME = 60 * 60 * 1000; // 1 час в миллисекундах

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

const useFetchStatusesAction = () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }

  const result = fetchAndValidateData(
    [
        [apiUrl1_1,apiUrl1_2],
        [apiUrl2_1,apiUrl2_2]
    ],
    statusesKeys).then(result => {
      setDataToCache(result);
      return result;
    });
  return result; 
};

export const useFetchStatuses = () => {
  return useQuery("statuses", useFetchStatusesAction, {
    staleTime: CACHE_TIME,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 8,
    retryDelay: (attempt) =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    onError: (error) => {
      console.error("Error fetching statuses:", error);
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
      queryClient.setQueryData("statuses", cachedData);
    }
  }

  return queryClient;
};
