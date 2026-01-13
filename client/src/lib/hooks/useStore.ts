import {useContext} from "react";
import {StoreContext} from "../stores/store.ts";

export function useStore() {
    return useContext(StoreContext);
}