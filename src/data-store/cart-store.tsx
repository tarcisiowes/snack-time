import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ProductProps } from '@/utils/data/products';
import * as cartInMemory from '@/data-store/helpers/cart-in-memory';

export type ProductCartProps = ProductProps & {
    quantity?: number;
};

type StateProps = {
    products: ProductCartProps[];
    add: (product: ProductProps, quantity?: number) => void;
    remove: (product: string, quantity?: number) => void;
    clear: () => void;
};

export const useCartStore = create(
    persist<StateProps>(
        (set) => ({
            products: [],
            add: (product: ProductProps, quantity?: number) =>
                set((state) => ({
                    products: cartInMemory.add(
                        state.products,
                        product,
                        quantity,
                    ),
                })),
            remove: (productId: string, quantity?: number) =>
                set((state) => ({
                    products: cartInMemory.remove(
                        state.products,
                        productId,
                        quantity,
                    ),
                })),

            clear: () => set(() => ({ products: [] })),
        }),
        {
            name: 'snack-time:cart',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
