import {number} from "prop-types";

export function buildDescription(name: string, price: number, location?: any) {
    return price + " spent on " + name + " from " + location ? location : "";
}
