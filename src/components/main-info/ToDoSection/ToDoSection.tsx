import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver"
import "./ToDoSection.css"
export const ToDoSection: React.FC = () => {
    const {t} = useTranslation();
    const todos = [
        t("ToDoSection.1"),
        t("ToDoSection.2"),
        t("ToDoSection.3")
    ]
    const AnimatedList:React.FC<{text:string}> = ({text}) => {
        const listRef = useRef(null);
        const {isVisible} = useIntersectionObserver(listRef,0.5);
        return <li ref={listRef} className={`${ isVisible && "todo-section--animated"}`}>
            {text}
        </li>
    }
    return <section className="todo-section">
    <h2> {t("ToDoSection.header")} </h2>
    <p>{t("ToDoSection.contactUs")} </p>
    <ul>
     {todos.map((todo,index)=>{
        return <AnimatedList text={todo} key={index}/> 
     })}
    </ul>
</section>
}