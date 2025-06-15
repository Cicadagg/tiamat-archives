import { BingoInterface } from "../store/reducers/bingo-reducer";

export function isBingo(entity: unknown): entity is BingoInterface {
    return (entity as BingoInterface).ids !== undefined; 
}