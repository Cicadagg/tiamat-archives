import { guidesApiKey1, guidesApiKey2 } from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { guidesKeys } from "../constants/guidesKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '1yoswY6AtOIfSuA0wQhUInbuIdngkuFiYozWeiwm6oWY';
const RANGE = 'guides_db_rows'; // название листа в гугл таблице
const API_KEY1 = guidesApiKey1;
const API_KEY2 = guidesApiKey2;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const CACHE_KEY = 'guides_cache';
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

const useFetchGuidesAction = () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }

  const result = fetchAndValidateData([apiUrl1,apiUrl2],guidesKeys).then(result => {
    setDataToCache(result);
    return result;
  });
  return result; 
};

export const useFetchGuides = () => {
  return useQuery("guides", useFetchGuidesAction, {
    staleTime: CACHE_TIME,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 8,
    retryDelay: (attempt) =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    onError: (error) => {
      console.error("Error fetching guides:", error);
    },
  });
};

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
      queryClient.setQueryData("guides", cachedData);
    }
  }

  return queryClient;
};
