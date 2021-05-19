import { Address } from "./address";

export class User {
    public name: string;
    public lastname: string;
    public email:string;
    public phone:string;
    public password:string;
    public address: Address;
    public admin:boolean;

    constructor(obj: object) {
        this.name = obj['name'] || '';
        this.lastname = obj['lastname'] || '';
        this.address = new Address(obj['address'] || {});
        this.email = obj['email'] || '';
        this.phone = obj['phone'] || '';
        this.password = obj['password'] || '';
        this.admin = obj['admin'] || false;
    }
}