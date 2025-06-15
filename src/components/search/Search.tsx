import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { searchChangeValueAction } from "../../store/reducers/search-reducer";
import { SearchSVG } from "../svg/SearchSVG";
import { XMarkSVG } from "../svg/XMark";
import "./Search.css";

export const Search:React.FC = () =>{
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {targetRef} = useTypedSelector(store=>store.searchReducer);
    const inputRef = useRef<HTMLInputElement>(null);
    const [timeoutId,setTimeoutId] = useState<null|NodeJS.Timeout>(null);
    const handleInputCHange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const val = e.target.value || "";
        handleSearchDelay(()=>searchChangeValueAction(dispatch, val));
    }
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>,targetRef:React.RefObject<HTMLElement|null>|null) => {
        event.preventDefault();
        if (targetRef?.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
    const handleSearchDelay = (searchAction:() => void) => {
        if (timeoutId){clearTimeout(timeoutId);}

        const newTimeoutId = setTimeout(() => {
            searchAction();
            setTimeoutId(null);
        }, 500);

        setTimeoutId(newTimeoutId);
    }

    useEffect(() => {
        return () => {
            if(timeoutId) clearTimeout(timeoutId)
        };
    }, [timeoutId]);
   

    return <form className="search" onSubmit={ (e) => {handleSubmit(e,targetRef) }} >
        <input ref={inputRef} placeholder={t("Search.placeholder")} onChange={(e)=>{handleInputCHange(e)}}/>
        {inputRef?.current?.value && <button className="btn-clear" type="button" onClick={ () => {
            if (inputRef.current) {
                inputRef.current.value = '';
                searchChangeValueAction(dispatch, "");
            }
        }}><XMarkSVG/></button>}
        <button aria-label="apply filter by name" className="btn-search" type="submit"><SearchSVG/></button>
        <div className={`search-loader ${!timeoutId && "search-loader--hidden"}`}>
            <div className="search-gray-line"></div>
            <div className="search-white-line"></div>
        </div>
    </form>
}