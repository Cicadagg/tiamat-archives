import { sinType } from "../constants/types"

export interface MDGift {
    id:string
    nameEN:string
    nameRU:string
    tier:number
    sin:sinType
    keyword:string
    grade1EN:string
    grade2EN:string
    grade3EN:string
    grade1RU:string
    grade2RU:string
    grade3RU:string
    cost:string
    obtainEN:string
    obtainRU:string
}