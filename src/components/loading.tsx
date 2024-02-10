import {ActivityIndicator, View} from "react-native";
import colors from "tailwindcss/colors";

export function Loading() {
    return (
        <View className="flex-1 bg-amber-600 items-center justify-center">
            <ActivityIndicator color={colors.white}/>
        </View>
    )
}