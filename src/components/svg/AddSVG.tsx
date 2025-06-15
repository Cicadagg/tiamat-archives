
export const AddSVG:React.FC<{active:boolean}> = ({active}) =>{
    const color = (active) ? "#3AA1FF": "#AFAEB4";
    return<svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="11" fill="rgba(0, 0, 0, 0.3)" />
    <line x1="12" y1="7" x2="12" y2="17" stroke="#FFFFFF" strokeWidth="2" />
    <line x1="7" y1="12" x2="17" y2="12" stroke="#FFFFFF" strokeWidth="2" />
  </svg>
}
