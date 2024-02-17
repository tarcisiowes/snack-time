import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { Button } from '@/components/button';
import { LinkButton } from '@/components/link-button';
import { useCartStore } from '@/data-store/cart-store';
import { PRODUCTS } from '@/utils/data/products';
import { formatCurrency } from '@/utils/string-helper/format-currency';
import { QuantityField } from '@/components/quantity-field';
import { useState } from 'react';

export default function ProductScreen() {
    const { id } = useLocalSearchParams();
    const cartStore = useCartStore();
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);
    const product = PRODUCTS.find((item) => item.id === id);
    const productQuantity =
        cartStore.products.find((item) => item.id === product!.id)?.quantity ||
        0;

    function handleAddToCart(quantity: number) {
        quantity = productQuantity + quantity;
        cartStore.add(product!, quantity);
        navigation.goBack();
    }

    if (!product) return <Redirect href={'/'} />;

    function handleQuantityIncrease() {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }

    function handleQuantityDecrease() {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    }

    return (
        <ScrollView>
            <View className="flex-1">
                {/*TODO - add verification of device type to add translate property to the image, right now it's only for ios*/}
                <Image
                    source={product.cover}
                    className="w-full h-72 transform -translate-y-5"
                    resizeMode={'cover'}
                />

                <View className="px-5">
                    <View className="flex-row justify-between items-center mt-5">
                        <Text className="text-2xl font-heading my-2">
                            {product.title}
                        </Text>
                        <Text className="text-2xl font-bold my-2 text-green-800">
                            {formatCurrency(product.price)}
                        </Text>
                    </View>
                    <Text className="text-base font-body leading-6 mb-6">
                        {product.description}
                    </Text>

                    {product.ingredients.map((ingredient, index) => (
                        <Text
                            key={ingredient}
                            className="text-base font-body leading-6 mb-2"
                        >
                            {'\u2022'}
                            {ingredient}
                        </Text>
                    ))}
                </View>

                <View className="flex-row border-t border-gray-400 mt-5 py-3 px-5">
                    <Text className="text-xl pt-2">Quantidade:</Text>
                    <QuantityField
                        quantity={quantity}
                        handleQuantityDecrease={handleQuantityDecrease}
                        handleQuantityIncrease={handleQuantityIncrease}
                    />
                </View>

                <View className="p-5 pb-8 gap-5 mt-3">
                    <Button onPress={() => handleAddToCart(quantity)}>
                        <Button.Icon>
                            <Feather
                                name="plus-circle"
                                size={24}
                                color="white"
                            />
                        </Button.Icon>
                        <Button.Text>Adicionar ao carrinho</Button.Text>
                    </Button>
                    <LinkButton href="/" title="Voltar ao Cardápio" />
                </View>
            </View>
        </ScrollView>
    );
}
