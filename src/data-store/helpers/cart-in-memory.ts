import {ProductCartProps} from "@/data-store/cart-store";


export function add(products: ProductCartProps[], newProduct: ProductCartProps) {
    const existingProduct = products.find(({id}) => id === newProduct.id)

    if (existingProduct) {
        return products.map(product =>
            product.id === existingProduct.id
                ? {...product, quantity: product.quantity + 1}
                : product
        )
    }
    return [...products, {...newProduct, quantity: 1}]
}