import { Schema, model } from "mongoose";
import { TOrder } from "./orders.interface";



// Product Schema
const ordersSchema = new Schema<TOrder>({
    email: {
        type: String,
        required: true,
        trim: true,

    },
    productId: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
}, {
    timestamps: true,
});

export const Order = model<TOrder>("Order", ordersSchema);
