export const getCoinsConditionsFromDescription = (descriptions:string[]) => {
    const valuesMap:{
        [key:string]:number;
    } = { 
        "fc":0,
        "cg":0,
        "bc":0,
    }

    for(let j = 0 ; j < descriptions.length;j++){
        const description = descriptions[j];
        if(!description.includes("&")) continue;
        let trackedValue = {index:-1,isTracked:false};
        for(let i = 0; i < description.length;i++){
            const currChar = description[i];
            if(currChar !== "&") continue;
            if(trackedValue.isTracked){
                const triggerVal = description.substring(trackedValue.index + 1,i);
                const {keyVal,numberVal} = praseVal(triggerVal);
                if (keyVal in valuesMap) valuesMap[keyVal] += numberVal;
                trackedValue = {index:i,isTracked:false};
            } else{
                trackedValue = {index:i,isTracked:true};
            }
        }
    }
    
    return valuesMap;

}
const praseVal = (description:string) => {
    let keyVal:string = "";
    let numberVal:string = "";
    for (let i = 0 ; i < description.length; i++ ){ 
        const currChar = description[i];
        if(isNaN(+currChar) && !(["-","+"].includes(currChar)))  keyVal += currChar;
        else if (currChar !== " ") numberVal += currChar;
    }
    return {keyVal:keyVal.toLowerCase(),numberVal: Number(numberVal)};
}