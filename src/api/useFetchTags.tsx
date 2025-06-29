import { tagsApiKey1, tagsApiKey2 } from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { tagsKeys } from "../constants/tagsKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '1yoswY6AtOIfSuA0wQhUInbuIdngkuFiYozWeiwm6oWY';
const RANGE = 'guide_tags_db_rows'; // название листа в гугл таблице
const API_KEY1 = tagsApiKey1;
const API_KEY2 = tagsApiKey2;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const CACHE_KEY = 'tags_cache';
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

const useFetchTagsAction = () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }

  const result = fetchAndValidateData([apiUrl1,apiUrl2],tagsKeys).then(result => {
    setDataToCache(result);
    return result;
  });
  return result; 
};

export const useFetchTags = () => {
  return useQuery("tags", useFetchTagsAction, {
    staleTime: CACHE_TIME,
    cacheTime: 1,
    refetchOnWindowFocus: false,
    retry: 8,
    retryDelay: (attempt) =>
      Math.min(attempt > 1 ? 2 * attempt * 1000 : 1000, 30 * 1000),
    onError: (error) => {
      console.error("Error fetching tags:", error);
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
      queryClient.setQueryData("tags", cachedData);
    }
  }

  return queryClient;
};