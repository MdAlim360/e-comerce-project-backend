import { Schema, model } from "mongoose";
import { TProducts } from "./products.interface";

const productsSchema = new Schema<TProducts>({
    image: {
        type: String,
        required: [true, 'Image link must needed'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true
    },
    available_quantity: {
        type: Number,
        required: [true, 'available quantity is required'],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
    },
    rating: {
        type: Number,
        required: [true, 'Rating quantity is required'],
    },
    description: {
        type: String,
        required: [true, 'Description quantity is required'],
        maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    isDeleted: {
        type: String,
        default: false,
    }
},
    {
        timestamps: true,
    },)

export const Product = model<TProducts>("Product", productsSchema)