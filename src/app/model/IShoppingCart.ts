import { IshoppingCartItems } from "./IshoppingCartItem";

export class IshoppingCart {
    constructor(public items: IshoppingCartItems[]) {
}
get getTotalCount() {
    let counter = 0;
    for (let productID in this.items) {
        counter += this.items[productID].amount;
    }
    return counter;
}

    get ProductsItems() {
        return Object.keys(this.items);
    }
}