import { View} from "react-native";

import {Header} from "@/components/header";
import {useCartStore} from "@/data-store/cart-store";


export default function CartScreen() {
    const cartStore = useCartStore()

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho" />
            <ScrollView className="flex-1">
                <View className="flex-1 p-5">
                    {cartStore.products.map((product) => (
                        <Product data={product} key={product.id} />
                    ))}
                </View>
            </ScrollView>

        </View>
    );
}