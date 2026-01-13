import {createContext} from "react";
import CounterStore from "./counterStore.ts";
import { UiStore } from "./uiStore.ts";

interface Store {
    counterStore: CounterStore
    uiStore: UiStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore()
}

export const StoreContext = createContext(store);