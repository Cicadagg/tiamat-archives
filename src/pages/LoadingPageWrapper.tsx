import { ReactNode } from "react"
import { useFetchByKeys } from "../api/useFetchByKeys";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { handleErrorsAndLoadings } from "../tools/handleErrorsAndLoadings";

interface ILoadingPageWrapper {
    children:ReactNode|ReactNode[];
    queryKeys:string[];
}
export const LoadingPageWrapper:React.FC<ILoadingPageWrapper> = ({children,queryKeys}) => {
    const fetchStates = useFetchByKeys(queryKeys);
    const {error,loading,failureCount} = handleErrorsAndLoadings(fetchStates);
    const mainLayout = () =>{
        if(loading) return <LoadingAnimation failureCount={failureCount}/>;
        if(error) return <ErrorInfo error="Ошибка сервера, повторите попытку чуть позже"/>;
        return children;
    }
    return <>
        {mainLayout()}
    </>
}