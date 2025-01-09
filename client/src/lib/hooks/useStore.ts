import { useContext } from "react";
import { StoreContext } from "../stores/store";

export function useStore() {
    return useContext(StoreContext);
}