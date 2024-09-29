import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TProducts } from "./products.interface";
import { Product } from "./products.model";
import { studentSearchableFields } from "./products.constant";
import QueryBuilder from "../../builder/queryBuilder";

const createProductsIntoDb = async (payload: TProducts) => {
    const newProduct = await Product.create([payload]);
    if (!newProduct.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create product');
    }
    return newProduct;
}
const getProductsFromDb = async (query: Record<string, unknown>) => {
    // console.log(query);
    console.log(query);
    const productQuery = new QueryBuilder(
        Product.find(),
        query,
    )
        .search(studentSearchableFields)
        .filter()
        .sort()
        .paginate()

    // const meta = await productQuery.countTotal();
    const result = await productQuery.modelQuery;
    // console.log(meta);

    // return {
    //     meta,
    //     result,
    // }
    return result;
};

const getSingleProductFromDb = async (id: string) => {
    const result = await Product.findById(id);
    return result;
}

const updateProduct = async (id: string, payload: Partial<TProducts>) => {
    const result = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteProductFromDb = async (id: string) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
}

export const productServices = {
    createProductsIntoDb,
    getProductsFromDb,
    getSingleProductFromDb,
    updateProduct,
    deleteProductFromDb,
}