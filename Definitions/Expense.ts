export interface Expense {
    id:string;
    name:string;
    description:string;
    price:number;
    location?:any;
    date:Date;
}