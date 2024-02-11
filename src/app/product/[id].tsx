import {Image, Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {PRODUCTS} from "@/utils/data/products";
import {formatCurrency} from "@/utils/string-helper/format-currency";


export default function ProductScreen() {
    const {id} = useLocalSearchParams()
    const product = PRODUCTS.filter((product) => product.id === id)[0]

    return (
        <View className="flex-1">
            <Image
                source={product.cover}
                className="w-full h-72 transform -translate-y-16"
                resizeMode={"cover"}
            />

            <View className="px-5">
                <View className="flex-row justify-between items-center mt-5">
                    <Text className="text-2xl font-heading my-2">{product.title}</Text>
                    <Text className="text-2xl font-heading my-2">{formatCurrency(product.price)}</Text>
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
        </View>
    );
}