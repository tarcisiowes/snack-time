import {ScrollView, Text, View} from "react-native";

import {Header} from "@/components/header";
import {Product} from "@/components/product";
import {useCartStore} from "@/data-store/cart-store";
import {formatCurrency} from "@/utils/string-helper/format-currency";

export default function CartScreen() {
    const cartStore = useCartStore()
    const total = formatCurrency(cartStore.products.reduce(
        (total, product) =>
            total + product.price * product.quantity, 0
    ))

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

            <View className="flex-row items-center mt-5 mb-4 px-3">
                <Text className="text-amber-950 text-xl font-subTitle">Total: </Text>
                <Text className="text-green-800 text-2xl font-heading">
                    {total}
                </Text>
            </View>

        </View>
    );
}