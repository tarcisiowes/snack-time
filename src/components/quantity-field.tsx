import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/button';

export function QuantityField({ ...rest }) {
    return (
        <View className="flex-1 flex-row items-center justify-start ml-3">
            <Button
                className="bg-transparent w-16"
                onPress={rest.handleQuantityDecrease}
            >
                <Button.Icon>
                    <Feather name="minus-circle" size={24} color="green" />
                </Button.Icon>
            </Button>
            <Text className="text-xl mx-2">{rest.quantity}</Text>
            <Button
                className="bg-transparent w-16"
                onPress={rest.handleQuantityIncrease}
            >
                <Button.Icon>
                    <Feather name="plus-circle" size={24} color="green" />
                </Button.Icon>
            </Button>
        </View>
    );
}
