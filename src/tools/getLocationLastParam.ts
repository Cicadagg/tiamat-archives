export const getLocationLastParam = (str:string) =>{
    const lastSlashIndex = str.lastIndexOf('/');
    return str.substring(lastSlashIndex + 1);
}