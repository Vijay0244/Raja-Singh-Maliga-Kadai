import { IProduct, IProductDocument } from "../types/indes"
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema<IProductDocument>({
    costPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    sellingPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true
    },
    translation: {
        en: {
            name: {
                type: String,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['g', 'kg', 'l', 'ml']
            },
            category: {
                type: String,
                required: true
            }
        },
        ta: {
            name: {
                type: String,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['கிராம்', 'கிலோ', 'லிட்டர்', 'மில்லிலிட்டர்']
            },
            category: {
                type: String,
                required: true
            }
        }
    },
    priceHistory: [{
        costPrice: {
            type: mongoose.Schema.Types.Decimal128,
            required: true,
        },
        sellingPrice: {
            type: mongoose.Schema.Types.Decimal128,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
    }]
}, {timestamps: true})

const ProductModel = mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema)
export default ProductModel