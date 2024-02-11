import {Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";


export default function ProductScreen() {
    const {id} = useLocalSearchParams()

    return (
        <View className="flex-1">
            <Text>Product Screen</Text>
        </View>
    );
}