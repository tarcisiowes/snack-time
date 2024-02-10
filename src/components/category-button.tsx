import {Text, Pressable, PressableProps} from "react-native";

type CategoryButtonProps = PressableProps &{
    title: string;
    isSelect?: boolean;
}

export function CategoryButton({title, isSelect, ...rest} : CategoryButtonProps) {
    return (
        <Pressable className="bg-amber-400 px-4 h-10 justify-center rounded-md">
            <Text className='text-slate-900 font-subTitle text-sm'>{title}</Text>
        </Pressable>
    )
}