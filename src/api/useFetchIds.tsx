import { identitiesApiKey1, identitiesApiKey2, identitiesApiKey3 } from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { idsKeys } from "../constants/idsKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '1t9YpJUpNLO5VVzQKVmtpt-DKwyq9iG8VjpZMWJMtq1M'; // старое
const RANGE = 'ids_db_rows'; // старое
const API_KEY1 = identitiesApiKey1;
const API_KEY2 = identitiesApiKey2;
const API_KEY3 = identitiesApiKey3;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;
const apiUrl3 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY3}`;

const CACHE_KEY = 'identities_cache';
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

const setDataToCache = (data: any): void => {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

const useFetchIdsAction = () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }

  const result = fetchAndValidateData([apiUrl1,apiUrl2,apiUrl3],idsKeys).then(result => {
    console.log("Fetched identities:", result);
    setDataToCache(result);
    return result;
  });
  return result; 
};

export const useFetchIds = () => {
  return useQuery("identities", useFetchIdsAction, {
    staleTime: CACHE_TIME,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 8,
    retryDelay: (attempt) =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    onError: (error) => {
      console.error("Error fetching identities:", error);
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

  if (typeof window !== 'undefined') {
    const cachedData = getDataFromCache();
    if (cachedData) {
      queryClient.setQueryData("identities", cachedData);
    }
  }

  return queryClient;
};