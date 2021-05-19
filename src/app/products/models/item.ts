import { Comment } from 'src/app/comments/models/comment';
import { environment } from "src/environments/environment";
import { Colors } from './colors';
import { Section } from "./section";

export class Item {
    public id: number = NaN;
    public name: string = "";
    public price: number = NaN;
    public imgBase64:string = "";
    public imgName: string = "";
    public descriptionLong: string = "";
    public comments: Comment[] = [];
    public imgSrc: string;
    public section: Section = "";
    public size: number[] = [];
    public colors: Colors[] = [];

    constructor(other?: any) {
        this.comments = [];
        this.colors = [];
        this.size = [];

        const thisKeys = Object.keys(this);
        const otherKeys = Object.keys(other || {});
        const commonKeys = otherKeys.filter(key => thisKeys.indexOf(key) >= 0);
        for (let key of commonKeys) {
            if (key === 'comments') {
                this[key] = other['comments'].map(c => new Comment(c));
            } else {
                this[key] = other[key];
            }
        }
        
        if(this.imgBase64){
            this.imgSrc= this.imgBase64;
        }else{
            this.imgSrc = environment.assetsFolder + (this.imgName ? this.imgName : '/no-image.png');
        }
    }
}