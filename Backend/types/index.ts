import { Document, Types } from 'mongoose';

export interface IPriceEntry{
    costPrice: Types.Decimal128;
    sellingPrice: Types.Decimal128;
    date: Date;
}

export interface IProduct{
    name: string;
    unit: 'கிராம்' | 'கிலோ' | 'லிட்டர்' | 'மில்லிலிட்டர்';
    category: string;
    costPrice: Types.Decimal128;
    sellingPrice: Types.Decimal128;
    date: Date;
    quantity: number;
    priceHistory: IPriceEntry[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProductDocument extends IProduct, Document {}
