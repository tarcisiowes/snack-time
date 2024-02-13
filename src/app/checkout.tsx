import { useState } from 'react';
import { Alert, Linking, ScrollView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { LinkButton } from '@/components/link-button';
import { useCartStore } from '@/data-store/cart-store';
import { formatCurrency } from '@/utils/string-helper/format-currency';
import { PHONE_NUMBER } from '@/utils/constants';

type AddressProps = {
    zipCode: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
    reference: string;
};

export default function Checkout() {
    const [address, setAddress] = useState('');
    const navigation = useNavigation();
    const cartStore = useCartStore();
    const total = formatCurrency(
        cartStore.products.reduce(
            (total, product) => total + product.price * product.quantity,
            0,
        ),
    );

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            zipCode: '',
            neighborhood: '',
            street: '',
            number: '',
            complement: '',
            reference: '',
        },
    });

    const onSubmit = (data: AddressProps) => {
        const formattedAddress = `CEP: ${data.zipCode}\nBairro: ${data.neighborhood}\nRua: ${data.street}\nNumero: ${data.number}\nComplemento: ${data.complement}\nReferencia: ${data.reference}`;
        const products = cartStore.products.map(
            (product) => `\n${product.quantity} - ${product.title}`,
        );
        const message = `Novo Pedido:\n${products}\nTotal: ${total}\nEndereço para entrega:\n${formattedAddress}`;

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
    };

    function handleConfirmOrder(message: string) {
        Linking.openURL(
            `https://api.whatsapp.com/send?phone=55${PHONE_NUMBER}&text=${message}`,
        );
        cartStore.clear();
        navigation.goBack();
    }

    const fetchAddress = async (data: { cep: string }) => {
        const response = await fetch(
            `https://viacep.com.br/ws/${data.cep}/json/`,
        );
        const result: { logradouro: string; bairro: string } =
            await response.json();

        setValue('street', result.logradouro);
        setValue('neighborhood', result.bairro);
    };

    const handleCEPChange = (text: string) => {
        setValue('zipCode', text);

        if (text.length === 8) {
            fetchAddress({ cep: text });
        }
    };

    return (
        <ScrollView className="gap-4 px-4 pt-6 flex-1">
            <Text className="text-amber-950 text-2xl font-heading mb-4">
                Informe seu endereço completo:
            </Text>
            <View>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder={
                                errors.zipCode
                                    ? 'É necessario informar o CEP'
                                    : 'CEP'
                            }
                            placeholderTextColor={
                                errors.zipCode
                                    ? colors.red[500]
                                    : colors.slate[500]
                            }
                            onBlur={onBlur}
                            onChangeText={(text) => {
                                onChange(text);
                                handleCEPChange(text);
                            }}
                            value={value}
                            keyboardType="numeric"
                            maxLength={8}
                        />
                    )}
                    name="zipCode"
                />

                <Controller
                    control={control}
                    rules={{
                        maxLength: 20,
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder={
                                errors.neighborhood
                                    ? 'É necessario informar o Bairro'
                                    : 'Bairro'
                            }
                            placeholderTextColor={
                                errors.neighborhood
                                    ? colors.red[500]
                                    : colors.slate[500]
                            }
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="neighborhood"
                />

                <Controller
                    control={control}
                    rules={{
                        maxLength: 50,
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder={
                                errors.street
                                    ? 'É necessario informar a Rua'
                                    : 'Rua'
                            }
                            placeholderTextColor={
                                errors.street
                                    ? colors.red[500]
                                    : colors.slate[500]
                            }
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="street"
                />

                <View className="flex-row flex-1 justify-between">
                    <Controller
                        control={control}
                        rules={{
                            maxLength: 10,
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder={'Numero'}
                                placeholderTextColor={
                                    errors.number
                                        ? colors.red[500]
                                        : colors.slate[500]
                                }
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                smallWidth
                            />
                        )}
                        name="number"
                    />

                    <Controller
                        control={control}
                        rules={{
                            maxLength: 50,
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder={
                                    errors.complement
                                        ? 'Complemeto é necessario'
                                        : 'Complemeto'
                                }
                                placeholderTextColor={
                                    errors.complement
                                        ? colors.red[500]
                                        : colors.slate[500]
                                }
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                mediumWidth
                            />
                        )}
                        name="complement"
                    />
                </View>

                <Controller
                    control={control}
                    rules={{
                        maxLength: 50,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Referencia"
                            placeholderTextColor={colors.slate[500]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            blurOnSubmit={true}
                            onSubmitEditing={handleSubmit(onSubmit)}
                            returnKeyType={'next'}
                        />
                    )}
                    name="reference"
                />
            </View>

            <View className="pt-5">
                <Button onPress={handleSubmit(onSubmit)} className="my-4">
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
