import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Feather} from '@expo/vector-icons';

type HeaderProps = {
    title: string;
}

export function Header({title}: HeaderProps) {
    return (
        <View className="flex-row items-center border-b border-amber-300 pb-5 mx-5">
            <View className="flex-1">
                <Image source={require('@/assets/logo/logo-small-black-transparent.png')} className="w-32 h-11 absolute bottom-8 left-1" />
                <Text className="text-white text-xl font-heading mt-2">{title}</Text>
            </View>

            <TouchableOpacity className="relative" activeOpacity={0.7}>
            <View className="bg-red-500 w-4 h-4 rounded-full items-center justify-center top-2 z-3 -right-3.5">
                <Text className="text-white text-xs font-bold">3</Text>
            </View>
            <Feather name="shopping-cart" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}