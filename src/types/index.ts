export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'card' | 'cash';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

// раньше зачем-то TPayment сделала интерфейсом, а не типом, писала функцию для проверки
// хочу оставить ее, вдруг понадобиться когда-нибудь :)
export function isTPayment(value: string): value is TPayment {
  return value === 'card' || value === 'cash';
}