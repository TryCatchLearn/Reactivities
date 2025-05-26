import { makeAutoObservable } from 'mobx'
export default class CounterStore {
    title = 'Counter Store';
    count = 10;
    events: string[]=[
        `Initial Count Is ${this.count}`
   

    ]

    constructor() {
        makeAutoObservable(this)
        
    }
    increment = (amount=1) =>
    {
        this.count +=amount
        this.events.push(`Incremented by${amount} - Count is Now${this.count}`);


    }
    decrement = (amount=1) =>
    {
        this.count -=amount
        this.events.push(`Decremented by${amount} - Count is Now${this.count}`);

    }
    get eventCount() {
        return this.events.length;
    }
}