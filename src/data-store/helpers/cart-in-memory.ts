import { ProductCartProps } from '@/data-store/cart-store';
import { ProductProps } from '@/utils/data/products';

export function add(
    products: ProductCartProps[],
    newProduct: ProductProps,
    quantity?: number,
) {
    const existingProduct = products.find(({ id }) => id === newProduct.id);

    if (existingProduct) {
        return products.map((product) =>
            product.id === existingProduct.id
                ? {
                      ...product,
                      quantity: (product.quantity || 0) + (quantity || 1),
                  }
                : product,
        );
    }
    return [...products, { ...newProduct, quantity: quantity || 1 }];
}

export function remove(
    products: ProductCartProps[],
    productId: string,
    quantity?: number,
) {
    const existingProduct = products.find(({ id }) => id === productId);

    if (existingProduct?.quantity === 1) {
        return products.filter(({ id }) => id !== productId);
    }

    return products.map((product) =>
        product.id === productId
            ? { ...product, quantity: product.quantity! - 1 }
            : product,
    );
}
