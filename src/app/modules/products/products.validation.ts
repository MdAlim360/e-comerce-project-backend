import { z } from "zod";

const productValidationSchema = z.object({
    body: z.object({

        image: z.string().trim().nonempty("Image link is required"),
        name: z.string().trim().nonempty("Name is required"),
        brand: z.string().trim().nonempty("Brand is required"),
        available_quantity: z.number().int().min(0, "Available quantity must be at least 0"),
        price: z.number().nonnegative("Price must be a positive number"),
        rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5"),
        description: z.string().trim().nonempty("Description is required").max(1000, "Description cannot be more than 1000 characters"),
        isDeleted: z.boolean().default(false)
    })
});



const updateProductValidationSchema = z.object({
    body: z.object({
        image: z.string().trim().nonempty("Image link is required").optional(),
        name: z.string().trim().nonempty("Name is required").optional(),
        brand: z.string().trim().nonempty("Brand is required").optional(),
        available_quantity: z.number().int().min(0, "Available quantity must be at least 0").optional(),
        price: z.number().nonnegative("Price must be a positive number").optional(),
        rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5").optional(),
        description: z.string().trim().nonempty("Description is required").max(1000, "Description cannot be more than 1000 characters").optional(),
        isDeleted: z.boolean().default(false).optional()
    })
});




export const productsValidation = {
    productValidationSchema,
    updateProductValidationSchema
}