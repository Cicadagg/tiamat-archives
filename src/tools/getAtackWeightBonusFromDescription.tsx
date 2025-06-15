export const getAtackWeightBonusFromDescription = (descriptions:string[]) => {
    let result:number = 0;
    descriptions.forEach( l =>{
        const current = l.split("?");
        for(let i = 1 ; i < current.length ; i+=2){
            const currTag = current[i];
            if(!currTag ) continue;
            const [growth , maxCount] = currTag.split(",");
            const growthToNumber = Number(growth);
            const maxCountToNumber = Number(maxCount);
            result += (isNaN(growthToNumber) && 0 || growthToNumber) * (isNaN(maxCountToNumber) && 1 || maxCountToNumber);
        }
    })
    
    return result;
}