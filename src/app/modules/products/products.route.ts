import validateRequest from "../../middlewares/validateRequest";
import { productController } from "./products.controller";
import { productsValidation } from "./products.validation";
import express from 'express'

const router = express.Router();

router.post('/',
    validateRequest(productsValidation.productValidationSchema),
    productController.createProducts)
router.get('/',
    productController.getProducts)
router.get('/:productId',
    productController.getSingleProduct)
router.patch('/:productId',
    validateRequest(productsValidation.updateProductValidationSchema),
    productController.updateProduct)
router.delete('/:productId',
    productController.deleteProduct)

export const create_products_routes = router;  