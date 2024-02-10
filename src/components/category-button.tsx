import {Text, Pressable} from "react-native";

export function CategoryButton({title}) {
    return (
        <Pressable className="flex-row items-center bg-white rounded-lg p-2 mx-2">
            <Text >{title}</Text>
        </Pressable>
    )
}