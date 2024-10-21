import React, { useEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { mobileLayoutFrom } from "../../constants/mobileLayoutFrom";
import useHover from "../../hooks/useHover";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { isIdentity } from "../../tools/isIdentity";
import { ItemEGOInfo } from "../item-ego-info/ItemEGOInfo";
import { ItemIdentityInfo } from "../item-identity-info/ItemIdentityInfo";
import "./ItemGuide.css";
import { GuideInterface } from "../../store/reducers/guides-reducer";
import { GuideTagInterface } from "../../store/reducers/guides-tags-reducer";
import { GuideTag } from "./GuideTag";


export interface IItemEntity{
    entity: GuideInterface;
    tags: GuideTagInterface[],
    animationDelay?:number;
}
export const ItemGuide:React.FC<IItemEntity> = ({entity, tags, animationDelay}) =>{
    let {date, descriptionRu, descriptionEn, tagsId, nameRu, nameEn} = entity;
    descriptionEn = descriptionEn.replace(/<img src="(.*?)"/g, '<img src="/images/guides/$1"');
    descriptionRu = descriptionRu.replace(/<img src="(.*?)"/g, '<img src="/images/guides/$1"');
    /*
    const [animatedClass, setAnimatedClass] = useState("");
    const [timer, setTimer] = useState<NodeJS.Timeout|null>(null);
    
    const { i18n } = useTranslation();
    const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof entity;
    const name = entity[nameKey] as string;
    const isEgo = !isIdentity(entity);
    const rarityStyled = (isEgo) ? rarity :  rarity.replaceAll("O","Ø");
    const frameRarityClass = (isEgo) ? `${entity.egoSin}-sin-color` :  `item-entity-frame--${rarity}`;
    const imgFolder = (isEgo) ?  "ego" : "identities";
    const refItem = useRef<HTMLAnchorElement>(null);
    const {isVisible} = useIntersectionObserver(refItem , 0.1);
    const isHovering = useHover(refItem);
    const HoverComponent = (isEgo) ?  <ItemEGOInfo entity={entity} /> : <ItemIdentityInfo entity={entity} />;
    const linkDestination = (isEgo) ?  `/${i18n.language}/ego/${imgUrl}` : `/${i18n.language}/identities/${imgUrl}`;

    useEffect(()=>{
        let tim:NodeJS.Timeout|null = null;
        if(isVisible){
            const deplay = animationDelay || 0;
            tim = setTimeout(()=>setAnimatedClass("item-entity-container--animated"),deplay);
            setTimer(tim);
        }
        return ()=>{
            if(tim) clearTimeout(tim);
        }
    },[isVisible])*/
  
    return (
        <div>
        <h1>{nameRu}</h1>
        <span>{date}</span>
        <div dangerouslySetInnerHTML={{ __html: descriptionRu }} />
        {tags.map((tag: GuideTagInterface) => 
            <GuideTag name={tag.nameRu} />
        )}
        {/*<Link to={linkDestination} ref={refItem} className={`item-entity-container ${animatedClass}`} >
            {
                isHovering && window.innerWidth > mobileLayoutFrom && HoverComponent
                } 
                <div className={"shadow"}>
                <img className="item-entity-image" src={`${process.env.PUBLIC_URL}/images/${imgFolder}/${imgUrl}.webp`} alt={`${imgUrl}`}/>
                </div>
                {!!(+isNew) && <span className="item-entity-new" >NEW</span>}
                <div className="item-entity-rarity" >{rarityStyled}</div>
                <div>
                <div className={"item-entity-name"} >{name}</div>
                <div className={["item-entity-frame",`${frameRarityClass}`].join(" ")} ></div>
                </div>
                </Link>*/}
        </div>
    )
}