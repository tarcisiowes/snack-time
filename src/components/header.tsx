import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Feather} from '@expo/vector-icons';

type HeaderProps = {
    title: string;
}

export function Header({title}: HeaderProps) {
    return (
        <View className="flex-row items-center border-b border-amber-300 pb-5 mx-5">
            <View className="flex-1">
                <Image source={require('@/assets/logo/logo-medium-black-transparent.png')} className="w-32 h-6" />
                <Text className="text-white text-xl font-heading mt-2">{title}</Text>
            </View>
        </View>
    )
}