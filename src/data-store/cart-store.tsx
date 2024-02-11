import {create} from "zustand";


export const useCartStore = create((set) => ({
  cart: [],
  add: ()  => {  },
  remove: () => {  },
  clear: () => {  },
}))