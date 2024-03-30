import { egoApiKey1, egoApiKey2 } from "../constants/apiKeys";
import { egoKeys } from "../constants/egoKeys";
import { useQuery } from "react-query";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '1k_TaGK7vOfYdIS5-6GxJBEjFsxjZyzb1x_0Zi1k6kao';
const RANGE = 'EGO'; 
const API_KEY1 = egoApiKey1;
const API_KEY2 = egoApiKey2;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const useFetchIdsAction = () =>{
    const result = fetchAndValidateData([apiUrl1,apiUrl2],egoKeys);
    return result; 
} 
export const useFetchEgo = () => {
    return useQuery("ego", useFetchIdsAction ,
    {
      staleTime: Infinity,
      retry:8,
      retryDelay:attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    });
}
