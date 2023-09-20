export enum Car {
    Civic = 0,
    Kwid = 1,
    Mobi = 2,
    Fit = 3,
    Cobalt = 4,
    Onix = 5,
    Kicks = 6,
    Prius = 7,
    Up = 8,
}

export interface Driver {
    id: number;
    name: string;
    email: string;
    age: number;
    car: Car;
}
