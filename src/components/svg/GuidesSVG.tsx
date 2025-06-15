
export const GuidesSVG:React.FC<{active:boolean}> = ({active}) =>{
    const color = (active) ? "#3AA1FF": "#AFAEB4";
    return<svg width="256px" height="256px" viewBox="-1.6 -1.6 19.20 19.20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00016">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <path d="M5 1H8V15H5V1Z" fill={`${color}`}></path> 
            <path d="M0 3H3V15H0V3Z" fill={`${color}`}></path> 
            <path d="M12.167 3L9.34302 3.7041L12.1594 15L14.9834 14.2959L12.167 3Z" fill={`${color}`}></path> 
        </g>
    </svg>
}
