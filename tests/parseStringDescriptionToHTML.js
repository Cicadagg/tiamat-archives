const coditionsMap = {
    "[onhit]" : "[On Hit]"
}
const coinFunc = (value) =>{
    return `<img className="coin${value}"/>`
}
const conditionFunc = (value) =>{
    const valueAsKey = value.toLowerCase().replace(/\s/g, '');
    if( valueAsKey in coditionsMap) 
    return `<span className="condition condition--${valueAsKey.substr(1,valueAsKey.length-2)}">${coditionsMap[valueAsKey]}</span>`;
    return null;
}
const tagFunc = (value) =>{
    return `<img className="status" src="../images/tags/${value}.webp"/><span className="status--name">${value}</span>`
}
const specialsMap = {
    "@":coinFunc,
    "$":conditionFunc,
    "#":tagFunc,
}

const  f = (str) =>{
    let result = [];
    let tracked = {value:"",index:-1};
    for(let i = 0 ; i < str.length;i++){
        const currentChar = str[i];
        if(currentChar in specialsMap){
            if(currentChar === tracked.value){
                const variableVal = str.substring(tracked.index + 1, i);
                const func = specialsMap[currentChar];
                result.push(func(variableVal));
            }else{
                const textVal = str.substring(tracked.index + 1, i);
                if(tracked.value !== "" && tracked.value!=="@")result.push(textVal);
            }
            tracked = { value:currentChar,index:i};
        }
    }
    return result.join("");
}
  
module.exports = f;