import { dmgType, guardType, rarityEGOType, rarityIdentityType, sinnerType, sinType, ownerType, seasonType, eventType, guardTypeExtended } from "./types";
const rarityIdentityTypes:rarityIdentityType[] = ["O","OO","OOO"];
const rarityEGOTypes:rarityEGOType[] = ["ZAYIN","TETH","HE","WAW","ALEPH"];
const damageTypes:dmgType[] = ["blunt","slash","pierce"];
const sinTypes:sinType[]= ["wrath","lust","sloth","glut","gloom","pride","envy"];
const guardTypes:guardType[] = ["evade","counter","guard"];
const guardTypesExtended:guardTypeExtended[] = ["counter","evade","counter; slash","counter; blunt","counter; pierce","guard"];
const sinnerTypes:sinnerType[] = ["yi sang","faust","don quixote","ryoshu","mersault","hong lu","heathcliff","ishmael","rodion","sinclair","outis","gregor"];
const tierTypes = ["SSS","SS","S","A","B","C","Test"];
const ownerTypes: ownerType[] = ["ego","sinner","sinner_story","anomaly","none","md_gift"];
const seasonTypes:seasonType[] = ["s-0","s-1","s-2","s-3","s-4","s-5",];
const eventTypes:eventType[] = ["i-1","i-2","i-3.1","i-3.2","i-4.1","i-4.2","i-5.1","i-5.2","w-1","w-2","w-3","w-4","w-5"];

const tagsIds = [
    "bleed",
    "burn",
    "tremor",
    "poise",
    "rupture",
    "charge",
    "sinking",
]


export {damageTypes ,sinTypes , guardTypes ,tagsIds ,sinnerTypes,rarityIdentityTypes,rarityEGOTypes,tierTypes,ownerTypes,seasonTypes,eventTypes,guardTypesExtended};