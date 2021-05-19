export class Comment {
    public stars = 0;
    public review: string;
    public pending = true;
    public user: string;

    constructor(obj: object){
        this.stars = Number(obj['stars']) || 0;
        this.review = obj['review'] || "";
        this.pending = obj['pending'];
        this.user = obj['user'] || "";
    }
}