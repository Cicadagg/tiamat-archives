import { Option } from "../components/mirror-dungeon/events/option/MDEventOption"

export interface MDEvent {
    id:string
    abnoEN:string
    abnoRU:string
    choiceEN:Option
    choiceRU:Option
}