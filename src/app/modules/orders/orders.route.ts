import validateRequest from "../../middlewares/validateRequest";
import express from 'express'
import { ordersValidation } from "./orders.validation";
import { orderController } from "./orders.controller";

const router = express.Router();

router.post('/',
    validateRequest(ordersValidation.orderValidationSchema),
    orderController.createOrders)
router.get('/',
    orderController.getOrders)
router.get('/:productId',
    orderController.getSingleOrder)



export const create_orders_routes = router;  