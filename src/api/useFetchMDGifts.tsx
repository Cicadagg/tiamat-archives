import {md_giftsApiKey1, md_giftsApiKey2 } from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { md_giftsKeys } from "../constants/md-giftsKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '15Xs3ug0kgC9pmABwryljNfPKL7vF6GokmxpoOi5hMdQ'; // старое
const RANGE = 'md_gifts_db_rows'; // старое
const API_KEY1 = md_giftsApiKey1;
const API_KEY2 = md_giftsApiKey2;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const CACHE_KEY = 'md-gifts_cache';
const CACHE_TIME = 35 * 60 * 1000; // 5 minutes in milliseconds

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

const useFetchGiftsAction = () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }

  const result = fetchAndValidateData([apiUrl1,apiUrl2],md_giftsKeys).then(result => {
    setDataToCache(result);
    return result;
  });
  return result; 
};

export const useFetchMDGifts = () => {
  return useQuery("md-gifts", useFetchGiftsAction, {
    staleTime: CACHE_TIME,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 8,
    retryDelay: (attempt) =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    onError: (error) => {
      console.error("Error fetching md-gifts:", error);
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
      queryClient.setQueryData("md-gifts", cachedData);
    }
  }

  return queryClient;
};