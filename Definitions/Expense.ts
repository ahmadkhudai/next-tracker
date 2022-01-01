export interface Expense {
    id:string;
    name:string;
    description:string;
    price:number;
    location?:any;
    date:string;
}

export enum ExpenseFields {
    "id"="id",
    "name"="name",
    "description"="description",
    "price"="price",
    "location"="location",
    "date"="date"
}
