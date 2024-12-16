export default class SpecialArray<T> extends Array<T> {
    max:number;

    constructor(maxLength:number){
        super();
        this.max = maxLength;
    } 

    push(...items:T[]):number{
        while(items.length > 0){
            if(this.length >= this.max)
                this.pop();

            super.push(items.pop())
        }

        return this.length;
    }

    clear(){
        while(this.length > 0)
            this.pop();
    }
}