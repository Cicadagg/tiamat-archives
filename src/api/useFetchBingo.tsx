import {bingoApiKey1} from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { bingoKeys } from "../constants/bingoKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '1ErIg15NsnY1G8YoutTtlsj64jAq0BmBUjR6GZxKo0Jo';
const RANGE = 'Bingo'; // название листа в гугл таблице
const API_KEY1 = bingoApiKey1;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;

const CACHE_KEY = 'bingo_cache';
const CACHE_TIME = 1 * 60 * 1000; // 35 минут в миллисекундах

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

const useFetchBingoAction = () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }

  const result = fetchAndValidateData([apiUrl1], bingoKeys).then(result => {
    setDataToCache(result);
    return result;
  });
  return result;
};

export const useFetchBingo = () => {
  return useQuery("bingo", useFetchBingoAction, {
    staleTime: CACHE_TIME,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 8,
    retryDelay: (attempt) =>
        Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    onError: (error) => {
      console.error("Error fetching bingo:", error);
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
      queryClient.setQueryData("bingo", cachedData);
    }
  }

  return queryClient;
}