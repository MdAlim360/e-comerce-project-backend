
export interface Variant {
    type: string
    value: string
}

export interface Inventory {
    quantity: number
    inStock: boolean
}
export interface TProducts {
    name: string
    description: string
    price: number
    category: string
    tags: string[]
    variants: Variant[]
    inventory: Inventory
}

