import { Router } from "express";
import { create_products_routes } from "../modules/products/products.route";
import { create_orders_routes } from "../modules/orders/orders.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/products',
        route: create_products_routes,
    },
    {
        path: '/orders',
        route: create_orders_routes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
