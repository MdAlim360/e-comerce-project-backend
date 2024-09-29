import { Schema, model } from "mongoose";
import { TProducts } from "./products.interface";

// Variant Schema
const VariantSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

// Inventory Schema
const InventorySchema = new Schema({
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    inStock: {
        type: Boolean,
        required: true
    }
});

// Product Schema
const productsSchema = new Schema<TProducts>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },


    price: {
        type: Number,
        required: [true, 'Price is required'],
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    tags: {
        type: [String],
        required: true
    },
    variants: {
        type: [VariantSchema],
        required: true
    },
    inventory: {
        type: InventorySchema,
        required: true
    },
}, {
    timestamps: true,
});

export const Product = model<TProducts>("Product", productsSchema);
