import {newsListApiKey2, newsListApiKey1 } from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { newsListKeys } from "../constants/newsListKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '1Vk582O3qXc-IK80uCn8zDHj8_TkobF8XlLV9AzQCHzA';
const RANGE = 'news'; // название листа в гугл таблице
const API_KEY1 = newsListApiKey2;
const API_KEY2 = newsListApiKey1;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const CACHE_KEY = 'news_list_cache';
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

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

const useFetchNewsListAction = () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }

  const result = fetchAndValidateData([apiUrl1,apiUrl2],newsListKeys).then(result => {
    setDataToCache(result);
    return result;
  });
  return result; 
};

export const useFetchNewsList = () => {
  return useQuery("news_list", useFetchNewsListAction, {
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
      queryClient.setQueryData("news_list", cachedData);
    }
  }

  return queryClient;
};