import { Document, Types } from 'mongoose';

export interface IPriceEntry{
    costPrice: Types.Decimal128;
    sellingPrice: Types.Decimal128;
    date: Date;
}

export interface ITranslation{
    name: string;
    unit: 'g' | 'kg' | 'l' | 'ml' | 'கிராம்' | 'கிலோ' | 'லிட்டர்' | 'மில்லிலிட்டர்';
    category: string;
}

export interface IProduct{
    costPrice: Types.Decimal128;
    sellingPrice: Types.Decimal128;
    date: Date;
    quantity: number;
    translation: {
        en: ITranslation;
        ta: ITranslation;
    };
    priceHistory: IPriceEntry[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProductDocument extends IProduct, Document {}
