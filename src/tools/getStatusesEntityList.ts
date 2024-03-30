export const getStatusesEntityList = (strsArr:string[]) => {
    const result: {
        [key:string]:number;
    } = {};
    strsArr.forEach( l =>{
        const current = l.split("#");
        for(let i = 1 ; i < current.length ; i+=2){
            const currTag = current[i];
            if(!currTag ) continue;
            if(!(currTag in result)){
                result[currTag] = 1;
            }
            else{
                result[currTag] += 1;
            }
        }
    })
    return result;
}