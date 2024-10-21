import { guidesApiKey1, guidesApiKey2 } from "../constants/apiKeys";
import { useQuery, QueryClient } from "react-query";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";
import { validationToString, validationToDate } from "../constants/validations";


const SPREADSHEET_ID = '1t6nX7l2ykkmkX5hNBHgiyB9gDoIYvJW76HcU2SbYQBw';
const RANGE = 'Tags';
const API_KEY1 = guidesApiKey1;
const API_KEY2 = guidesApiKey2;

export const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const CACHE_KEY = 'tags_cache';
const CACHE_TIME = 2 * 60 * 1000; // 2 минуты

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

const tagsKeys = [
  { key: "Id", validation:validationToString },
  { key: 'nameRu', validation: validationToString },
  { key: 'nameEn', validation: validationToString },
];

const useFetchTagsAction = async () => {
  const cachedData = getDataFromCache();
  if (cachedData) {
    return cachedData;
  }

  try {
    const result = await fetchAndValidateData([apiUrl1, apiUrl2], tagsKeys);
    setDataToCache(result);
    return result;
  } catch (error) {
    console.error("Error during fetchAndValidateData:", error);
    throw error;
  }
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
