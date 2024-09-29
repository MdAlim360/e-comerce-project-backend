import httpStatus from "http-status";
import AppError from "../../errors/appError";

import QueryBuilder from "../../builder/queryBuilder";
import { TOrder } from "./orders.interface";
import { Order } from "./orders.model";
import { orderSearchableFields } from "./orders.constant";
import { Product } from "../products/products.model";

const createOrdersIntoDb = async (payload: TOrder) => {
    const newOrder = await Order.create([payload]);
    if (!newOrder.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }

    // Fetch product to check stock
    const product = await Product.findById(payload.productId);
    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
    }

    // Check product inventory
    if (product.inventory?.quantity <= 0) {
        await Product.findByIdAndUpdate(payload.productId, { 'inventory.inStock': false });
        throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock');
    }

    // Decrement product quantity and update stock status if needed
    const updatedQuantity = product.inventory.quantity - 1;
    const isOutOfStock = updatedQuantity <= 0;
    await Product.findByIdAndUpdate(payload.productId, {
        'inventory.quantity': updatedQuantity,
        'inventory.inStock': !isOutOfStock
    });

    return newOrder;
};

const getOrdersFromDb = async (query: Record<string, unknown>) => {

    const order = await Order.find(query)
    if (order.length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Order not found');
    }
    const productQuery = new QueryBuilder(Order.find(), query)
        .search(orderSearchableFields)
        .filter()
        .sort()
        .paginate();

    const result = await productQuery.modelQuery;
    return result;
};

const getSingleOrderFromDb = async (id: string) => {
    const result = await Order.findById(id);
    return result;
};

export const orderServices = {
    createOrdersIntoDb,
    getOrdersFromDb,
    getSingleOrderFromDb,
};
