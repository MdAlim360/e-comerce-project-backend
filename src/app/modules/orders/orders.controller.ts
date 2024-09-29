import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderServices } from "./order.service";


const createOrders = catchAsync(async (req, res) => {
    const result = await orderServices.createOrdersIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order is created successfully',
        data: result,
    });
});
const getOrders = catchAsync(async (req, res) => {
    const result = await orderServices.getOrdersFromDb(req.query);
    // console.log(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Orders fetched successfully!",
        data: result,
    });
});
const getSingleOrder = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const result = await orderServices.getSingleOrderFromDb(productId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
    });
});


export const orderController = {
    createOrders,
    getOrders,
    getSingleOrder

}