import { UseQueryResult } from "react-query";

export const handleErrorsAndLoadings = (states:Array< UseQueryResult<unknown[], unknown>>) => {
    const loading = states.some((state) => state.isLoading );
    const error = states.some((state) => state.isError );
    const failureCount = states.reduce((acc, state) => {
       return Math.max(state.failureCount,acc)
    } , 0);
    return {error,loading,failureCount}
}