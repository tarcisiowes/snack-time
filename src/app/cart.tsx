import { Alert, ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Header } from '@/components/header';
import { LinkButton } from '@/components/link-button';
import { ProductCard } from '@/components/product-card';
import { ProductCartProps, useCartStore } from '@/data-store/cart-store';
import { formatCurrency } from '@/utils/string-helper/format-currency';

export default function CartScreen() {
    const cartStore = useCartStore();
    const total = formatCurrency(
        cartStore.products.reduce(
            (total, product) => total + product.price * product.quantity,
            0,
        ),
    );

    function handleRemoveProduct(product: ProductCartProps) {
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
    }

    function handleOrder() {
        if (address.trim() === '') {
            Alert.alert('Aviso', 'Informe seu endereço completo para entrega');
            return;
        }

        const products = cartStore.products.map(
            (product) => `\n${product.quantity} - ${product.title}`,
        );
        const message = `Novo Pedido:\n${products}\nTotal: ${total}\nEndereço para entrega:\n${address}`;
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho" />
            <ScrollView className="flex-1 border-b border-amber-600">
                <View className="flex-1 p-5">
                    {cartStore.products.map((product) => (
                        <ProductCard
                            data={product}
                            key={product.id}
                            onPress={() => handleRemoveProduct(product)}
                        />
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

            <View className="flex-row items-center mt-5 mb-4 px-4">
                <Text className="text-amber-950 text-xl font-subTitle">
                    Total:{' '}
                </Text>
                <Text className="text-green-800 text-2xl font-heading">
                    {total}
                </Text>
            </View>

            {/*TODO - need fix problem with keyboard covering the input*/}
            <View className="gap-2 px-4">
                <Text className="text-amber-950 text-xl font-subTitle">
                    Informe seu endereço completo:{' '}
                </Text>
                <Input />
            </View>

            <View className="p-4 pb-8 gap-5">
                {/*<LinkButton href="/" title="Finalizar Pedido" />*/}
                <Button>
                    <Button.Icon>
                        <Feather
                            name="arrow-right-circle"
                            size={24}
                            color="white"
                        />
                    </Button.Icon>
                    <Button.Text>Fazer pedido</Button.Text>
                </Button>
            </View>

            <LinkButton href="/" title="Voltar ao Cardápio" />
        </View>
    );
}
