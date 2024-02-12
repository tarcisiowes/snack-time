import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Alert, Linking, ScrollView, Text, View } from 'react-native';

import { Input } from '@/components/input';
import { useCartStore } from '@/data-store/cart-store';
import { formatCurrency } from '@/utils/string-helper/format-currency';
import { PHONE_NUMBER } from '@/utils/constants';
import { LinkButton } from '@/components/link-button';
import { Button } from '@/components/button';
import { Feather } from '@expo/vector-icons';

export default function Checkout() {
    // TODO - Implement a hook form to handle the address inputs
    const [address, setAddress] = useState('');
    const navigation = useNavigation();
    const cartStore = useCartStore();
    const total = formatCurrency(
        cartStore.products.reduce(
            (total, product) => total + product.price * product.quantity,
            0,
        ),
    );

    function handleOrder() {
        if (address.trim() === '') {
            Alert.alert('Aviso', 'Informe seu endereço completo para entrega');
            return;
        }

        const products = cartStore.products.map(
            (product) => `\n${product.quantity} - ${product.title}`,
        );
        const message = `Novo Pedido:\n${products}\nTotal: ${total}\nEndereço para entrega:\n${address}`;

        Alert.alert('Confirmar pedido', `Deseja confirmar o pedido?`, [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Confirmar',
                onPress: () => handleConfirmOrder(message),
            },
        ]);
    }

    function handleConfirmOrder(message: string) {
        Linking.openURL(
            `https://api.whatsapp.com/send?phone=55${PHONE_NUMBER}&text=${message}`,
        );
        cartStore.clear();
        navigation.goBack();
    }

    return (
        <ScrollView className="gap-4 px-4 pt-6 flex-1">
            <Text className="text-amber-950 text-2xl font-heading mb-4">
                Informe seu endereço completo:
            </Text>
            <Input placeholderText={'CEP'} onChangeText={setAddress} />
            <Input placeholderText={'Bairro'} onChangeText={setAddress} />
            <Input placeholderText={'Rua'} onChangeText={setAddress} />
            <View className="flex-row flex-1 justify-between">
                <Input
                    placeholderText={'Numero'}
                    smallWidth
                    onChangeText={setAddress}
                />
                <Input
                    placeholderText={'Complemento'}
                    mediumWidth
                    onChangeText={setAddress}
                />
            </View>
            <Input
                placeholderText={'Referencia'}
                onChangeText={setAddress}
                blurOnSubmit={true}
                onSubmitEditing={handleOrder}
                returnKeyType={'next'}
            />
            <View className="pt-5 gap-3">
                <Button onPress={handleOrder}>
                    <Button.Icon>
                        <Feather
                            name="arrow-right-circle"
                            size={24}
                            color="white"
                        />
                    </Button.Icon>
                    <Button.Text>Fazer o pedido</Button.Text>
                </Button>
                <LinkButton href="/cart" title="Voltar ao Carrinho" />
            </View>
        </ScrollView>
    );
}
