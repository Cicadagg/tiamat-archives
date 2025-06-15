import { IdentityInterface } from "../store/reducers/ids-reducer";

export function isIdentity(entity: unknown): entity is IdentityInterface {
    return (entity as IdentityInterface).hp !== undefined; 
}