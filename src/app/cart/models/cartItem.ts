import { Item } from 'src/app/products/models/item';

export class CartItem {
    public id: number = NaN;
    public qty: number = 1;
    public product: Item = new Item();
    constructor(other?:any){
        
        const thisKeys = Object.keys(this);
        const otherKeys = Object.keys(other || {});
        const commonKeys = otherKeys.filter(key => thisKeys.indexOf(key) >= 0);
        for (let key of commonKeys) {
            if (key === 'product') {
                this[key] = other[key] ? new Item(other[key]) : new Item();
            } else {
                this[key] = other[key];
            }
        }

    }

}