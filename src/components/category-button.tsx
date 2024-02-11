import {Text, Pressable, PressableProps} from "react-native";
import clsx from "clsx";


type CategoryButtonProps = PressableProps &{
    title: string;
    isSelected?: boolean;
}

export function CategoryButton({title, isSelected, ...rest} : CategoryButtonProps) {
    return (
        <Pressable className={clsx(
            "bg-amber-400 px-4 h-10 justify-center rounded-md border-2 border-transparent",
            isSelected && "border-2 border-slate-950"
        )} {...rest}>
            <Text className='text-slate-900 font-subTitle text-sm'>{title}</Text>
        </Pressable>
    )
}