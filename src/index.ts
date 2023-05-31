
import { v4 as uuidv4 } from 'uuid';

class User {
    private _id!: string;
    private _name!: string;
    private _age!: number;
    private _cart: Item[] = [];

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get age(): number {
        return this._age;
    }
    public set age(value: number) {
        this._age = value;
    }
    public get cart(): Item[] {
        return this._cart;
    }
    public set cart(value: Item[]) {
        this._cart = value;
    }
    addToCart(item: Item): void {
        this._cart.push(item);
    }
    removeFromCart(item: Item): void {
        let res = []
        for (let i = 0; i < this._cart.length; i++) {
            if (this._cart[i].id !== item.id) {
                res.push(this._cart[i])
            }
        }
        this._cart = res;
    }
    removeQuantityFromCart(item: Item, quantity: number): void {
        for (let i = 0; i < this._cart.length; i++) {
            if (this._cart[i].id === item.id) {
                this._cart.splice(i, quantity);
            }
        }
    }
    cartTotal(): number {
        let total = 0;
        for (let i = 0; i < this._cart.length; i++) {
            total += this._cart[i].price;
        }
        return Math.round(total * 100) / 100;
    }
    printCart(): void {
        console.log('Cart: ');
        for (let i = 0; i < this._cart.length; i++) {
            console.log(this._cart[i].name);   // remove .name to print all info
        }
    }

    static loginInUser(): User {
        let name = document.getElementsByClassName('login-form-name')[0] as HTMLInputElement;
        let age = document.getElementsByClassName('login-form-age')[0] as HTMLInputElement;
        let user = new User();
        user.name = name.value;
        user.age = age.valueAsNumber;
        return user;
    }

    cartHTMLElement(): HTMLDivElement {
        let cart = document.getElementsByClassName('cart')[0] as HTMLDivElement;
        this._cart.length == 0 ? cart.innerHTML = 'Cart is Empty' : cart.innerHTML = '';
        let total = document.createElement('div');
        total.textContent = 'Total: $' + this.cartTotal().toString();
        for (let i = 0; i < this._cart.length; i++) {
            let item = document.createElement('div');
            let name = document.createElement('div');
            name.textContent = this._cart[i].name;
            let price = document.createElement('div');
            price.textContent = this._cart[i].price.toString();
            let description = document.createElement('div');
            description.textContent = this._cart[i].description;
            let removeOne = document.createElement('button');
            removeOne.textContent = 'Remove One';
            let removeAll = document.createElement('button');
            removeAll.textContent = 'Remove All';
            item.appendChild(name);
            item.appendChild(price);
            item.appendChild(description);
            item.appendChild(removeOne);
            item.appendChild(removeAll);
            cart.appendChild(item);
            cart.appendChild(total);
            removeOne.addEventListener('click', (e) => {
                e.preventDefault();
                this.removeQuantityFromCart(this._cart[i], 1);
                this.cartHTMLElement();
            }
            );
            removeAll.addEventListener('click', (e) => {
                e.preventDefault();
                this.removeFromCart(this._cart[i]);
                this.cartHTMLElement();
            }
            );
        }
        return cart;
    }   
}


class Item {
    private _id: string = uuidv4();
    private _name: string = '';
    private _price: number = 0;
    private _description: string = '';

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    itemElement(): HTMLDivElement{
        let shop = document.getElementsByClassName('shop')[0] as HTMLDivElement;
        let  item = document.createElement('div');
        item.className = 'item';
        let name = document.createElement('div');
        name.textContent = this._name;
        let price = document.createElement('div');
        price.className = 'price';
        price.textContent = this._price.toString();
        let description = document.createElement('div');
        description.className = 'description';
        description.textContent = this._description;
        let button = document.createElement('button');
        button.className = 'add-to-cart';
        button.textContent = 'Add to Cart';
       
        button.addEventListener('click', (e) => {
            e.preventDefault();
                user.addToCart(this);
                user.cartHTMLElement();
            }
        );
   
        item.appendChild(name);
        item.appendChild(price);
        item.appendChild(description);
        item.appendChild(button);
        shop.appendChild(item);
        return item;
    }
}



class Shop {
    private _items: Item[] = [];

    public get items(): Item[] {
        return this._items;
    }
    public set items(value: Item[]) {
        this._items = value;
    }
    constructor() {
        let itemA = new Item();
        itemA.name = 'Shirt';
        itemA.price = 19.99;
        itemA.description = 'Nike Shirt';
        this._items.push(itemA);
        
        let itemB = new Item();
        itemB.name = 'Socks';
        itemB.price = 15.99;
        itemB.description = 'Nike Soccer Socks';
        this._items.push(itemB);

        let itemC = new Item();
        itemC.name = 'Shoes';
        itemC.price = 59.99;
        itemC.description = 'Nike Shoes';
        this._items.push(itemC);

        let itemD = new Item();
        itemD.name = 'Shorts';
        itemD.price = 29.99;
        itemD.description = 'Nike Shorts';
        this._items.push(itemD);

        let itemE = new Item();
        itemE.name = 'Hat';
        itemE.price = 19.99;
        itemE.description = 'Nike Hat';
        this._items.push(itemE);

        let itemF = new Item();
        itemF.name = 'Sweatshirt';
        itemF.price = 39.99;
        itemF.description = 'Nike Sweatshirt';
        this._items.push(itemF);
    }
    showItems(): HTMLDivElement{
        for (let i = 0 ; i < this._items.length; i++){
            this._items[i].itemElement();

        }
        return document.getElementsByClassName('shop')[0] as HTMLDivElement;
    }
    updateCart():HTMLDivElement{
        this._items.length == 0 ? document.getElementsByClassName('cart')[0].innerHTML = 'Cart is Empty' : document.getElementsByClassName('cart')[0].innerHTML = '';
        let user = User.loginInUser();
        user.cartHTMLElement();
        return document.getElementsByClassName('cart')[0] as HTMLDivElement;
    }
    static myUser(name: string = 'undefined', age: number = 0): User{
        let username = name
        let userage = age
        let newUser = new User();
        newUser.name = username;
        newUser.age = userage;
        console.log(newUser + 'my user');
        return newUser;

    }
    static loginUser(event: Event): User{
        event.preventDefault();
        let name = document.getElementsByClassName('login-form-name')[0] as HTMLInputElement;
        let age = document.getElementsByClassName('login-form-age')[0] as HTMLInputElement;
        let user = new User();
        user.name = name.value;
        user.age = age.valueAsNumber;
        console.log(user + ' logged in');
        return user;
    }
}





let itemA = new Item();
itemA.name = 'Shirt';
itemA.price = 19.99;
itemA.description = 'Nike Shirt';
itemA.itemElement();


let shop = new Shop();
shop.showItems();
shop.updateCart();


let user = new User();
user.name = 'Vinh';
user.age = 30;
user.addToCart(shop.items[0]);
user.addToCart(shop.items[0]);
user.addToCart(shop.items[1]);
user.addToCart(shop.items[1]);
user.cartHTMLElement()







