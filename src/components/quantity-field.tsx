import { Text, TouchableOpacity, View } from 'react-native';
import { ProductCartProps, useCartStore } from '@/data-store/cart-store';

export function QuantityField({
    product,
    ...rest
}: {
    product: ProductCartProps;
}) {
    const { remove, add } = useCartStore();
    return (
        <View>
            <TouchableOpacity onPress={() => remove(product.id)}>
                <Text>-</Text>
            </TouchableOpacity>
            <Text>{product.quantity}</Text>
            <TouchableOpacity onPress={() => add(product)}>
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    );
}
