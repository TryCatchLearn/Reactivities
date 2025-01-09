import { makeAutoObservable } from "mobx";

export class UiStore {
    isLoading = false;
    
    constructor() {
        makeAutoObservable(this)
    }

    isBusy() {
        this.isLoading = true
    }

    isIdle() {
        this.isLoading = false
    }
}