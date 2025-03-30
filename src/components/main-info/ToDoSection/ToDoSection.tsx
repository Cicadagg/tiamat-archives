import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver"
import { Link } from "react-router-dom"
import "./ToDoSection.css"
export const ToDoSection: React.FC = () => {
    const {t, i18n} = useTranslation();
    const todos = [
        t("ToDoSection.1"),
        t("ToDoSection.2"),
        t("ToDoSection.3"),
        t("ToDoSection.4")
    ]
    const quickStartLinks = [
        {
            text:t("ToDoSection.contactUs2"),
            to: (i18n.language == "ru") ? `https://discord.gg/BGpmmqknWE` : `https://discord.gg/BGpmmqknWE`
        }
    ]

    const quickStartLinks2 = [
        {
            text:t("ToDoSection.contactUs2"),
            to: (i18n.language == "ru") ? `https://boosty.to/gll-fun` : `https://boosty.to/gll-fun`
        }
    ]
    const NavLink:React.FC<{to:string,text:string}> = ({to,text}) =>{
        const containerRef = useRef(null);
        return<span className="text-support-site">
        <Link to={to} ref={containerRef} className={"support-link"}>
            {text}
        </Link>
    </span>
    }
    const AnimatedList:React.FC<{text:string}> = ({text}) => {
        const listRef = useRef(null);
        const {isVisible} = useIntersectionObserver(listRef,0.5);
        return <li ref={listRef} className={`${ isVisible && "todo-section--animated"}`}>
            {text}
        </li>
    }
    return <section className="todo-section">
    <h2> {t("ToDoSection.header")} </h2>
    <p>
        {t("ToDoSection.contactUs")}
        {quickStartLinks.map((link, index) => {
            return <NavLink key={index} to={link.to} text={link.text}/>
        })}
        {t("ToDoSection.contactUs3")}
    </p>
    <ul>
     {todos.map((todo,index)=>{
        return <AnimatedList text={todo} key={index}/> 
     })}
    </ul>
</section>
}