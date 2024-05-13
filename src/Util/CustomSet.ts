/** /Util/CustomSet
 * 
 * @author Alex Malotky
 */

/** Custom Set
 * 
 * Unique set that returns elements removed as new elements are added if the max size is hit.
 */
export default class CustomSet<t>{
    private _maxSize: number;
    private _list: Array<t>;

    constructor(maxSize: number){
        this._list = [];
        this._maxSize = maxSize;
    }

    /** Get Iterator
     * 
     * @returns {IterableIterator<t>}
     */
    public [Symbol.iterator]():IterableIterator<t> {
        return this._list.values();
    }

    /** Shrink Set
     * 
     * Removes element from list.
     * 
     * @returns {t}
     */
    private shrink():t{
        return this._list.pop();
    }

    /** Set Max Size
     * 
     * Sets Max size and returns elements removed if needed.
     * 
     * @param {number} value 
     * @returns {Array<t>} - list of items remvoed
     */
    setMaxSize(value: number):Array<t>{
        if(value <= 0)
            value = 1;

        let output: Array<t> = [];
        this._maxSize = value;

        while(this._list.length > this._maxSize){
            output.push(this.shrink());
        }
        
        return output;
    }

    /** Add Item
     * 
     * Adds new item, and removes item if at max size.
     * 
     * @param {t} item 
     * @returns {t} - item removed
     */
    public add(item: t):t{
        let output: t|undefined = undefined;

        if(!this._list.includes(item)){
            if(this._list.length >= this._maxSize)
                output = this.shrink();

            this._list.push(item)
        }

        return output;
    }

    /** Delete Item
     * 
     * Does nothing if item is not in the list.
     * 
     * @param {t} item 
     */
    public delete(item: t):void{
        let index = this._list.indexOf(item);
        if(index > -1){
            this._list.splice(index, 1);
        }
    }

    /** Clear List
     * 
     * Will return items that are removed fro the list.
     * 
     * @returns {Array<t>} - items removed
     */
    public clear(): Array<t>{
        let output: Array<t> = [];
        while(this._list.length > 0)
            output.push(this.shrink());
        return output;
    }

    /** For Each Loop
     * 
     * @param {Function} callback 
     */
    public forEach(callback:(value: t,index: number)=>void): void{
        this._list.forEach(callback);
    }
}