import {md_giftsApiKey1, md_giftsApiKey2 } from "../constants/apiKeys";
import { useQuery } from "react-query";
import { fetchAndValidateData } from "../tools/fetchAndValidateData";
import { md_giftsKeys } from "../constants/md-giftsKeys";

const SPREADSHEET_ID = '1txG7hvDE_Of1La5hkvmPGQQglLiOk_RWFONgyGlEjFY';
const RANGE = 'Gifts'; 
const API_KEY1 = md_giftsApiKey1;
const API_KEY2 = md_giftsApiKey2;
const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY1}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY2}`;

const useFetchGiftsAction = () =>{
    const result = fetchAndValidateData([apiUrl1,apiUrl2],md_giftsKeys);
    return result; 
} 
export const useFetchMDGifts = () => {
    return useQuery("md-gifts", useFetchGiftsAction ,
    {
      staleTime: Infinity,
      retry:8,
      retryDelay:attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    });
}
