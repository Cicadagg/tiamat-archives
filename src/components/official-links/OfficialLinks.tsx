import React, { useRef } from "react"
import { Link } from "react-router-dom"
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver"
import { AppleStoreSVG } from "../svg/AppleStoreSVG"
import { GlobalSVG } from "../svg/GlobalSVG"
import { GooglePlaySVG } from "../svg/GooglePlaySVG"
import { RedditSVG } from "../svg/RedditSVG"
import { SteamSVG } from "../svg/SteamSVG"
import { TwitterSVG } from "../svg/TwitterSVG"
import "./OfficialLinks.css"

export const OfficialLinks:React.FC = () => {
    const LinkElement:React.FC<{link:string,SVG:React.FC,name:string}> = ({link,SVG,name}) => { 
        const containerRef = useRef(null);
        const {isVisible} = useIntersectionObserver(containerRef,0.1);
        return <Link ref={containerRef} className={`${isVisible && "official-links--animated"}`} to={link} target="_blank">
            {name}
            <SVG/>
        </Link>
    }
    const links = [
        { name: "limbus company", destination: "https://limbuscompany.com/", svg: GlobalSVG },
        { name: "limbus company google play", destination: "https://play.google.com/store/apps/details?id=com.ProjectMoon.LimbusCompany&pli=1", svg: GooglePlaySVG },
        { name: "limbus company steam", destination: "https://store.steampowered.com/app/1973530/Limbus_Company/", svg: SteamSVG },
        { name: "limbus company apple store", destination: "https://apps.apple.com/us/app/limbus-company/id6444112366", svg: AppleStoreSVG },
        { name: "limbus company twitter", destination: "https://twitter.com/LimbusCompany_B", svg: TwitterSVG },
        { name: "limbus company reddit", destination: "https://www.reddit.com/r/limbuscompany/", svg: RedditSVG },
      ];
      
    return <section className={`official-links`}>
        {links.map((link,index)=>{
            const {destination,svg,name} = link ;
            return <LinkElement key={index} name={name} link={destination} SVG={svg}/>
        })}
</section>
}