import {Text, Pressable} from "react-native";

type CategoryButtonProps = {
    title: string;
    isSelect?: boolean;
}

export function CategoryButton({title} : CategoryButtonProps) {
    return (
        <Pressable className="flex-row items-center bg-white rounded-lg p-2 mx-2">
            <Text >{title}</Text>
        </Pressable>
    )
}