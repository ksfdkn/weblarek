export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'online' | 'cash';

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
    payment?: TPayment | string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface IProductsResponse  {
    total: number;
    items: IProduct[];
}

export interface IRequest extends IBuyer {
    total: number;
    items: string[];
}

export interface IResponse {
    id: string;
    total: number;
}

export function isTPayment(value: string): value is TPayment {
    return value === 'online' || value === 'cash';
}