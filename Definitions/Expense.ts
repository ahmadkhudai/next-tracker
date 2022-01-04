export interface Expense {
    id:string;
    name:string;
    category?:ExpenseCategories;
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
export enum ExpenseCategories {
    "food",
    "clothing",
    "shoes",
    "social_life",
    "snacks",
    "other"
}

export const RequiredFields = [ExpenseFields.name, ExpenseFields.price,ExpenseFields.date];
// ExpenseFields.
