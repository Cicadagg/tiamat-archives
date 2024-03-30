
export const RemoveSVG:React.FC<{active:boolean}> = ({active}) =>{
    const color = (active) ? "#3AA1FF": "#AFAEB4";
    return<svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="11" fill="rgba(0, 0, 0, 0.3)" />
    <path
      d="M15.293 8.293L12 11.586L8.70703 8.293L7.29297 9.707L10.586 13L7.29297 16.293L8.70703 17.707L12 14.414L15.293 17.707L16.708 16.293L13.414 13L16.708 9.707L15.293 8.293Z"
      fill="#FFFFFF"
    />
  </svg>
}
