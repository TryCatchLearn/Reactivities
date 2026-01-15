import {createContext} from "react";
import CounterStore from "./counterStore.ts";
import { UiStore } from "./uiStore.ts";
import { ActivityStore } from "./activityStore.ts";

interface Store {
    counterStore: CounterStore
    uiStore: UiStore
    activityStore: ActivityStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore(),
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);