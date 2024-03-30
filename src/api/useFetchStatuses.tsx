import {  statusesApiKey1, statusesApiKey2 } from "../constants/apiKeys";
import { useQuery } from "react-query";
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

const useFetchStatusesAction = () =>{
    const result = fetchAndValidateData(
    [
        [apiUrl1_1,apiUrl1_2],
        [apiUrl2_1,apiUrl2_2]
    ],
    statusesKeys);
    return result; 
} 

export const useFetchStatuses = () => {
    return useQuery("statuses", useFetchStatusesAction,
    {
      staleTime: Infinity, 
      retry:8,
      retryDelay:attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    });
}