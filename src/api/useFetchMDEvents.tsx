import { md_eventsApiKey1, md_eventsApiKey2 } from "../constants/apiKeys";
import { useQuery } from "react-query";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";
import { md_eventsKeys } from "../constants/md-eventsKeys";

const SPREADSHEET_ID = '1U3mO1Uje5weKMXpC7esUA4vbyi4ILq5oAdjrHLb4syQ';
const RANGE = 'Event'; 
const API_KEY1 = md_eventsApiKey1;
const API_KEY2 = md_eventsApiKey2;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const useFetchEventsAction = () =>{
    const result = fetchAndValidateData([apiUrl1,apiUrl2],md_eventsKeys);
    return result; 
} 
export const useFetchMDEvents = () => {
    return useQuery("md-events", useFetchEventsAction ,
    {
      staleTime: Infinity,
      retry:8,
      retryDelay:attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    });
}
