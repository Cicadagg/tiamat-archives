import { identitiesApiKey1, identitiesApiKey2 } from "../constants/apiKeys";
import { useQuery } from "react-query";
import { idsKeys } from "../constants/idsKeys";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";

const SPREADSHEET_ID = '18-JZl9LlsJLT9sLH-ob1DEez4jYDcxJZYWCVQGmhL1o';
const RANGE = 'Ids'; 
const API_KEY1 = identitiesApiKey1;
const API_KEY2 = identitiesApiKey2;

const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;


const useFetchIdsAction = () =>{
    const result = fetchAndValidateData([apiUrl1,apiUrl2],idsKeys);
    return result; 
} 
export const useFetchIds = () => {
    return useQuery("identities", useFetchIdsAction,
    {
      staleTime: Infinity, 
      retry:8,
      retryDelay:attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    });
}