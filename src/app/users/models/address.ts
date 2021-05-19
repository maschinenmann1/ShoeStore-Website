export class Address {
    
    public country: string;
    public province: string = "";
    public city: string;
    public zipCode: number = NaN;
    public direction: string;

    constructor(obj: object) {
        if ('object' !== typeof obj) {
            throw new Error('La dirección no es un objeto');
        }
        this.country = obj['country'] || '';
        this.province = obj['province'] || '';
        this.city = obj['city'] || '';
        this.zipCode = obj['zipCode'] || NaN;
        this.direction = obj['direction'] || '';
    }
}