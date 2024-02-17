import { Alert, Linking, ScrollView, Text, View } from 'react-native';

import { Header } from '@/components/header';
import { LinkButton } from '@/components/link-button';
import { ProductCard } from '@/components/product-card';
import { ProductCartProps, useCartStore } from '@/data-store/cart-store';
import { formatCurrency } from '@/utils/string-helper/format-currency';
import { Link } from 'expo-router';

export default function CartScreen() {
    const cartStore = useCartStore();
    const total = formatCurrency(
        cartStore.products.reduce(
            (total, product) => total + product.price * product.quantity!,
            0,
        ),
    );

    function handleRemoveProduct(product: ProductCartProps) {
        if (product.quantity! === 1) {
            Alert.alert(
                'Remover produto',
                `Deseja remover o ${product.title} do carrinho?`,
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Remover',
                        onPress: () => cartStore.remove(product.id),
                    },
                ],
            );
        } else {
            cartStore.remove(product.id);
        }
    }

    function handleAddProduct(product: ProductCartProps) {
        cartStore.add(product, 1);
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho" />
            <ScrollView className="flex-1 border-b border-amber-600">
                <View className="flex-1 p-5">
                    {cartStore.products.map((product) => (
                        <Link
                            href={`/product/${product.id}`}
                            asChild
                            key={product.id}
                        >
                            <ProductCard
                                data={product}
                                key={product.id}
                                handleRemoveProduct={() =>
                                    handleRemoveProduct(product)
                                }
                                handleAddProduct={() =>
                                    handleAddProduct(product)
                                }
                            />
                        </Link>
                    ))}
                </View>
                {cartStore.products.length === 0 && (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-amber-950 text-2xl font-heading">
                            Seu carrinho está vazio
                        </Text>
                    </View>
                )}
            </ScrollView>
            {cartStore.products.length > 0 && (
                <View className="flex-row items-center mt-5 pb-8 px-4">
                    <Text className="text-amber-950 text-xl font-subTitle">
                        Total:{' '}
                    </Text>
                    <Text className="text-green-800 text-2xl font-heading">
                        {total}
                    </Text>
                </View>
            )}

            <View className="px-5 gap-5">
                {cartStore.products.length > 0 && (
                    <LinkButton
                        href="/checkout"
                        title="Prosseguir"
                        buttonStyle
                    />
                )}
                <LinkButton href="/" title="Voltar ao Cardápio" />
            </View>
        </View>
    );
}
