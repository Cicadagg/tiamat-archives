import { ChekOption, Option } from "../components/mirror-dungeon/events/option/MDEventOption";
import { MDEvent } from "../types/md-event-interface";

export const isEventFilterMatching = (
    searchValue:string, 
    event:MDEvent,
    locale:string) =>{
    const {abnoEN,abnoRU,choiceEN,choiceRU} = event;

    const name = (locale  === "ru") ? abnoRU : abnoEN;

    const option = (locale  === "ru") ? choiceRU as Option : choiceEN as Option;

    if(name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
        return true;
    
    const stack = getTextAndOptionsKeys(option);

    for(let i = 0 ; i < stack.length;i++){
        if(
            stack[i]
            .toLowerCase()
            .includes(
                searchValue
                .toLocaleLowerCase()
            )
        )
            return true;
    }

   
    return false;
}
function getTextAndOptionsKeys(option: Option|ChekOption): string[] {
  let textsAndKeys: string[] = [];

  if (option.options) {
    textsAndKeys = textsAndKeys.concat(Object.keys(option.options));
  }
  if (option.result) {
    textsAndKeys.push(option.result);
  }
  if (option.options) {
    Object.values(option.options).forEach((nestedOption) => {
      textsAndKeys = textsAndKeys.concat(getTextAndOptionsKeys(nestedOption));
    });
  }

  if (option.combat_encounter?.result) {
    textsAndKeys.push(option.combat_encounter.result);
  }

  if (option.check_passed) {
    const {result,check_failed,check_passed,options,combat_encounter} = option.check_passed;
    if (combat_encounter?.result) {
      textsAndKeys.push(combat_encounter.result);
    }
    if (result) {
      textsAndKeys.push(result);
    }
    if(options){
      textsAndKeys.concat(Object.keys(options));
      Object.values(options).forEach((nestedOption) => {
        textsAndKeys = textsAndKeys.concat(getTextAndOptionsKeys(nestedOption));
      });
    }
    if(check_failed){
      textsAndKeys = textsAndKeys.concat(getTextAndOptionsKeys(check_failed));
    }
    if(check_passed){
      textsAndKeys = textsAndKeys.concat(getTextAndOptionsKeys(check_passed));
    }
  }

  if (option.check_failed) {
    const {result,check_failed,check_passed,options,combat_encounter} = option.check_failed;
    if (combat_encounter?.result) {
      textsAndKeys.push(combat_encounter.result);
    }
    if (result) {
      textsAndKeys.push(result);
    }
    if(options){
      textsAndKeys.concat(Object.keys(options));
      Object.values(options).forEach((nestedOption) => {
        textsAndKeys = textsAndKeys.concat(getTextAndOptionsKeys(nestedOption));
      });
    }
    if(check_failed){
      textsAndKeys = textsAndKeys.concat(getTextAndOptionsKeys(check_failed));
    }
    if(check_passed){
      textsAndKeys = textsAndKeys.concat(getTextAndOptionsKeys(check_passed));
    }
  }

  return textsAndKeys;
}