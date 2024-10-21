import { GuideInterface } from "../store/reducers/guides-reducer";

export function isGuide(entity: unknown): entity is GuideInterface {
    return (entity as GuideInterface).tagsId !== undefined; 
}
