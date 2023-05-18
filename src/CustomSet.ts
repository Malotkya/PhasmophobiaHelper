export default class CustomSet<t>{
    private _maxSize: number;
    private _list: Array<t>;

    constructor(maxSize: number){
        this._list = [];
        this._maxSize = maxSize;
    }

    private shrink(){
        return this._list.pop();
    }

    setMaxSize(value: number){
        let output: Array<t> = [];
        this._maxSize = value;
        while(this._list.length > this._maxSize){
            output.push(this.shrink());
        }
        return output;
    }

    public add(item: t){
        let output: t|undefined = undefined;

        if(!this._list.includes(item)){
            if(this._list.length === this._maxSize)
                output = this.shrink();

            this._list.push(item)
        }

        return output;
    }

    public delete(item: t){
        let index = this._list.indexOf(item);
        if(index > -1){
            this._list.splice(index, 1);
        }
    }

    public clear(){
        while(this._list.length > 0)
            this.shrink();
    }

    public forEach(callback:(value: t,index: number)=>void){
        this._list.forEach(callback);
    }
}