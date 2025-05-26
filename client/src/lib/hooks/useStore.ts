import { useContext } from "react";
import { Storecontext } from "../stores/stores";

export function useStore(){
    return useContext(Storecontext);
}