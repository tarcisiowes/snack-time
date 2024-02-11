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
                {cartStore.products.length === 0 && (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-amber-950 text-2xl font-heading">Seu carrinho está vazio</Text>
                    </View>
                )}
            </ScrollView>

        </View>
    );
}