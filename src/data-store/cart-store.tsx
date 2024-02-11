import {create} from "zustand";
import {ProductProps} from "@/utils/data/products";

export type ProductCartProps = ProductProps & {
    quantity: number;
}

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
}

export const useCartStore = create<StateProps>((set) => ({
  products: [],
  add: ()  => {  },
  remove: () => {  },
  clear: () => {  },
}))