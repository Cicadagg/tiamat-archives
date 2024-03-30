import axios from "axios";
import { getValidatedData } from "../constants/validations";

type ValidationKeys= {
    key: string;
    validation: Function;
}[];

export const fetchAndValidateData = async (urls:string[]|string[][],validationKeys:ValidationKeys , count = 0): Promise<unknown[]> => {
    if(count >= urls.length) throw new Error("Failed to fetch data.");
    try {
        const currentUrl = urls[count];
        if(Array.isArray(currentUrl)){
            const responses = await Promise.all(
                currentUrl.map((url) => axios.get(url))
            );
            return getValidatedData(
                responses.map((response) => response.data.values),
                validationKeys
            );
        } 
        else{
            const response = await axios.get(currentUrl);
            return getValidatedData([response.data.values], validationKeys);
        } 
    } catch (error) {
        return fetchAndValidateData(urls,validationKeys,count+1);
    }
};
