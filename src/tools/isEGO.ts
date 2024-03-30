import { EGOInterface } from "../store/reducers/ego-reducer";

export function isEGO(entity: unknown): entity is EGOInterface {
    return (entity as EGOInterface).wrath !== undefined; 
}