import {Image, Text, View} from "react-native";
import {useLocalSearchParams, useNavigation} from "expo-router";
import {Feather} from "@expo/vector-icons";

import {Button} from "@/components/button";
import {LinkButton} from "@/components/link-button";
import {useCartStore} from "@/data-store/cart-store";
import {PRODUCTS} from "@/utils/data/products";
import {formatCurrency} from "@/utils/string-helper/format-currency";

export default function ProductScreen() {
    const cartStore = useCartStore()
    const navigation = useNavigation()
    const {id} = useLocalSearchParams()
    const product = PRODUCTS.filter((product) => product.id === id)[0]

    function handleAddToCart() {
        cartStore.add(product)
        navigation.goBack()
    }

    return (
        <View className="flex-1">
            {/*TODO - add verification of device type to add translate property to the image, right now it's only for ios*/}
            <Image
                source={product.cover}
                className="w-full h-72 transform -translate-y-16"
                resizeMode={"cover"}
            />

            <View className="px-5">
                <View className="flex-row justify-between items-center mt-5">
                    <Text className="text-2xl font-heading my-2">{product.title}</Text>
                    <Text className="text-2xl font-bold my-2 text-green-800">{formatCurrency(product.price)}</Text>
                </View>
                <Text className="text-base font-body leading-6 mb-6">{product.description}</Text>

                {product.ingredients.map((ingredient, index) => (
                    <Text
                        key={ingredient}
                        className="text-base font-body leading-6 mb-2">
                        {"\u2022"}{ingredient}
                    </Text>
                ))}
            </View>

            <View className="p-5 pb-8 gap-5">
                <Button onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={24} color="white" />
                    </Button.Icon>
                    <Button.Text>Adicionar ao carrinho</Button.Text>
                </Button>
            </View>

            <LinkButton href="/" title="Voltar ao Cardápio" />

        </View>
    );
}