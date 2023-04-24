export const pizzaSizes = [
    "small", "medium", "large", "extra large"
];

export const saladIngredients = [
    "lettuce", "tomatoes", "red onions", "olives", "peppers", "parmesan"
];

export const pizzaToppings = [
    "pepperoni","sausage", "mushrooms", "basil", "extraCheese", "extraSauce", "anchovies", "pineapple", "olives", "arugula", "Canadian bacon"
];

export type Pizza = {
    itemType: "pizza";
    // default: large
    size?: string;
    // an array of strings from the pizzaToppings array
    addedToppings?: string[];
    removedToppings?: string[];   
    // default: 1
    quantity?: number;
};

export const beerKind = [
    "Mack and Jacks", "Sierra Nevada Pale Ale"
];

export type Beer = {
    itemType: "beer";
    kind: string;
    // default: 1
    quantity?: number;
};

export const saladSize = [
    "half", "whole"
];

export const saladStyle = [
    "Garden", "Greek"
];

export type Salad = {
    itemType: "salad";
    // default: half
    size?: string;
    // default: garden
    style?: string;
    // an array of strings from the saladIngredients array 
    addedIngredients?: string[];
    removedIngredients?: string[];   
    // default: 1
    quantity?: number;
};

export type OrderItem = Pizza | Beer | Salad;

// an order from a restaurant that serves pizza, beer, and salad
export type Order = {
    items: OrderItem[];
}
