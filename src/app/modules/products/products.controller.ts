import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productServices } from "./products.service";

const createProducts = catchAsync(async (req, res) => {
    const result = await productServices.createProductsIntoDb(req.body);
    const responseData = Array.isArray(result) ? result[0] : result;
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is created successfully',
        data: responseData,
    });
});
const getProducts = catchAsync(async (req, res) => {
    const result = await productServices.getProductsFromDb(req.query);
    // console.log(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Products are retrieved successfully',
        data: result,
    });
});
const getSingleProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDb(productId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is retrieved successfully',
        data: result,
    });
});
const updateProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const result = await productServices.updateProduct(productId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is updated successfully',
        data: result,
    });
});
const deleteProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDb(productId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is deleted successfully',
        data: result,
    });
});

export const productController = {
    createProducts,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct

}