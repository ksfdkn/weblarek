import { categoryMap } from "../utils/constants";

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'online' | 'cash';
export type CategoryKey = keyof typeof categoryMap;
export type TCardData = Pick<IProduct, 'title' | "price">;
export type TCardBasket = TCardData;
export type TCardCatalog = Pick<IProduct, 'image' | "category"> & TCardData;
export type TCardPreview = Omit<IProduct, "id">;
export type TModelContent = HTMLElement;

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

export interface IOrderRequest extends IBuyer {
    total: number;
    items: string[];
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export interface ValidationErrors {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface ICardActions {
    onClick?: (event: MouseEvent) => void;
    onAddToCart?: (event: MouseEvent) => void;
    onDelete?: (event: MouseEvent) => void;
}

export interface IBasket {
  basketList: HTMLElement[];
  basketPrice: string;
  basketButtonEnabled: boolean;
}

export interface IContactsForm {
  phone: string;
  email: string;
  errors?: string;
  isValid?: boolean;
}

export interface GalleryData {
  catalog: HTMLElement[];
}

export interface THeader {
  counter: number;
}

export interface IOrderForm {
  address: string;
  payment: string;
  errors?: string;
  isValid?: boolean;
}

export interface ISuccessView {
  total: number;
}

export function isTPayment(value: string): value is TPayment {
    return value === 'online' || value === 'cash';
}