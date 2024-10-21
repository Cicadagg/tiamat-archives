import {  statusesApiKey1, statusesApiKey2 } from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { statusesKeys } from "../constants/statusesKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '1nQehU8M42srGGaaeMDOM4jREBpPOclcvN0dJrZHh_ao';
const RANGE1 = 'Sinner'; 
const RANGE2 = 'Anomaly'; 

const API_KEY1 = statusesApiKey1; 
const API_KEY2 = statusesApiKey2; 

const apiUrl1_1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE1}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl1_2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE2}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const apiUrl2_1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE1}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2_2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE2}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const CACHE_KEY = 'statuses_cache';
const CACHE_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds

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

const useFetchStatusesAction = async () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }

  const result = await fetchAndValidateData(
    [
        [apiUrl1_1,apiUrl1_2],
        [apiUrl2_1,apiUrl2_2]
    ],
    statusesKeys);
  setDataToCache(result);
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