import { View} from "react-native";

import {useCartStore} from "@/data-store/cart-store";


export default function CartScreen() {
    const cartStore = useCartStore()

    return (
        <View className="flex-1 pt-8">

        </View>
    );
}