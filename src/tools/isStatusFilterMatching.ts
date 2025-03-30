// import { ChekOption, Option } from "../components/mirror-dungeon/events/option/MDEventOption";
import { StatusesInterface } from "../store/reducers/statuses-reducer";

export const isStatusFilterMatching = (
    searchValue:string, 
    status:StatusesInterface,
    locale:string) =>{
    const {nameEN,nameRU} = status;

    const name = (locale  === "ru") ? nameRU : nameEN;

    if(name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
        return true;
   
    return false;
}