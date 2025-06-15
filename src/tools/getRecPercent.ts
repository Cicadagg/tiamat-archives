export {};
// recomendation params : tagStatusType FreeSlot EnergyGain EnergyConsumes
//description for recomendation 
const egplist = [{equiped:true}];//not in slot! [ego , ego , ego] if(!id.equiped)
const idList = [{equiped:false}];//not in slot! [id , id , id]  if(!id.equiped)
const slotsList = [];//not in slot! [id , id , id]  if(!id.equiped)

const energyListReq = {
    "wrath":0,
    "lust":0,
    "sloth":0,
    "glutony":0,
    "gloom":0,
    "pride":0,
    "envy":0,
}; // state {energy:count , ...}
const energyListPresent = {
    "wrath":0,
    "lust":0,
    "sloth":0,
    "glutony":0,
    "gloom":0,
    "pride":0,
    "envy":0,
} // state {energy:count , ...}

const energy = {
    "energyListReq": energyListReq,
    "energyListPresent": energyListPresent,
}