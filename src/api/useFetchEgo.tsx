import { egoApiKey1, egoApiKey2 } from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { egoKeys } from "../constants/egoKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '1pDtWwl6Ix7XuUgSt1Sz5iBE2uKm_Kr_c-yo0odBghfo'; // старое
const RANGE = 'egos_db_rows'; // старое
const API_KEY1 = egoApiKey1;
const API_KEY2 = egoApiKey2;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const CACHE_KEY = 'egos_cache';
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

const useFetchEgosAction = () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }
  const result = fetchAndValidateData([apiUrl1,apiUrl2],egoKeys).then(result => {
    setDataToCache(result);
    return result;
  });
  return result;
};

export const useFetchEgos = () => {
  return useQuery("ego", useFetchEgosAction, {
    staleTime: CACHE_TIME,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 8,
    retryDelay: (attempt) =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    onError: (error) => {
      console.error("Error fetching ego:", error);
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
      queryClient.setQueryData("egos", cachedData);
    }
  }

  return queryClient;
};
