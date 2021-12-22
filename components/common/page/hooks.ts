import { useContext } from "react";
import { PageContext } from "./";

export function usePageContext() {
    const [state, dispatch] = useContext<any>(PageContext);
    return [state, dispatch];
}