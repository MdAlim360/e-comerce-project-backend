import validateRequest from "../../middlewares/validateRequest";
import { productController } from "./products.controller";
import { productsValidation } from "./products.validation";
import express from 'express'

const router = express.Router();

router.post('/create-products',
    validateRequest(productsValidation.productValidationSchema),
    productController.createProducts)
router.get('/',
    productController.getProducts)
router.get('/:id',
    productController.getSingleProduct)
router.patch('/:id',
    validateRequest(productsValidation.updateProductValidationSchema),
    productController.updateProduct)
router.delete('/:id',
    productController.deleteProduct)

export const create_products_routes = router;  