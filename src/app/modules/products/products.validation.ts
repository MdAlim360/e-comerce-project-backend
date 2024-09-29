import { z } from "zod";


// Variant Schema Validation
const VariantSchema = z.object({
    type: z.string({
        required_error: "Variant type is required",
    }),
    value: z.string({
        required_error: "Variant value is required",
    }),
});

// Inventory Schema Validation
const InventorySchema = z.object({
    quantity: z.number({
        required_error: "Quantity is required",
    }).min(0, "Quantity must be 0 or greater"),
    inStock: z.boolean({
        required_error: "In-stock status is required",
    }),
});

const productValidationSchema = z.object({
    body: z.object({

        name: z.string({
            required_error: "Name is required",
        }).trim(),

        price: z.number({
            required_error: "Price is required",
        }),

        description: z.string({
            required_error: "Description is required",
        }).max(1000, "Description cannot be more than 1000 characters"),

        category: z.string({
            required_error: "Category is required",
        }),

        tags: z.array(z.string()).nonempty("At least one tag is required"),

        variants: z.array(VariantSchema).nonempty("At least one variant is required"),

        inventory: InventorySchema,
    })
});







const updateProductValidationSchema = z.object({
    body: z.object({

        name: z.string({
            required_error: "Name is required",
        }).trim().optional(), // Name is optional now

        price: z.number({
            required_error: "Price is required",
        }).optional(), // Price is optional now

        description: z.string({
            required_error: "Description is required",
        }).max(1000, "Description cannot be more than 1000 characters").optional(), // Description is optional now

        category: z.string({
            required_error: "Category is required",
        }).optional(), // Category is optional now

        tags: z.array(z.string()).nonempty("At least one tag is required").optional(), // Tags are optional now

        variants: z.array(VariantSchema).nonempty("At least one variant is required").optional(), // Variants are optional now

        inventory: InventorySchema.optional(), // Inventory is optional now
    })
});




export const productsValidation = {
    productValidationSchema,
    updateProductValidationSchema
}