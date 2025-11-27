export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'online' | 'cash'; 
// если нужно, то `online` поменяю на `card`
// просто в postman увидела `payment: online`

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

export interface IProductsResponce {
    total: number;
    items: IProduct[];
}

export interface IRequest extends IBuyer {
    total: number;
    items: string[];
}
//в теории написано, что запрос будем в след.спринте отправлять
export interface IResponse {
    id: string;
    total: number;
}

// хочу оставить ее, вдруг понадобиться когда-нибудь :)
// пы.сы. вроде как понадобилась, чтобы при сохранении мы не могли передавать любой string
export function isTPayment(value: string): value is TPayment {
  return value === 'online' || value === 'cash';
}